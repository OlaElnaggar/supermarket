const params = new URLSearchParams(window.location.search)
const productId = params.get("id");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let quant = cart.reduce((total, item) => total + item.quantity, 0);
document.querySelector("#count_cart").innerHTML = quant;
fetch("data.json").then(res=>res.json())
.then(data=>{
    const product = data.products.find(
        p=> p.id == productId
        
    )
    
    if(!product){
         document.body.innerHTML = `<h2 class="w-[80%] h-[100px] text-center content-center m-auto mt-[300px] bg-(--color-stroke2) text-(--color-purple)">Product Not Found</h2>`;
         return;
    }
    document.querySelector("#sideimg1").src= product.image
    document.querySelector("#sideimg2").src= product.image
    document.querySelector("#sideimg3").src= product.image
    document.querySelector("#mainimg").src= product.image
    document.querySelector("#price").innerHTML = `$${product.price} <span class="text-(--text-placeholder) line-through ms-[10px] text-[14px]" id="oldprice" >$${product.oldPrice}</span>`


    document.querySelector("#addToCartBtn").addEventListener("click",()=>{
        
    // document.querySelector("#cart_div_static").classList.add("hidden")

    // document.querySelector("#cart_dynamic").classList.remove("hidden")

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(p=>p.id == product.id)
    if(existingProduct){
        existingProduct.quantity += 1
    }else{
        cart.push({
             id: product.id,
            name: product.name,
            price: product.price,
            oldPrice:product.oldPrice,
            image: product.image,
            quantity: 1
        })    
    }

    localStorage.setItem("cart",JSON.stringify(cart))

    quant = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector("#count_cart").innerHTML = quant; 
})

    const img_ofer = document.querySelector("#mainimg")

 let imgs_Div= document.querySelectorAll(".diiv_img")
 console.log(imgs_Div)
 for(let i = 0; i< imgs_Div.length; i++){
    imgs_Div[i].addEventListener("mouseover",(e)=>{
        img_ofer.src = e.target.src
    })
    imgs_Div[i].addEventListener("mouseout",()=>{
        img_ofer.src = product.image
    })
 }

})



// =================================================
 document.querySelector("#carts_div").addEventListener("click",()=>{
    window.location.href ="cart.html"
})

// ============================================================


 document.querySelector("#mobile_menu_btn")?.addEventListener("click", () => {
        document.querySelector("#mobile_menu").classList.toggle("hidden");
      });