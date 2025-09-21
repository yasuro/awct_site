// モバイルメニュー
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // スムーススクロール
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // モバイルメニューを閉じる
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // スクロールアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素
    const animateElements = document.querySelectorAll('.philosophy-card, .challenge-item, .feature-item, .flow-item, .pricing-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ヘッダーのスクロール処理
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // パララックス効果
    const heroSection = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroSection && heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
    
    // カウントアップアニメーション
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // フォームバリデーション（将来的な実装のため）
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // ここにフォーム送信処理を実装
            alert('お問い合わせありがとうございます。担当者より連絡させていただきます。');
        });
    });
    
    // タイピングアニメーション
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // ページロード時のアニメーション
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // ヒーローセクションのタイトルアニメーション
        const heroTitle = document.querySelector('.main-title');
        if (heroTitle) {
            heroTitle.style.animation = 'fadeInUp 1s ease forwards';
        }
    });
    
    // モバイルメニューのスタイル追加
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu.active {
            display: block !important;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(20px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            padding: 2rem 1rem;
            z-index: 999;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-menu.active ul {
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .nav-menu.active a {
            color: rgba(255, 255, 255, 0.9) !important;
            text-shadow: none;
            font-size: 1.1rem;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transition: var(--transition);
        }
        
        .nav-menu.active a:hover {
            color: var(--accent-light) !important;
            transform: translateX(10px);
        }
        
        .nav-menu.active .cta-button {
            background: var(--gradient-primary) !important;
            color: var(--white) !important;
            text-align: center;
            padding: 1rem 2rem !important;
            border-radius: 50px;
            border: none !important;
            box-shadow: 0 4px 20px rgba(0, 102, 255, 0.4);
        }
        
        .nav-menu.active .cta-button:hover {
            background: var(--primary-color) !important;
            transform: translateY(-2px);
            box-shadow: 0 6px 30px rgba(0, 102, 255, 0.6);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .header.scrolled {
            padding: 0.5rem 0;
        }
        
        .header.scrolled .nav-menu a {
            color: rgba(255, 255, 255, 0.95);
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
            
            .mobile-menu-toggle {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);
});

// 画像の遅延読み込み
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-lazy]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.lazy;
                img.removeAttribute('data-lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}