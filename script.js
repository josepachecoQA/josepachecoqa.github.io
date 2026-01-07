/* ========================================
   SMOOTH SCROLLING E NAVEGAÇÃO
   ======================================== */

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ========================================
   ANIMAÇÃO DE ENTRADA PARA ELEMENTOS
   ======================================== */

// Observador para animar elementos quando entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar observador a cards e elementos
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll(
        '.servico-card, .diferencial-item, .portfolio-card, .stat'
    );
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

/* ========================================
   EFEITO DE SCROLL NA NAVEGAÇÃO
   ======================================== */

// Adicionar classe quando scroll ultrapassa hero
const navbar = document.querySelector('.navbar');
const heroSection = document.querySelector('#hero');

window.addEventListener('scroll', () => {
    if (heroSection && window.scrollY > heroSection.offsetHeight - 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

/* ========================================
   ANIMAÇÃO DO NÚMERO DE ESTATÍSTICAS
   ======================================== */

function animateCounter(element, target, duration = 2000) {
    const isVisible = isElementInViewport(element);
    if (!isVisible) return;
    
    if (element.getAttribute('data-animated') === 'true') return;
    
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(interval);
            element.setAttribute('data-animated', 'true');
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Iniciar animação dos números quando a seção de sobre fica visível
const statNumbers = document.querySelectorAll('.stat-number');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.textContent);
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(number => {
    statsObserver.observe(number);
});

/* ========================================
   EFEITO HOVER EM LINKS
   ======================================== */

document.querySelectorAll('.portfolio-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

/* ========================================
   VALIDAÇÃO E SUBMISSÃO DE FORMULÁRIO (futuro)
   ======================================== */

// Placeholder para integração de formulário de contato
// Quando adicionar um formulário, este código pode ser expandido

const contactForm = document.querySelector('form[name="contact"]');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.querySelector('[name="name"]').value,
            email: this.querySelector('[name="email"]').value,
            message: this.querySelector('[name="message"]').value
        };
        
        // Validar campos
        if (!formData.name || !formData.email || !formData.message) {
            console.warn('Por favor, preencha todos os campos');
            return;
        }
        
        // Aqui seria integrado com serviço de backend ou EmailJS
        console.log('Formulário pronto para envio:', formData);
    });
}

/* ========================================
   COPY EMAIL PARA CLIPBOARD
   ======================================== */

// Permitir cópia do email ao clicar
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const email = this.getAttribute('href').replace('mailto:', '');
        // Navegador vai abrir cliente de email padrão
        // Se quiser copiar em vez disso, descomente:
        /*
        e.preventDefault();
        navigator.clipboard.writeText(email);
        console.log('Email copiado: ' + email);
        alert('Email copiado para clipboard!');
        */
    });
});

/* ========================================
   PERFORMANCE: LAZY LOADING DE IMAGENS
   ======================================== */

// Se adicionar imagens no futuro, usar observador para lazy loading
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

/* ========================================
   DARK MODE TOGGLE (Futuro)
   ======================================== */

// Verificar se usuário prefere dark/light mode do sistema
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
}

/* ========================================
   MONITORAR ATIVIDADE DO USUÁRIO
   ======================================== */

// Rastrear qual seção está sendo visualizada para analytics
const sections = document.querySelectorAll('section');
const currentSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            // Aqui poderia enviar dados de analytics
            console.log('Seção visualizada:', sectionId);
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    currentSectionObserver.observe(section);
});

/* ========================================
   INICIALIZAÇÃO
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Landing page carregada com sucesso');
    
    // Você pode adicionar mais inicializações aqui
    // Por exemplo: verificar localStorage, carregar dados da API, etc.
});

/* ========================================
   TRATAMENTO DE RESIZE
   ======================================== */

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log('Página redimensionada');
        // Recalcular posições se necessário
    }, 250);
});
