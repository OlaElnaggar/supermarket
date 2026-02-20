const wraper =document.querySelector("#wraper")
const rigester_button = document.querySelector("#rigester_move")
const login_button = document.querySelector("#login_move")
const register_form = document.querySelector("#register_form")
const login_form = document.querySelector("#login_form")

if( window.innerWidth >= 992){
rigester_button.addEventListener("click" , ()=>{
     wraper.style.transition = `.8s ease`
    wraper.style.transform = `translateX(-100%)`
    localStorage.setItem("authMode", "register");
})

login_button.addEventListener("click" , ()=>{
    wraper.style.transition = `.8s ease`
    wraper.style.transform = `translateX(0)`
     localStorage.setItem("authMode", "login");
})

window.addEventListener("DOMContentLoaded", () => {
    const savedMode = localStorage.getItem("authMode");

    if (savedMode === "register") {
        wraper.style.transform = `translateX(-100%)`;
    } else {
        wraper.style.transform = `translateX(0)`;
    }
});
}

if(window.innerWidth >0 && window.innerWidth < 768 ){
   rigester_button.addEventListener("click" , ()=>{
     wraper.style.transition = `.8s ease`
    wraper.style.transform = `translateY(125%)`
    register_form.classList.toggle("hidden")
    login_form.classList.toggle("hidden")
    register_form.style.transition=`all 5s ease`
    localStorage.setItem("authMode", "register");

})

login_button.addEventListener("click" , ()=>{
    wraper.style.transition = `.8s ease`
    wraper.style.transform = `translateY(0)`
    register_form.classList.toggle("hidden")
    login_form.classList.toggle("hidden")
     login_form.style.transition=`all 10s ease`
     localStorage.setItem("authMode", "login");
}) 
}
