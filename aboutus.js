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

        // Intersection Observer for scroll-triggered animations
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

        // Observe all animated elements
        document.querySelectorAll('.testimonial-card, .about-content').forEach(el => {
            observer.observe(el);
        });

        // Add typing effect to main heading
        window.addEventListener('load', () => {
            setTimeout(() => {
                const heading = document.querySelector('.about-text h2');
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
            }, 2000);
        });

        // Add subtle mouse movement effect
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            document.querySelectorAll('.testimonial-card').forEach((card, index) => {
                const speed = (index % 2 + 1) * 2;
                card.style.transform += ` translateX(${mouseX * speed}px) translateY(${mouseY * speed}px)`;
            });
        });

        // Reset positions when mouse leaves
        document.addEventListener('mouseleave', () => {
            document.querySelectorAll('.testimonial-card').forEach(card => {
                card.style.transform = card.style.transform.replace(/translateX\([^)]*\)/g, '').replace(/translateY\([^)]*\)/g, '');
            });
        });