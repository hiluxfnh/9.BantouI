// script.js

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les éléments du DOM
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    const languageBtn = document.querySelector('.language-btn');
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageLinks = document.querySelectorAll('.language-dropdown a');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.querySelector('.newsletter-form');
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('header');
    
    // Menu mobile toggle
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // Gestion du sélecteur de langue
    if (languageBtn && languageDropdown) {
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.style.display = languageDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        // Fermer le dropdown en cliquant à l'extérieur
        document.addEventListener('click', function(e) {
            if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.style.display = 'none';
            }
        });
    }
    
    // Changer de langue
    if (languageLinks) {
        languageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                updateLanguage(lang);
            });
        });
    }
    
    // Soumission du formulaire de contact
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation simple
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            if (!name.value || !email.value || !subject.value || !message.value) {
                showNotification('Veuillez remplir tous les champs', 'error');
                return;
            }
            
            // Envoyer le formulaire (simulation)
            showNotification('Merci pour votre message! Nous vous contacterons bientôt.', 'success');
            contactForm.reset();
        });
    }
    
    // Soumission de la newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (!emailInput || !validateEmail(emailInput.value)) {
                showNotification('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            // Envoyer l'email (simulation)
            showNotification('Merci de votre abonnement à notre newsletter!', 'success');
            this.reset();
        });
    }
    
    // Navigation fluide
    if (scrollLinks && header) {
        scrollLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Fermer le menu mobile si ouvert
                    if (menu && menu.classList.contains('active')) {
                        menu.classList.remove('active');
                        if (menuToggle) {
                            const icon = menuToggle.querySelector('i');
                            if (icon) {
                                icon.classList.remove('fa-times');
                                icon.classList.add('fa-bars');
                            }
                        }
                    }
                }
            });
        });
    }
    
    // Effet de défilement sur l'en-tête
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.padding = '10px 0';
                header.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.padding = '20px 0';
                header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // Animation des sections au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-title, .president-container, .domaine-card, .news-card, .contact-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialiser les animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Appeler au chargement pour les éléments déjà visibles
    
    // Charger la langue sauvegardée
    const savedLang = localStorage.getItem('selectedLanguage') || 'fr';
    updateLanguage(savedLang, false);
});

// Mettre à jour la langue
function updateLanguage(lang, showNotification = true) {
    const languageBtn = document.querySelector('.language-btn');
    
    if (languageBtn) {
        // Mettre à jour le texte du bouton
        languageBtn.innerHTML = lang === 'fr' ? 'FR <i class="fas fa-chevron-down"></i>' : 
                              lang === 'ru' ? 'RU <i class="fas fa-chevron-down"></i>' : 
                              'EN <i class="fas fa-chevron-down"></i>';
        
        // Fermer le dropdown
        const languageDropdown = document.querySelector('.language-dropdown');
        if (languageDropdown) {
            languageDropdown.style.display = 'none';
        }
        
        // Sauvegarder la préférence
        localStorage.setItem('selectedLanguage', lang);
        
        // Afficher la notification
        if (showNotification) {
            const langName = lang === 'fr' ? 'Français' : lang === 'ru' ? 'Russe' : 'Anglais';
            showNotification(`Langue changée en ${langName}`, 'info');
        }
        
        // Pour une implémentation complète du multilinguisme:
        // translatePage(lang);
    }
}

// Afficher une notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Icône selon le type
    let iconClass = 'fa-info-circle';
    if (type === 'success') iconClass = 'fa-check-circle';
    if (type === 'error') iconClass = 'fa-exclamation-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${iconClass}"></i>
            <span>${message}</span>
        </div>
        <div class="notification-progress"></div>
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Animation de progression
    const progress = notification.querySelector('.notification-progress');
    if (progress) {
        progress.style.width = '100%';
        progress.style.transition = 'width 5s linear';
    }
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Valider un email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Fonction de traduction (exemple - nécessite une implémentation complète)
function translatePage(lang) {
    // Ceci nécessiterait un objet avec toutes les traductions
    const translations = {
        fr: {
            // Traductions françaises
        },
        ru: {
            // Traductions russes
        },
        en: {
            // Traductions anglaises
        }
    };
    
    // Mettre à jour le contenu de la page
    // document.querySelectorAll('[data-translate]').forEach(el => {
    //     const key = el.getAttribute('data-translate');
    //     if (translations[lang] && translations[lang][key]) {
    //         el.textContent = translations[lang][key];
    //     }
    // });
    
    // Mettre à jour les attributs lang
    document.documentElement.lang = lang;
}

// Animation pour les cartes de domaines
document.querySelectorAll('.domaine-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Animation pour les cartes d'actualités
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Animation de la signature du président
const signature = document.querySelector('.signature');
if (signature) {
    signature.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    signature.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Initialiser les animations des icônes de contact
document.querySelectorAll('.contact-info-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.contact-icon i');
        if (icon) {
            icon.style.transform = 'scale(1.2)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.contact-icon i');
        if (icon) {
            icon.style.transform = 'scale(1)';
        }
    });
});

// Initialiser les animations des liens sociaux
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Initialiser les animations des liens du footer
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.paddingLeft = '15px';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.paddingLeft = '0';
    });
});

// Prévenir la soumission des formulaires non implémentés
document.querySelectorAll('form').forEach(form => {
    if (form.id !== 'contactForm' && !form.classList.contains('newsletter-form')) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Cette fonctionnalité est en cours de développement', 'info');
        });
    }
});