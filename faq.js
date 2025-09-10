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
        window.addEventListener('click', function(e) {
            const menu = document.getElementById('menu');
            const hamburger = document.querySelector('.hamburger-menu');
            
            if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
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

        // FAQ accordion functionality
        document.querySelectorAll('.faq-item').forEach((item, index) => {
            item.querySelector('.question').addEventListener('click', () => {
                // Close any other open items
                document.querySelectorAll('.faq-item.open').forEach(openItem => {
                    if (openItem !== item) {
                        openItem.classList.remove('open');
                    }
                });
                
                // Toggle this item
                item.classList.toggle('open');
                
                // Add a subtle pulse animation to the arrow
                const arrow = item.querySelector('.arrow');
                arrow.style.animation = 'pulse 0.3s ease';
                setTimeout(() => {
                    arrow.style.animation = '';
                }, 300);
            });
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

        // Add typing effect to main heading
        window.addEventListener('load', () => {
            setTimeout(() => {
                const heading = document.querySelector('.faq-container h1');
                const originalText = heading.textContent;
                heading.textContent = '';
                
                let i = 0;
                function typeWriter() {
                    if (i < originalText.length) {
                        heading.textContent += originalText.charAt(i);
                        i++;
                        setTimeout(typeWriter, 100);
                    }
                }
                typeWriter();
            }, 1500);
        });

        // Add pulse animation for arrows
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);

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

        // Observe FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            observer.observe(item);
        });