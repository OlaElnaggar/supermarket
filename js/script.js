const best_seller_slider = document.querySelector("#bestSeller");
let cardWidth = 129;

if(window.innerWidth >= 992){
  cardWidth = 256;
}
let interval;

function moveSlider() {
    const first = best_seller_slider.firstElementChild;

    
    const clone = first.cloneNode(true);
    best_seller_slider.appendChild(clone);

    
    for (let i = 0; i < best_seller_slider.children.length; i++) {
        best_seller_slider.children[i].style.transition = "transform 0.8s ease";
        best_seller_slider.children[i].style.transform = `translateX(-${cardWidth}px)`;
    }

   
    setTimeout(() => {
   
        first.remove();

        
        for (let i = 0; i < best_seller_slider.children.length; i++) {
           best_seller_slider.children[i].style.transition = "none";
            best_seller_slider.children[i].style.transform = "translateX(0)";
        }
    }, 800);
}

function start() {
    interval = setInterval(moveSlider, 2000);
}

function stop() {
    clearInterval(interval);
}

start();

best_seller_slider.addEventListener("mouseenter", stop);
best_seller_slider.addEventListener("mouseleave", start);


// ===============hover_imgs_ofers================

 const img_ofer = document.querySelector("#ofer_Img")

 let imgs_Div= document.querySelectorAll(".diiv_img")
 console.log(imgs_Div)
 for(let i = 0; i< imgs_Div.length; i++){
    imgs_Div[i].addEventListener("mouseover",(e)=>{
        img_ofer.src = e.target.src
    })
    imgs_Div[i].addEventListener("mouseout",()=>{
        img_ofer.src = "images/orang.webp"
    })
 }

//  ========================================================
 document.querySelector("#carts_div").addEventListener("click",()=>{
    window.location.href ="cart.html"
})
// ====================================================

 document.querySelector("#mobile_menu_btn")?.addEventListener("click", () => {
        document.querySelector("#mobile_menu").classList.toggle("hidden");
      });