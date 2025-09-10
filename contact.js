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

        // Form submission with animation
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

        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();

            if (!name || !email || !message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }

            // Simulate form submission
            showMessage(`Thank you ${name}! Your message has been sent successfully. We'll get back to you soon.`);
            
            // Reset form
            this.reset();
        });

        // Add typing effect to main heading
        window.addEventListener('load', () => {
            setTimeout(() => {
                const heading = document.querySelector('.contact-text h2');
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

        // Add subtle hover effects to form inputs
        document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });

        // Add click animation to contact info items
        document.querySelectorAll('.contact-info ul li').forEach(item => {
            item.addEventListener('click', function() {
                const icon = this.querySelector('i');
                icon.style.animation = 'bounce 0.5s ease';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 500);
            });
        });

        // Add bounce animation for contact info icons
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 60%, 100% { transform: translateY(0) scale(1.2); }
                40% { transform: translateY(-10px) scale(1.3); }
                80% { transform: translateY(-5px) scale(1.2); }
            }
        `;
        document.head.appendChild(style);