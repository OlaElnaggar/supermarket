let allProducts = [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.querySelector("#count_cart").innerHTML = cart.reduce((t, i) => t + i.quantity, 0);
document.querySelector("#carts_div").addEventListener("click", () => {
    window.location.href = "cart.html";
});
fetch("data.json")
    .then(res => res.json())
    .then(data => {
        allProducts = data.products;
        renderProducts(allProducts);
        setupCategoryChips(data.categories);
        setupFilters();
    });
// ==========================================================================
function renderProducts(products) {
    const container = document.querySelector("#products_container");
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = `
            <div class="col-span-4 text-center py-[60px] text-gray-400">
                <i class="fa-solid fa-box-open text-[48px] mb-4 block"></i>
                <p class="text-[18px] font-semibold">No products found</p>
                <p class="text-[14px] mt-2">Try adjusting your search or filters</p>
            </div>`;
        return;
    }

    products.forEach(product => {
        container.innerHTML += `
            <div class="lg:w-[236px] lg:h-[372px] hover:cursor-pointer mt-[20px]" onclick="goToProduct(${product.id})">
                <div class="w-[164px] h-[164px] rounded-[16px] bg-(--color-stroke2) content-center lg:w-[236px] lg:h-[240px] relative">
                    <img src="${product.image}" alt="${product.name}" class="m-auto">
                    <div class="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] rounded-full bg-(--color-purple) flex justify-center items-center absolute bottom-[-10px] right-[20px] lg:bottom-[-20px] lg:right-[30px] z-2"
                        onclick="addToCart(event, ${product.id}, '${product.name}', ${product.price}, ${product.oldPrice}, '${product.image}')">
                        <i class="fa-solid fa-plus text-white"></i>
                    </div>
                </div>
                <p class="text-[16px] font-semibold my-[10px]">${product.name}</p>
                <p class="text-[#117E11] text-[16px] font-semibold">
                    $${product.price}
                    <span class="text-(--text-placeholder) line-through ms-[10px] text-[14px]">$${product.oldPrice}</span>
                </p>
            </div>`;
    });
}
// ==================================================================================
let activeCategoryId = null; 

function setupCategoryChips(categories) {
    const chipsRow = document.querySelector("#gattegory_Body > div:first-child");
    chipsRow.innerHTML = "";


    chipsRow.innerHTML = `
        <div data-cat-id="all"
            class="flex items-center gap-[5px] flex-shrink-0 px-[18px] py-[8px]  rounded-[32px] bg-(--color-purple) border-[1px] border-(--color-purple) text-white hover:cursor-pointer">
            <p>All</p>
        </div>`;

    categories.forEach(cat => {
        chipsRow.innerHTML += `
            <div data-cat-id="${cat.id}"
                class="flex items-center gap-[5px] flex-shrink-0 ps-[8px] py-[8px] pe-[16px] rounded-[32px] bg-(--color-stroke) border-[1px] border-(--color-stroke) hover:bg-(--color-stroke2) hover:border-(--color-purple) hover:cursor-pointer">
                <img src="${cat.image}" alt="" class="w-[20px] h-[20px] object-contain">
                <p>${cat.name}</p>
            </div>`;
    });

// =========================================================================
    chipsRow.querySelectorAll("div[data-cat-id]").forEach(chip => {
        chip.addEventListener("click", () => {
        
            chipsRow.querySelectorAll("div[data-cat-id]").forEach(c => {
                c.classList.remove("bg-(--color-purple)", "border-(--color-purple)", "text-white");
                c.classList.add("bg-(--color-stroke)", "border-(--color-stroke)");
            });
            
            chip.classList.remove("bg-(--color-stroke)", "border-(--color-stroke)");
            chip.classList.add("bg-(--color-purple)", "border-(--color-purple)", "text-white");

            const val = chip.dataset.catId;
            activeCategoryId = val === "all" ? null : parseInt(val);
            applyFiltersAndSearch();
        });
    });
}

// =================================================================
function setupFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener("change", applyFiltersAndSearch);
    });
}

// ==============================================================================
function getActiveCheckboxLabels() {
    const labels = [];
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
            const text = cb.closest("label")?.querySelector("span")?.textContent?.trim().toLowerCase();
            if (text) labels.push(text);
        }
    });
    return labels;
}

// ============================================================================================
function applyFiltersAndSearch() {
    const searchQuery = document.querySelector("[id='search_input ']")?.value?.trim().toLowerCase()
        || document.querySelector("#search_input")?.value?.trim().toLowerCase()
        || "";

    const activeLabels = getActiveCheckboxLabels();
    let filtered = [...allProducts];

    if (searchQuery) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery));
    }

    if (activeCategoryId !== null) {
        filtered = filtered.filter(p => p.categoryId === activeCategoryId);
    }

    if (activeLabels.includes("deals")) {
        filtered = filtered.filter(p => p.oldPrice && p.price < p.oldPrice);
    }

    if (activeLabels.includes("new arrivals")) {
        filtered = filtered.filter(p => p.isBestSeller === true);
    }

    renderProducts(filtered);
}
// ===================================================================
function addToCart(event, id, name, price, oldPrice, image) {
    event.stopPropagation();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(p => p.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, name, price, oldPrice, image, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    document.querySelector("#count_cart").innerHTML = cart.reduce((t, i) => t + i.quantity, 0);
    alert(`${name} added to cart!`);
}
// ==================================================================
function goToProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

// ====================================================================
document.querySelector("#mobile_menu_btn")?.addEventListener("click", () => {
    document.querySelector("#mobile_menu").classList.toggle("hidden");
});

// ====================================================================
document.querySelector("#reset_filters")?.addEventListener("click", () => {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);

    activeCategoryId = null;
    document.querySelectorAll("#gattegory_Body > div:first-child > div[data-cat-id]").forEach(c => {
        c.classList.remove("bg-(--color-purple)", "border-(--color-purple)", "text-white");
        c.classList.add("bg-(--color-stroke)", "border-(--color-stroke)");
    });
    const allChip = document.querySelector("[data-cat-id='all']");
    if (allChip) {
        allChip.classList.remove("bg-(--color-stroke)", "border-(--color-stroke)");
        allChip.classList.add("bg-(--color-purple)", "border-(--color-purple)", "text-white");
    }

    const searchEl = document.querySelector("[id='search_input ']") || document.querySelector("#search_input");
    if (searchEl) searchEl.value = "";

    renderProducts(allProducts);
});