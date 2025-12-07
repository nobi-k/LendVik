// Handle image fallbacks for experts
document.addEventListener('DOMContentLoaded', function() {
    // Show placeholder if expert photo fails to load
    const expertPhotos = document.querySelectorAll('.expert-photo');
    expertPhotos.forEach(photo => {
        photo.addEventListener('error', function() {
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('avatar-placeholder')) {
                this.style.display = 'none';
                placeholder.style.display = 'flex';
            }
        });
    });

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-nav-open');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('mobile-nav-open');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const equipment = document.getElementById('equipment').value.trim();
        
        // Basic validation
        if (!name || !phone || !equipment) {
            showMessage('Пожалуйста, заполните все поля', 'error');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone) || phone.length < 10) {
            showMessage('Пожалуйста, введите корректный номер телефона', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual API call)
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showMessage('Спасибо! Мы свяжемся с вами в течение 15 минут.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // In production, you would send data to your backend:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, phone, equipment })
            // })
        }, 1500);
    });
}

// Show message function
function showMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
        ${type === 'success' 
            ? 'background-color: #d1fae5; color: #065f46;' 
            : 'background-color: #fee2e2; color: #991b1b;'
        }
    `;
    
    const form = document.getElementById('contact-form');
    form.appendChild(messageEl);
    
    // Scroll to message
    messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageEl.style.transition = 'opacity 0.3s';
        messageEl.style.opacity = '0';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

// Phone Input Formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value[0] === '8') {
                value = '7' + value.slice(1);
            }
            if (value[0] !== '7' && value.length > 0) {
                value = '7' + value;
            }
        }
        
        // Format: +7 (999) 123-45-67
        let formatted = '+7';
        if (value.length > 1) {
            formatted += ' (' + value.slice(1, 4);
        }
        if (value.length >= 4) {
            formatted += ') ' + value.slice(4, 7);
        }
        if (value.length >= 7) {
            formatted += '-' + value.slice(7, 9);
        }
        if (value.length >= 9) {
            formatted += '-' + value.slice(9, 11);
        }
        
        e.target.value = formatted;
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.problem-card, .expert-card, .report-item, .next-step-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Process cards animation
    const processCards = document.querySelectorAll('.process-card');
    const processObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });
    
    processCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        processObserver.observe(card);
    });
});

// Add active state to navigation links on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        if (window.pageYOffset >= sectionTop - headerHeight - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Callback Modal Functions
function openCallbackModal() {
    const modal = document.getElementById('callbackModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCallbackModal() {
    const modal = document.getElementById('callbackModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle callback form submission
function handleCallbackSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = document.getElementById('callback-name').value.trim();
    const phone = document.getElementById('callback-phone').value.trim();
    const time = document.getElementById('callback-time').value;
    
    if (!name || !phone || !time) {
        showCallbackMessage('Пожалуйста, заполните все поля', 'error', form);
        return;
    }
    
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10) {
        showCallbackMessage('Пожалуйста, введите корректный номер телефона', 'error', form);
        return;
    }
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showCallbackMessage('Спасибо! Мы свяжемся с вами в указанное время.', 'success', form);
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Close modal after 2 seconds
        setTimeout(() => {
            closeCallbackModal();
        }, 2000);
    }, 1500);
}

// Show message function for callback form
function showCallbackMessage(message, type, form) {
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
        ${type === 'success' 
            ? 'background-color: #d1fae5; color: #065f46;' 
            : 'background-color: #fee2e2; color: #991b1b;'
        }
    `;
    
    form.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.style.transition = 'opacity 0.3s';
        messageEl.style.opacity = '0';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCallbackModal();
    }
});

// Phone formatting for callback form
document.addEventListener('DOMContentLoaded', function() {
    const callbackPhoneInput = document.getElementById('callback-phone');
    if (callbackPhoneInput) {
        callbackPhoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value[0] === '8') {
                    value = '7' + value.slice(1);
                }
                if (value[0] !== '7' && value.length > 0) {
                    value = '7' + value;
                }
            }
            
            let formatted = '+7';
            if (value.length > 1) {
                formatted += ' (' + value.slice(1, 4);
            }
            if (value.length >= 4) {
                formatted += ') ' + value.slice(4, 7);
            }
            if (value.length >= 7) {
                formatted += '-' + value.slice(7, 9);
            }
            if (value.length >= 9) {
                formatted += '-' + value.slice(9, 11);
            }
            
            e.target.value = formatted;
        });
    }
});

// Download report example (placeholder function)
function downloadReportExample() {
    // In production, this would download an actual PDF
    // For now, we'll show a message
    alert('Пример отчёта будет доступен для скачивания после добавления PDF файла. Свяжитесь с нами для получения примера.');
    
    // You can replace this with actual PDF download:
    // window.open('path/to/example-report.pdf', '_blank');
}

// Form toggle functions
function showFullForm() {
    const quickForm = document.querySelector('.quick-form-container');
    const fullForm = document.getElementById('full-form-container');
    if (quickForm && fullForm) {
        quickForm.style.display = 'none';
        fullForm.style.display = 'block';
        fullForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function showQuickForm() {
    const quickForm = document.querySelector('.quick-form-container');
    const fullForm = document.getElementById('full-form-container');
    if (quickForm && fullForm) {
        quickForm.style.display = 'block';
        fullForm.style.display = 'none';
    }
}

// Handle quick form submission
function handleQuickFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const phone = document.getElementById('quick-phone').value.trim();
    
    if (!phone) {
        showQuickMessage('Пожалуйста, введите номер телефона', 'error', form);
        return;
    }
    
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10) {
        showQuickMessage('Пожалуйста, введите корректный номер телефона', 'error', form);
        return;
    }
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showQuickMessage('Спасибо! Мы свяжемся с вами в течение 15 минут.', 'success', form);
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

// Show message for quick form
function showQuickMessage(message, type, form) {
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
        ${type === 'success' 
            ? 'background-color: #d1fae5; color: #065f46;' 
            : 'background-color: #fee2e2; color: #991b1b;'
        }
    `;
    
    form.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.style.transition = 'opacity 0.3s';
        messageEl.style.opacity = '0';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

// Phone formatting for quick form
document.addEventListener('DOMContentLoaded', function() {
    const quickPhoneInput = document.getElementById('quick-phone');
    if (quickPhoneInput) {
        quickPhoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value[0] === '8') {
                    value = '7' + value.slice(1);
                }
                if (value[0] !== '7' && value.length > 0) {
                    value = '7' + value;
                }
            }
            
            let formatted = '+7';
            if (value.length > 1) {
                formatted += ' (' + value.slice(1, 4);
            }
            if (value.length >= 4) {
                formatted += ') ' + value.slice(4, 7);
            }
            if (value.length >= 7) {
                formatted += '-' + value.slice(7, 9);
            }
            if (value.length >= 9) {
                formatted += '-' + value.slice(9, 11);
            }
            
            e.target.value = formatted;
        });
    }
});

