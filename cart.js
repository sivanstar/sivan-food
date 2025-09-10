 window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loadingOverlay').classList.add('fade-out');
            }, 1000);
        });

        // Menu Toggle
        function toggleMenu() {
            const menu = document.getElementById('menu');
            const hamburger = document.querySelector('.hamburger-menu');
            
            menu.classList.toggle('open');
            hamburger.classList.toggle('active');
        }

        // Close menu when clicking outside
        window.addEventListener('click', function(event) {
            const menu = document.getElementById('menu');
            const hamburger = document.querySelector('.hamburger-menu');
            
            if (!hamburger.contains(event.target) && !menu.contains(event.target)) {
                menu.classList.remove('open');
                hamburger.classList.remove('active');
            }
        });

        // Parallax scrolling background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.body;
            const speed = scrolled * 0.5;
            parallax.style.backgroundPositionY = speed + 'px';
        });

        // Cart functionality
        const cartContainer = document.getElementById('cart-items');
        const totalDisplay = document.getElementById('cart-total');
        const clearBtn = document.getElementById('clear-cart');
        const orderBtn = document.getElementById('order-now');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function groupCartItems(cart) {
            const grouped = {};
            cart.forEach((item, index) => {
                const key = `${item.name}-${item.price}`;
                if (grouped[key]) {
                    grouped[key].quantity += 1;
                    grouped[key].indexes.push(index);
                } else {
                    grouped[key] = {
                        name: item.name,
                        price: item.price,
                        quantity: 1,
                        indexes: [index]
                    };
                }
            });
            return grouped;
        }

        function renderCart() {
            cartContainer.innerHTML = '';
            let total = 0;
            const groupedCart = groupCartItems(cart);
            const itemKeys = Object.keys(groupedCart);

            if (itemKeys.length === 0) {
                cartContainer.innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-cart-icon">🛒</div>
                        <p>Your cart is empty</p>
                        <a href="menu.html" class="shop-now-btn">Start Shopping</a>
                    </div>
                `;
                totalDisplay.innerHTML = '';
                clearBtn.style.display = "none";
                orderBtn.style.display = "none";
                return;
            }

            itemKeys.forEach((key, index) => {
                const item = groupedCart[key];
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                itemDiv.style.animationDelay = `${0.7 + (index * 0.1)}s`;
                itemDiv.innerHTML = `
                    <span>${item.name}</span>
                    <span>Qty: ${item.quantity}</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                    <button class="remove-btn" onclick="removeOneItem('${key}')">Remove</button>
                `;
                cartContainer.appendChild(itemDiv);
            });

            totalDisplay.innerHTML = `Total: $${total.toFixed(2)}`;
            clearBtn.style.display = "block";
            orderBtn.style.display = "block";
        }

        function removeOneItem(key) {
            const grouped = groupCartItems(cart);
            const item = grouped[key];
            if (item && item.indexes.length > 0) {
                const removeIndex = item.indexes[0];
                cart.splice(removeIndex, 1);
                saveCart();
                
                // Add removal animation
                showRemovalFeedback();
                setTimeout(() => {
                    renderCart();
                }, 300);
            }
        }

        function showRemovalFeedback() {
            const feedback = document.createElement('div');
            feedback.textContent = 'Item removed from cart!';
            feedback.style.cssText = `
                position: fixed;
                top: 20%;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(45deg, #ff6b6b, #ff5252);
                color: white;
                padding: 15px 30px;
                border-radius: 25px;
                font-weight: bold;
                z-index: 10000;
                box-shadow: 0 10px 30px rgba(255,107,107,0.4);
                opacity: 0;
                animation: feedbackSlide 2s ease-out forwards;
            `;

            if (!document.getElementById('removal-style')) {
                const style = document.createElement('style');
                style.id = 'removal-style';
                style.textContent = `
                    @keyframes feedbackSlide {
                        0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
                        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                    }
                `;
                document.head.appendChild(style);
            }

            document.body.appendChild(feedback);
            setTimeout(() => {
                if (document.body.contains(feedback)) {
                    document.body.removeChild(feedback);
                }
            }, 2000);
        }

        clearBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            
            cart = [];
            saveCart();
            
            // Add clear animation
            const cartItems = document.querySelectorAll('.cart-item');
            cartItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'slideOutRight 0.5s ease-out forwards';
                }, index * 100);
            });
            
            if (!document.getElementById('clear-style')) {
                const style = document.createElement('style');
                style.id = 'clear-style';
                style.textContent = `
                    @keyframes slideOutRight {
                        to { transform: translateX(100%); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            setTimeout(() => {
                renderCart();
            }, 600);
        });

        orderBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }
            window.location.href = "checkout.html";
        });

        // Initialize cart display
        renderCart();

        // Add typing effect to title
        window.addEventListener('load', () => {
            setTimeout(() => {
                const title = document.querySelector('h1');
                const originalText = title.textContent;
                title.textContent = '';
                
                let i = 0;
                function typeWriter() {
                    if (i < originalText.length) {
                        title.textContent += originalText.charAt(i);
                        i++;
                        setTimeout(typeWriter, 100);
                    }
                }
                typeWriter();
            }, 1200);
        });