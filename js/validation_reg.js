const signup_btn = document.querySelector("#register_btn");
const name_reg = document.querySelector("#name_reg");
const pass_reg = document.querySelector("#paasword_reg");
const email_reg = document.querySelector("#emai_reg");
const wraperr = document.querySelector("#wraper");
const registerr_form = document.querySelector("#register_form");
const loginr_form = document.querySelector("#login_form");

function showError(inputEl, message) {
    clearError(inputEl);
    inputEl.classList.add("border-red-500", "border-[1.5px]");
    const err = document.createElement("p");
    err.className = "text-red-500 text-[12px] mt-1 error-msg";
    err.textContent = message;
    inputEl.parentElement.appendChild(err);
}

function clearError(inputEl) {
    inputEl.classList.remove("border-red-500", "border-[1.5px]");
    const existing = inputEl.parentElement.querySelector(".error-msg");
    if (existing) existing.remove();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}


[name_reg, email_reg, pass_reg].forEach(input => {
    input.addEventListener("input", () => clearError(input));
});

function switchToLogin() {
    if (window.innerWidth >= 992) {
        wraperr.style.transform = `translateX(0%)`;
        wraperr.style.transition = `.8s ease`;
    } else if (window.innerWidth < 768) {
        wraperr.style.transition = `.8s ease`;
        wraperr.style.transform = `translateY(0)`;
        registerr_form.classList.toggle("hidden");
        registerr_form.style.transition = `all .8s ease`;
        loginr_form.classList.toggle("hidden");
        loginr_form.style.transition = `all .8s ease`;
    }
}

signup_btn.addEventListener("click", () => {
    const name = name_reg.value.trim();
    const email = email_reg.value.trim();
    const password = pass_reg.value.trim();
    let isValid = true;

    if (!name) {
        showError(name_reg, "Full name is required.");
        isValid = false;
    } else if (name.length < 3) {
        showError(name_reg, "Name must be at least 3 characters.");
        isValid = false;
    }

    if (!email) {
        showError(email_reg, "Email is required.");
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError(email_reg, "Please enter a valid email address.");
        isValid = false;
    }

    if (!password) {
        showError(pass_reg, "Password is required.");
        isValid = false;
    } else if (password.length < 8) {
        showError(pass_reg, "Password must be at least 8 characters.");
        isValid = false;
    } else if (!isStrongPassword(password)) {
        showError(pass_reg, "Password must include an uppercase letter and a number.");
        isValid = false;
    }

    if (!isValid) return;

    const existingEmail = localStorage.getItem("Email");
    if (existingEmail && existingEmail === email) {
        showError(email_reg, "An account with this email already exists.");
        return;
    }


    localStorage.setItem("Username", name);
    localStorage.setItem("Email", email);
    localStorage.setItem("password", password);

    name_reg.value = "";
    email_reg.value = "";
    pass_reg.value = "";

    switchToLogin();
});
