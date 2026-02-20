const login_btn = document.querySelector("#login_btn");
const email_log = document.querySelector("#email_log");
const pass_log = document.querySelector("#pass_log");

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


email_log.addEventListener("input", () => clearError(email_log));
pass_log.addEventListener("input", () => clearError(pass_log));

login_btn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = email_log.value.trim();
    const password = pass_log.value.trim();
    let isValid = true;

    
    if (!email) {
        showError(email_log, "Email is required.");
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError(email_log, "Please enter a valid email address.");
        isValid = false;
    }

    if (!password) {
        showError(pass_log, "Password is required.");
        isValid = false;
    } else if (password.length < 6) {
        showError(pass_log, "Password must be at least 6 characters.");
        isValid = false;
    }

    if (!isValid) return;

    
    const storedEmail = localStorage.getItem("Email");
    const storedPassword = localStorage.getItem("password");

    if (!storedEmail || !storedPassword) {
        alert("No account found. Please register first.");
        return;
    }

    if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
    } else if (email !== storedEmail) {
        showError(email_log, "No account found with this email.");
    } else {
        showError(pass_log, "Incorrect password. Please try again.");
    }
});