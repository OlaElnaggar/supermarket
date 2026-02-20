let cart = JSON.parse(localStorage.getItem("cart")) || [];
let quant = cart.reduce((total, item) => total + item.quantity, 0);
document.querySelector("#count_cart").innerHTML = quant;

fetch("data.json").then(res=>res.json())
.then( data=>{
    const best_seller_container = document.querySelector("#bestSeller")
    const best_seller_products = data.products.filter(
        product => product.isBestSeller
    )


best_seller_products.forEach(product => {
    best_seller_container.innerHTML +=`  <div class="lg:w-[236px] lg:h-[372px] hover:cursor-pointer" onclick="goToProduct(${product.id})">
                <div class="w-[119px] h-[120px] rounded-[16px] bg-(--color-stroke) content-center lg:w-[236px] lg:h-[240px] relative ">
                    <img src="${product.image}" alt="" class="m-auto">
                    <div class="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] rounded-full bg-(--color-purple) flex justify-center items-center absolute bottom-[-10px] right-[20px] lg:bottom-[-20px] lg:right-[30px] z-2" onclick="addToCart(event, ${product.id}, '${product.name}', ${product.price}, ${product.oldPrice}, '${product.image}')"><i class="fa-solid fa-plus text-white"></i></div>
                </div>
                <p class="text-[16px] font-semibold  my-[10px]">${product.name}</p>
                <p class="text-[#117E11] text-[16px] font-semibold ">$${product.price} <span class="text-(--text-placeholder) line-through ms-[10px] text-[14px]">$${product.oldPrice}</span></p>
                </div>`
});
})

function goToProduct(Id){
    window.location.href =`product.html?id=${Id}`;
}


function addToCart(event, id, name, price, oldPrice, image) {
    event.stopPropagation(); 

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(p => p.id == id);

    if (existingProduct) {
        existingProduct.quantity++;  
    } else {
        cart.push({ id, name, price, oldPrice, image, quantity: 1 }); 
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    let quant = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector("#count_cart").innerHTML = quant;
    alert(`${name} added to cart!`);
}