document.addEventListener('DOMContentLoaded', function() {
    // ==================== MENU MOBILE ====================
    const mobileMenuToggle = () => {
        const menuBtn = document.querySelector('.menu-mobile');
        const nav = document.querySelector('.nav');
        
        if (menuBtn && nav) {
            menuBtn.addEventListener('click', () => {
                nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            });

            // Fechar menu ao clicar em links
            document.querySelectorAll('.nav a').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) nav.style.display = 'none';
                });
            });
        }
    };

    // ==================== CARROSSEL ====================
    const initCarousel = () => {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-item');
        const totalSlides = slides.length;
        const carousel = document.querySelector('.carousel');

        if (!slides.length || !carousel) return;

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            
            currentSlide = (index + totalSlides) % totalSlides;
            slides[currentSlide].classList.add('active');
        };

        // Controles
        document.querySelector('.carousel-control.prev')?.addEventListener('click', () => showSlide(currentSlide - 1));
        document.querySelector('.carousel-control.next')?.addEventListener('click', () => showSlide(currentSlide + 1));

        // Autoplay
        let slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
        
        // Pausar no hover
        carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
        carousel.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
        });

        showSlide(0);
    };

    // ==================== HEADER SCROLL ====================
    const headerScrollEffect = () => {
        const header = document.querySelector('.header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    };

    // ==================== SCROLL SUAVE ====================
    const smoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // ==================== ANIMAÇÕES ====================
    const initAnimations = () => {
        // Efeito de digitação no slogan
        const typeWriter = (element, text, i = 0) => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                setTimeout(() => typeWriter(element, text, i + 1), 100);
            }
        };

        const sloganElement = document.querySelector('.slogan');
        if (sloganElement) {
            const originalText = sloganElement.textContent;
            sloganElement.textContent = '';
            typeWriter(sloganElement, originalText);
        }

        // Animar itens de benefício
        document.querySelectorAll('.benefit-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
            item.classList.add('animate__animated', 'animate__fadeInUp');
        });
    };

    // ==================== FORMULÁRIO WHATSAPP ====================
    const setupWhatsAppForm = () => {
        const form = document.getElementById('orcamentoForm');
        if (!form) return;

        // Máscara para telefone
        const phoneField = document.getElementById('telefone');
        if (phoneField) {
            phoneField.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.substring(0, 11);
                
                if (value.length > 2) {
                    value = `(${value.substring(0,2)}) ${value.substring(2)}`;
                    if (value.length > 10) {
                        value = `${value.substring(0,10)}-${value.substring(10)}`;
                    }
                }
                e.target.value = value;
            });
        }

        // Envio do formulário
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nome: document.getElementById('nome').value,
                telefone: document.getElementById('telefone').value,
                email: document.getElementById('email').value,
                mensagem: document.getElementById('mensagem').value,
                ambientes: Array.from(document.querySelectorAll('input[name="ambiente"]:checked'))
                                .map(cb => cb.value).join(', ')
            };

            const textoWhatsapp = `*Orçamento Bartzen Móveis Planejados*\n\n` +
                                 `Nome: ${formData.nome}\n` +
                                 `Telefone: ${formData.telefone}\n` +
                                 `${formData.email ? `E-mail: ${formData.email}\n` : ''}` +
                                 `Ambiente(s): ${formData.ambientes || 'Não especificado'}\n` +
                                 `Detalhes: ${formData.mensagem || 'Não informado'}\n\n` +
                                 `"Melhor que meu preço, só meu produto!"`;

            window.open(`https://wa.me/5511997061881?text=${encodeURIComponent(textoWhatsapp)}`, '_blank');
            this.reset();
        });
    };

    // ==================== RESPONSIVIDADE ====================
    const handleResponsive = () => {
        const nav = document.querySelector('.nav');
        if (!nav) return;

        const updateNavDisplay = () => {
            nav.style.display = window.innerWidth > 768 ? 'flex' : 'none';
        };

        window.addEventListener('resize', updateNavDisplay);
        updateNavDisplay();
    };

    // ==================== INICIALIZAR TUDO ====================
    mobileMenuToggle();
    initCarousel();
    headerScrollEffect();
    smoothScroll();
    initAnimations();
    setupWhatsAppForm();
    handleResponsive();
});

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('sellerVideoMP4');
    const thumbnail = document.querySelector('.video-thumbnail-overlay');
    const playBtn = document.querySelector('.play-button');
    const watchAgainBtn = document.querySelector('.watch-again');
    
    if (video && thumbnail) {
        // Click na thumbnail
        thumbnail.addEventListener('click', function() {
            video.play();
            video.setAttribute('controls', 'true');
            thumbnail.style.opacity = '0';
            thumbnail.style.pointerEvents = 'none';
            watchAgainBtn.style.display = 'flex';
        });
        
        // Botão de play customizado
        playBtn.addEventListener('click', function() {
            video.play();
            video.setAttribute('controls', 'true');
            thumbnail.style.opacity = '0';
            thumbnail.style.pointerEvents = 'none';
            watchAgainBtn.style.display = 'flex';
        });
        
        // Assistir novamente
        watchAgainBtn.addEventListener('click', function() {
            video.currentTime = 0;
            video.play();
        });
        
        // Resetar quando o vídeo terminar
        video.addEventListener('ended', function() {
            watchAgainBtn.style.display = 'flex';
        });
        
        // Lazy loading
        const videoObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                video.load();
                videoObserver.unobserve(video);
            }
        }, { threshold: 0.1 });
        
        videoObserver.observe(video);
    }
});