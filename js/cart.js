
const container_produts = document.querySelector('#div_products_cart');

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let quant = cart.reduce((total, item) => total + item.quantity, 0);
document.querySelector("#count_cart").innerHTML = quant;

const Delivery_fee = 5.78;

function updateTotals() {
    let total_price = 0;

    cart.forEach(product => {
        total_price += product.price * product.quantity;
    });

    document.querySelector("#total_price_lg").innerHTML = `$${total_price.toFixed(2)}`;
    document.querySelector("#total_sm").innerHTML = `$${total_price.toFixed(2)}`;
    document.querySelector("#subtotal").innerHTML = `$${(total_price + Delivery_fee).toFixed(2)}`;
    document.querySelector("#subtotal_btn").innerHTML = `$${(total_price + Delivery_fee).toFixed(2)}`;
}

function renderCart() {
    container_produts.innerHTML = "";


if (cart.length === 0) {
    alert("not have data");
} else {

    cart.forEach((product, index) => {
        container_produts.innerHTML += `
        ${index > 0 ? `<hr class="w-[90%] h-[3px] text-(--color-stroke) m-auto my-[20px]">` : ``}
        <div class="space-y-5">
            <div class="flex items-center gap-4">
                <div class="w-[48px] h-[48px] rounded-[9.14px] bg-(--color-stroke2) flex items-center justify-center lg:w-[64px] lg:h-[64px] lg:rounded-[12.19px]">
                    <img src="${product.image}" alt="">
                </div>
                <div>
                    <p class="text-[12px] font-medium lg:text-[14px]">${product.name}</p>
                    <p class="text-[14px] font-semibold text-(--color-purple) flex gap-2">
                        $${product.price}
                        <span class="line-through text-(--links-footer) font-regular">$${product.oldPrice}</span>
                    </p>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <p class="text-[16px] font-semibold">
                    $ <span>${(product.price * product.quantity).toFixed(2)}</span>
                </p>
                <div class="w-[88px] h-[32px] rounded-full flex justify-around bg-(--color-stroke2)">
                    <div class="w-[29.33px] bg-white rounded-full flex items-center justify-center cursor-pointer"  onclick="decreaseQuantity(${index})">
                        <i class="fa-solid fa-trash text-(--color-purple)"></i>
                    </div>
                    <p class="text-[14px] font-medium content-center">${product.quantity}</p>
                    <div class="w-[29.33px] bg-white rounded-full flex items-center justify-center cursor-pointer" onclick="increaseQuantity(${index})">
                        <i class="fa-solid fa-plus text-(--color-purple)"></i>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
}
updateTotals()
}

function increaseQuantity(index) {
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
     quant = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector("#count_cart").innerHTML = quant; 
    renderCart();
}

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1); 
    }

    localStorage.setItem("cart", JSON.stringify(cart));
     quant = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector("#count_cart").innerHTML = quant; 
    renderCart();
}
 renderCart();


// ===========================================================================


fetch("data.json").then(res=>res.json())
.then(data=>{
    const productsContainer = document.querySelector("#recommendation")
    const products = data.products
     products.forEach(product => {
        productsContainer.innerHTML +=`  <div class="lg:w-[236px] lg:h-[372px] hover:cursor-pointer" onclick="goToProduct(${product.id})">
                <div class="w-[119px] h-[120px] rounded-[16px] bg-(--color-stroke2) content-center lg:w-[236px] lg:h-[240px] relative ">
                    <img src="${product.image}" alt="" class="m-auto">
                    <div class="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] rounded-full bg-(--color-purple) flex justify-center items-center absolute bottom-[-10px] right-[20px] lg:bottom-[-20px] lg:right-[30px] z-2 " onclick="addToCart(event, ${product.id}, '${product.name}', ${product.price}, ${product.oldPrice}, '${product.image}')"><i class="fa-solid fa-plus text-white " ></i></div>
                </div>
                <p class="text-[16px] font-semibold  my-[10px]">${product.name}</p>
                <p class="text-[#117E11] text-[16px] font-semibold ">$${product.price} <span class="text-(--text-placeholder) line-through ms-[10px] text-[14px]">$${product.oldPrice}</span></p>
                </div>`
    });

    
    let cardWidth = window.innerWidth >= 992 ? 256 : 129;
    let interval;

    function moveSlider() {
        const first = productsContainer.firstElementChild;
        const clone = first.cloneNode(true);
        productsContainer.appendChild(clone);

        for (let i = 0; i < productsContainer.children.length; i++) {
            productsContainer.children[i].style.transition = "transform 0.8s ease";
            productsContainer.children[i].style.transform = `translateX(-${cardWidth}px)`;
        }

        setTimeout(() => {
            first.remove();
            for (let i = 0; i < productsContainer.children.length; i++) {
                productsContainer.children[i].style.transition = "none";
                productsContainer.children[i].style.transform = "translateX(0)";
            }
        }, 800);
    }

    function start() { interval = setInterval(moveSlider, 2000); }
    function stop() { clearInterval(interval); }

    start();
    productsContainer.addEventListener("mouseenter", stop);
    productsContainer.addEventListener("mouseleave", start);
    
})


function addToCart(event, id, name, price, oldPrice, image) {
    event.stopPropagation(); 

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(p => p.id === id);

    if (existingProduct) {
        existingProduct.quantity++; 

    } else {
        cart.push({ id, name, price, oldPrice, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
     quant = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector("#count_cart").innerHTML = quant; 
    alert(`${name} added to cart!`);

}

// ==============================================================================================
function goToProduct(Id){
    window.location.href =`product.html?id=${Id}`;
}

// ====================================================================================

 document.querySelector("#mobile_menu_btn")?.addEventListener("click", () => {
        document.querySelector("#mobile_menu").classList.toggle("hidden");
      });


