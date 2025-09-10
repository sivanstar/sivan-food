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

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu after clicking
                    document.getElementById('menu').classList.remove('open');
                    document.querySelector('.hamburger-menu').classList.remove('active');
                }
            });
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .testimonial-card').forEach(el => {
            observer.observe(el);
        });

        // Discount Slider
        let discountIndex = 0;
        const discountSlides = document.querySelectorAll('.discount-slide');
        const discountSlider = document.getElementById('discountSlider');

        function showDiscountSlide(index) {
            const slideWidth = discountSlides[0].offsetWidth;
            discountSlider.style.transform = `translateX(-${index * slideWidth}px)`;
        }

        function autoSlideDiscounts() {
            discountIndex = (discountIndex + 1) % discountSlides.length;
            showDiscountSlide(discountIndex);
        }

        // Auto-slide every 4 seconds
        setInterval(autoSlideDiscounts, 4000);

        // Adjust slider on window resize
        window.addEventListener('resize', () => {
            showDiscountSlide(discountIndex);
        });

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

        // Add parallax effect to background - REMOVED to fix double background issue
        // window.addEventListener('scroll', () => {
        //     const scrolled = window.pageYOffset;
        //     const parallax = document.body;
        //     const speed = scrolled * 0.5;
        //     parallax.style.backgroundPositionY = speed + 'px';
        // });

        // Add mouse movement parallax effect
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            document.querySelectorAll('.food-card').forEach((card, index) => {
                const speed = (index + 1) * 2;
                card.style.transform = `translateX(${mouseX * speed}px) translateY(${mouseY * speed}px)`;
            });
        });

        // Reset card positions when mouse leaves
        document.addEventListener('mouseleave', () => {
            document.querySelectorAll('.food-card').forEach(card => {
                card.style.transform = '';
            });
        });

        // Add typing effect to main heading
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Apply typing effect when page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                const mainHeading = document.querySelector('.row-1 h1');
                const originalText = mainHeading.textContent;
                typeWriter(mainHeading, originalText, 80);
            }, 1500);
        });

        // Add floating animation to food cards
        document.querySelectorAll('.food-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('float-animation');
        });

        // CSS for floating animation (added via JavaScript)
        const style = document.createElement('style');
        style.textContent = `
            .float-animation {
                animation: float 6s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            .float-animation:nth-child(even) {
                animation-direction: reverse;
            }
        `;
        document.head.appendChild(style);