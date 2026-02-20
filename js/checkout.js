const Delivery_fee = 5.78;
        const VALID_PROMO = "SAVE10";
        let discountApplied = false;

        
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let quant = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector("#count_cart").innerHTML = quant;

        // ===== Render Order Summary =====
        function renderSummary() {
            cart = JSON.parse(localStorage.getItem("cart")) || [];
            const container = document.querySelector("#checkout_products");
            container.innerHTML = "";

            let total = 0;
            cart.forEach(product => {
                total += product.price * product.quantity;
                container.innerHTML += `
                <div class="flex items-center gap-3">
                    <div class="w-[44px] h-[44px] rounded-[10px] bg-(--color-stroke2) flex items-center justify-center flex-shrink-0">
                        <img src="${product.image}" alt="" class="w-[36px] h-[36px] object-contain">
                    </div>
                    <div class="flex-1">
                        <p class="text-[12px] font-medium leading-tight">${product.name}</p>
                        <p class="text-[11px] text-(--text-placeholder)">x${product.quantity}</p>
                    </div>
                    <p class="text-[13px] font-semibold text-(--color-purple)">$${(product.price * product.quantity).toFixed(2)}</p>
                </div>`;
            });

            const finalTotal = discountApplied ? total * 0.9 : total;
            const subtotal = finalTotal + Delivery_fee;

            document.querySelector("#co_total").innerHTML = `$${finalTotal.toFixed(2)}`;
            document.querySelector("#co_subtotal").innerHTML = `$${subtotal.toFixed(2)}`;
            document.querySelector("#co_subtotal_btn").innerHTML = `$${subtotal.toFixed(2)}`;
        }

        renderSummary();

        // ================== Time Slot Selection ===================================
        function selectSlot(el) {
            document.querySelectorAll(".time-slot").forEach(slot => {
                slot.classList.remove("border-(--color-purple)", "bg-(--color-stroke2)");
                slot.classList.add("border-(--color-stroke)");
                slot.querySelector("p").classList.remove("text-(--color-purple)");
            });
            el.classList.add("border-(--color-purple)", "bg-(--color-stroke2)");
            el.classList.remove("border-(--color-stroke)");
            el.querySelector("p").classList.add("text-(--color-purple)");
        }

        // ========================= Payment Selection =================================
        function selectPayment(el, type) {
            document.querySelectorAll(".payment-opt").forEach(opt => {
                opt.classList.remove("border-(--color-purple)", "bg-(--color-stroke2)");
                opt.classList.add("border-(--color-stroke)");
                opt.querySelectorAll("i, p").forEach(child => {
                    child.classList.remove("text-(--color-purple)");
                    child.classList.add("text-(--text-placeholder)");
                });
            });

            el.classList.add("border-(--color-purple)", "bg-(--color-stroke2)");
            el.classList.remove("border-(--color-stroke)");
            el.querySelectorAll("i, p").forEach(child => {
                child.classList.add("text-(--color-purple)");
                child.classList.remove("text-(--text-placeholder)");
            });

            document.querySelector("#card_fields").classList.add("hidden");
            document.querySelector("#cash_fields").classList.add("hidden");
            document.querySelector("#wallet_fields").classList.add("hidden");

            if (type === "card") document.querySelector("#card_fields").classList.remove("hidden");
            if (type === "cash") document.querySelector("#cash_fields").classList.remove("hidden");
            if (type === "wallet") document.querySelector("#wallet_fields").classList.remove("hidden");
        }

        // ===== Promo Code =====
        function applyPromo() {
            const code = document.querySelector("#promo_input").value.trim().toUpperCase();
            const msg = document.querySelector("#promo_msg");

            if (code === VALID_PROMO) {
                discountApplied = true;
                msg.innerHTML = `<i class="fa-solid fa-check text-green-500 me-1"></i> 10% discount applied!`;
                msg.classList.remove("hidden", "text-red-500");
                msg.classList.add("text-green-600");
            } else {
                discountApplied = false;
                msg.innerHTML = `<i class="fa-solid fa-xmark text-red-500 me-1"></i> Invalid promo code.`;
                msg.classList.remove("hidden", "text-green-600");
                msg.classList.add("text-red-500");
            }
            renderSummary();
        }

        // ===== Place Order =====
        function placeOrder() {
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }
            document.querySelector("#success_modal").classList.remove("hidden");
        }

        function clearCart() {
            localStorage.removeItem("cart");
        }

        // ===== Card Number Formatting =====
        document.querySelector("#card_number").addEventListener("input", function () {
            let val = this.value.replace(/\D/g, "").substring(0, 16);
            this.value = val.replace(/(.{4})/g, "$1 ").trim();
        });

        document.querySelector("#expiry").addEventListener("input", function () {
            let val = this.value.replace(/\D/g, "").substring(0, 4);
            if (val.length >= 2) val = val.substring(0, 2) + " / " + val.substring(2);
            this.value = val;
        });

        // ===== Mobile Menu =====
        document.querySelector("#mobile_menu_btn").addEventListener("click", () => {
            document.querySelector("#mobile_menu").classList.toggle("hidden");
        });