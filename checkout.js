  window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loadingOverlay').classList.add('fade-out');
            }, 1000);
        });

        // Parallax scrolling background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.body;
            const speed = scrolled * 0.5;
            parallax.style.backgroundPositionY = speed + 'px';
        });

        // Initialize checkout functionality
        window.addEventListener('DOMContentLoaded', () => {
            const savedDelivery = localStorage.getItem('deliveryOption');
            if (savedDelivery) {
                const deliveryOptions = document.getElementsByName('delivery');
                deliveryOptions.forEach(option => {
                    if (option.value === savedDelivery) {
                        option.checked = true;
                    }
                });
            }

            document.getElementsByName('delivery').forEach(option => {
                option.addEventListener('change', renderOrderSummary);
            });

            // Payment method functionality
            const paymentRadios = document.getElementsByName('payment');
            const cardDetailsSection = document.getElementById('card-details-section');

            function toggleCardDetails() {
                const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
                if (selectedPayment === 'card') {
                    cardDetailsSection.classList.add('show');
                } else {
                    cardDetailsSection.classList.remove('show');
                }
            }

            toggleCardDetails();
            paymentRadios.forEach(radio => {
                radio.addEventListener('change', toggleCardDetails);
            });

            renderOrderSummary();
        });

        // Cart and order functionality
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        function groupCartItems(cart) {
            const grouped = {};
            cart.forEach(item => {
                const key = `${item.name}-${item.price}`;
                if (grouped[key]) {
                    grouped[key].quantity += 1;
                } else {
                    grouped[key] = {
                        name: item.name,
                        price: item.price,
                        quantity: 1,
                    };
                }
            });
            return grouped;
        }

        function getDeliveryFee() {
            const delivery = document.querySelector('input[name="delivery"]:checked')?.value;
            if (delivery === 'standard') return 2;
            if (delivery === 'instant') return 4;
            return 0;
        }

        function renderOrderSummary() {
            const container = document.getElementById('order-summary-items');
            const totalDisplay = document.getElementById('order-total');

            container.innerHTML = '';
            let total = 0;

            if (cart.length === 0) {
                container.innerHTML = "<p>Your cart is empty.</p>";
                totalDisplay.textContent = '';
                return;
            }

            const groupedCart = groupCartItems(cart);
            Object.values(groupedCart).forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const p = document.createElement('p');
                p.textContent = `${item.name} x${item.quantity} — $${itemTotal.toFixed(2)}`;
                container.appendChild(p);
            });

            const deliveryFee = getDeliveryFee();
            if (deliveryFee > 0) {
                const deliveryP = document.createElement('p');
                deliveryP.textContent = `Delivery Fee — $${deliveryFee.toFixed(2)}`;
                container.appendChild(deliveryP);
            }

            total += deliveryFee;
            totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
        }

        function showMessage(text, type = 'success') {
            const message = document.createElement('div');
            message.className = `message ${type}`;
            message.textContent = text;
            document.body.appendChild(message);

            setTimeout(() => {
                if (document.body.contains(message)) {
                    document.body.removeChild(message);
                }
            }, 3000);
        }

        // Form submission
        document.getElementById('checkout-form').addEventListener('submit', function (e) {
            e.preventDefault();

            if (cart.length === 0) {
                showMessage('Your cart is empty. Please add some items before placing an order.', 'error');
                return;
            }

            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const phone = formData.get('phone').trim();
            const delivery = formData.get('delivery');
            const payment = formData.get('payment');

            if (!name || !email || !phone) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Card payment validation
            if (payment === 'card') {
                const cardNumber = formData.get('cardNumber').trim();
                const expiryDate = formData.get('expiryDate').trim();
                const cvv = formData.get('cvv').trim();

                if (!cardNumber || !expiryDate || !cvv) {
                    showMessage('Please fill in all card details.', 'error');
                    return;
                }

                if (!/^\d{13,19}$/.test(cardNumber.replace(/\s+/g, ''))) {
                    showMessage('Please enter a valid card number (13-19 digits).', 'error');
                    return;
                }

                if (!/^\d{3,4}$/.test(cvv)) {
                    showMessage('Please enter a valid CVV (3 or 4 digits).', 'error');
                    return;
                }
            }

            const totalText = document.getElementById('order-total').textContent;
            const totalAmount = totalText.split('$')[1];

            // Show success message with order details
            showMessage(`Thank you for your order, ${name}! Order Total: $${totalAmount}`, 'success');

            // Clear cart and redirect after delay
            setTimeout(() => {
                localStorage.removeItem('cart');
                window.location.href = 'index.html';
            }, 3000);
        });

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