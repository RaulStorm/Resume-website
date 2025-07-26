// Loading Screen and Scroll Progress
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Start typing effect after loading screen is hidden
            updateTypingEffect();
        }, 500);
    }, 1500);
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Navbar Hide/Show on Scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden');
    }
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Language Switching Functionality
let currentLanguage = 'ru';

function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update page title
    if (lang === 'ru') {
        document.title = 'Раул Мусаев - Backend Developer';
    } else {
        document.title = 'Raul Musaev - Backend Developer';
    }
    
    // Store language preference
    localStorage.setItem('preferred-language', lang);
    
    // Update typing effect
    setTimeout(() => {
        updateTypingEffect();
    }, 100);
}

// Initialize language switcher
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
        changeLanguage(savedLanguage);
    } else {
        // If no saved language, set default
        currentLanguage = 'ru';
    }
    
    // Add event listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            changeLanguage(lang);
        });
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
});

// Ripple effect for buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        const ripple = document.createElement('span');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Tooltip functionality for skill items
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        // Отключаем magnetic effect на мобильных устройствах
        if (window.innerWidth > 768) {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0) scale(1)';
            });
        }
    });
    
    // Add 3D tilt effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Отключаем 3D tilt effect на мобильных устройствах
        if (window.innerWidth > 768) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        }
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        if (hero) {
            hero.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        }
    });
    
    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        observer.observe(section);
    });
    
    // Add typing effect enhancement
    const typeWriter = (element, text, speed = 100) => {
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
    };
    
    // Add glitch effect to hero title on hover
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', () => {
            heroTitle.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        heroTitle.addEventListener('animationend', () => {
            heroTitle.style.animation = '';
        });
    }
    
    skillItems.forEach(item => {
        const skillName = item.querySelector('span').textContent;
        
        item.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = skillName;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 12px;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = item.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
            
            item.tooltip = tooltip;
        });
        
        item.addEventListener('mouseleave', () => {
            if (item.tooltip) {
                item.tooltip.remove();
                item.tooltip = null;
            }
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .contact-item, .achievement');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent = text.substring(0, i + 1);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads (removed to avoid conflicts with language switcher)

// Update typing effect when language changes
function updateTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Add typing-text class for smaller font size
        heroTitle.classList.add('typing-text');
        
        // Display System.out.println code based on current language
        const codeText = currentLanguage === 'ru' 
            ? 'System.out.println("Добро пожаловать!");'
            : 'System.out.println("Welcome!");';
        typeWriter(heroTitle, codeText, 50);
    }
}

// Add hover effects to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Add click effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Diploma Modal Functions
function showDiploma() {
    const modal = document.getElementById('diplomaModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add ripple effect to the achievement
    const achievement = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = achievement.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    ripple.style.background = 'rgba(255, 215, 0, 0.6)';
    
    achievement.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function closeDiploma() {
    const modal = document.getElementById('diplomaModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const diplomaModal = document.getElementById('diplomaModal');
    const projectModal = document.getElementById('projectModal');
    
    if (event.target === diplomaModal) {
        closeDiploma();
    }
    
    if (event.target === projectModal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeDiploma();
        closeProjectModal();
    }
});

// Project Modal Functions
function showProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add ripple effect to the project card
    const projectCard = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = projectCard.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    ripple.style.background = 'rgba(102, 126, 234, 0.6)';
    
    projectCard.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);

    // Add screenshot handlers after modal is shown
    setTimeout(() => {
        addScreenshotHandlers();
    }, 100);
}

       function closeProjectModal() {
           const modal = document.getElementById('projectModal');
           modal.style.display = 'none';
           document.body.style.overflow = 'auto';
       }

       // Screenshot Modal Functions with Swiping
       let currentScreenshotIndex = 0;
       let screenshots = [];

       function showScreenshotModal(src, alt) {
           // Get all screenshots and find current index
           screenshots = Array.from(document.querySelectorAll('.screenshot'));
           currentScreenshotIndex = screenshots.findIndex(s => s.src === src);
           
           const modal = document.createElement('div');
           modal.className = 'screenshot-modal';
           modal.innerHTML = `
               <span class="close" onclick="closeScreenshotModal()">&times;</span>
               <div class="screenshot-modal-content">
                   <img src="${src}" alt="${alt}">
               </div>
               <button class="screenshot-nav prev" onclick="navigateScreenshot(-1)">‹</button>
               <button class="screenshot-nav next" onclick="navigateScreenshot(1)">›</button>
               <div class="screenshot-counter">${currentScreenshotIndex + 1} / ${screenshots.length}</div>
           `;
           document.body.appendChild(modal);
           modal.style.display = 'block';
           
           // Update navigation buttons
           updateScreenshotNavigation();
           
           // Close modal when clicking outside
           modal.addEventListener('click', function(e) {
               if (e.target === modal) {
                   closeScreenshotModal();
               }
           });

           // Close modal with Escape key
           document.addEventListener('keydown', function closeOnEscape(e) {
               if (e.key === 'Escape') {
                   closeScreenshotModal();
                   document.removeEventListener('keydown', closeOnEscape);
               }
           });

           // Add keyboard navigation
           document.addEventListener('keydown', function navigateOnKey(e) {
               if (e.key === 'ArrowLeft') {
                   navigateScreenshot(-1);
               } else if (e.key === 'ArrowRight') {
                   navigateScreenshot(1);
               }
               document.removeEventListener('keydown', navigateOnKey);
           });

           // Add touch/swipe support
           let startX = 0;
           let endX = 0;
           
           modal.addEventListener('touchstart', function(e) {
               startX = e.touches[0].clientX;
           });
           
           modal.addEventListener('touchend', function(e) {
               endX = e.changedTouches[0].clientX;
               handleSwipe();
           });
           
           function handleSwipe() {
               const swipeThreshold = 50;
               const diff = startX - endX;
               
               if (Math.abs(diff) > swipeThreshold) {
                   if (diff > 0) {
                       navigateScreenshot(1); // Swipe left - next
                   } else {
                       navigateScreenshot(-1); // Swipe right - previous
                   }
               }
           }
       }

       function closeScreenshotModal() {
           const modal = document.querySelector('.screenshot-modal');
           if (modal) {
               modal.remove();
           }
       }

       function navigateScreenshot(direction) {
           const newIndex = currentScreenshotIndex + direction;
           
           if (newIndex >= 0 && newIndex < screenshots.length) {
               currentScreenshotIndex = newIndex;
               const screenshot = screenshots[currentScreenshotIndex];
               
               const modalContent = document.querySelector('.screenshot-modal-content img');
               const counter = document.querySelector('.screenshot-counter');
               
               if (modalContent && counter) {
                   modalContent.src = screenshot.src;
                   modalContent.alt = screenshot.alt;
                   counter.textContent = `${currentScreenshotIndex + 1} / ${screenshots.length}`;
                   updateScreenshotNavigation();
               }
           }
       }

       function updateScreenshotNavigation() {
           const prevBtn = document.querySelector('.screenshot-nav.prev');
           const nextBtn = document.querySelector('.screenshot-nav.next');
           
           if (prevBtn) {
               prevBtn.disabled = currentScreenshotIndex === 0;
           }
           if (nextBtn) {
               nextBtn.disabled = currentScreenshotIndex === screenshots.length - 1;
           }
       }

       // Add click handlers for screenshots when project modal is shown
       function addScreenshotHandlers() {
           const screenshots = document.querySelectorAll('.screenshot');
           screenshots.forEach(screenshot => {
               screenshot.addEventListener('click', function(e) {
                   e.stopPropagation();
                   showScreenshotModal(this.src, this.alt);
               });
           });
       }

// Add tooltip functionality for skill items
document.querySelectorAll('.skill-item').forEach(item => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = item.querySelector('span').textContent;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    
    item.style.position = 'relative';
    item.appendChild(tooltip);
    
    item.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
    });
    
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
        tooltip.style.top = (e.clientY - rect.top - 30) + 'px';
    });
}); 

// Handle window resize and orientation changes
window.addEventListener('resize', () => {
    // Re-initialize animations based on new screen size
    const isMobile = window.innerWidth <= 768;
    
    // Update mobile menu state
    if (isMobile) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Re-apply or remove heavy animations based on screen size
    const buttons = document.querySelectorAll('.btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (isMobile) {
        // Remove heavy animations on mobile
        buttons.forEach(btn => {
            btn.style.transform = 'none';
        });
        projectCards.forEach(card => {
            card.style.transform = 'none';
        });
    }
});

// Add touch feedback for mobile devices
document.addEventListener('touchstart', (e) => {
    if (e.target.classList.contains('btn') || 
        e.target.classList.contains('project-card') || 
        e.target.classList.contains('skill-item') ||
        e.target.classList.contains('achievement')) {
        e.target.style.transform = 'scale(0.95)';
    }
});

document.addEventListener('touchend', (e) => {
    if (e.target.classList.contains('btn') || 
        e.target.classList.contains('project-card') || 
        e.target.classList.contains('skill-item') ||
        e.target.classList.contains('achievement')) {
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
}); 

// Add contact item interactions
document.addEventListener('DOMContentLoaded', () => {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        // Prevent default link behavior when clicking on the item
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        // Add ripple effect to contact items
        item.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = item.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            ripple.style.background = 'rgba(102, 126, 234, 0.3)';
            
            item.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add hover sound effect (optional - just visual feedback)
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });
}); 