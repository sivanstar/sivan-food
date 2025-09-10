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
        function getCart() {
            return JSON.parse(localStorage.getItem('cart')) || [];
        }

        function saveCart(cart) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function addToCart(id, name, price) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ id, name, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Enhanced feedback with animation
            showAddToCartFeedback(name);
        }

        function showAddToCartFeedback(itemName) {
            // Create feedback element
            const feedback = document.createElement('div');
            feedback.textContent = `${itemName} added to cart!`;
            feedback.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #ff6600, #ff9900);
                color: white;
                padding: 20px 40px;
                border-radius: 25px;
                font-size: 1.1rem;
                font-weight: bold;
                z-index: 10000;
                box-shadow: 0 10px 30px rgba(255,102,0,0.4);
                opacity: 0;
                animation: feedbackPop 2s ease-out forwards;
            `;

            // Add animation keyframes
            if (!document.getElementById('feedback-style')) {
                const style = document.createElement('style');
                style.id = 'feedback-style';
                style.textContent = `
                    @keyframes feedbackPop {
                        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                        20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                        40% { transform: translate(-50%, -50%) scale(1); }
                        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    }
                `;
                document.head.appendChild(style);
            }

            document.body.appendChild(feedback);

            // Remove feedback element after animation
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 2000);
        }

        // Scroll to top functionality
        const scrollBtn = document.getElementById('scrollBtn');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.style.display = 'flex';
            } else {
                scrollBtn.style.display = 'none';
            }
        });

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Add mouse movement parallax effect for food cards
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            document.querySelectorAll('.food-card').forEach((card, index) => {
                const speed = (index % 3 + 1) * 2;
                card.style.transform += ` translateX(${mouseX * speed}px) translateY(${mouseY * speed}px)`;
            });
        });

        // Reset card positions when mouse leaves
        document.addEventListener('mouseleave', () => {
            document.querySelectorAll('.food-card').forEach(card => {
                card.style.transform = card.style.transform.replace(/translateX\([^)]*\)/g, '').replace(/translateY\([^)]*\)/g, '');
            });
        });

        // Add intersection observer for scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        // Observe all food cards
        document.querySelectorAll('.food-card').forEach(card => {
            observer.observe(card);
        });

        // Add typing effect to title
        function typeWriter(element, text, speed = 80) {
            let i = 0;
            const originalText = element.textContent;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            setTimeout(type, 1000);
        }

        // Apply typing effect when page loads
        window.addEventListener('load', () => {
            const title = document.querySelector('.menu-title');
            const originalText = title.textContent;
            typeWriter(title, originalText, 100);
        });

        // Add hover sound effect (optional - uncomment if you want sound)
        /*
        document.querySelectorAll('.food-card button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                // You can add a subtle hover sound here
                // const audio = new Audio('hover-sound.mp3');
                // audio.volume = 0.1;
                // audio.play().catch(() => {}); // Handle autoplay restrictions
            });
        });
        */

        // Performance optimization: Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            const cards = document.querySelectorAll('.food-card');
            if (document.hidden) {
                cards.forEach(card => {
                    card.style.animationPlayState = 'paused';
                });
            } else {
                cards.forEach(card => {
                    card.style.animationPlayState = 'running';
                });
            }
        });