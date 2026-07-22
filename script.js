// Safe Supabase init - only runs if library is loaded
let db = null;

if (typeof supabase !== 'undefined') {
    const { createClient } = supabase;
    const SUPABASE_URL = 'https://ihikukhauizvpxouzchw.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_85G28c2Luu3EMbLXSh9rxw_R8Q2sFsX';
    db = createClient(SUPABASE_URL, SUPABASE_KEY);
}

// ==================== NAVIGATION ACTIVE STATE ====================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Check if it's an internal section link (starts with #)
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault(); // Prevent default only for same-page hash links
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Scroll to section
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // Normal page links (e.g., pricing_page.html) will continue to work normally
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
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
});

// ==================== CTA BUTTONS ====================
document.addEventListener('DOMContentLoaded', function() {
    const startTrialButtons = document.querySelectorAll('.btn-primary');
    const demoButtons = document.querySelectorAll('.btn-secondary');
    
    startTrialButtons.forEach(button => {
        if (button.textContent.includes('Start Free Trial')) {
            button.addEventListener('click', function() {
                handleStartTrial();
            });
        }
    });

    demoButtons.forEach(button => {
        if (button.textContent.includes('Watch Demo') || button.textContent.includes('Book a Demo')) {
            button.addEventListener('click', function() {
                handleBookDemo();
            });
        }
    });
});

function handleStartTrial() {
    console.log('Starting free trial...');
    alert('Redirecting to signup page... (Demo)');
}

function handleBookDemo() {
    console.log('Opening demo booking...');
    alert('Opening demo booking form... (Demo)');
}

// ==================== SMOOTH ANIMATIONS ON SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const steps = document.querySelectorAll('.step');

    featureCards.forEach(card => observer.observe(card));
    testimonialCards.forEach(card => observer.observe(card));
    steps.forEach(step => observer.observe(step));
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    .feature-card, .testimonial-card, .step {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }

    .feature-card.fade-in, 
    .testimonial-card.fade-in,
    .step.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ==================== COUNTER ANIMATIONS ====================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

document.addEventListener('DOMContentLoaded', function() {
    const statValues = document.querySelectorAll('.stat-value');
    let hasAnimated = false;

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                statValues.forEach(value => {
                    const text = value.textContent;
                    const numberMatch = text.match(/\d+/);
                    if (numberMatch) {
                        const target = parseInt(numberMatch[0]);
                        
                        if (text.includes('$')) {
                            let current = 0;
                            const counterInterval = setInterval(() => {
                                current += target / 100;
                                if (current >= target) {
                                    value.textContent = '$' + target.toLocaleString();
                                    clearInterval(counterInterval);
                                } else {
                                    value.textContent = '$' + Math.floor(current).toLocaleString();
                                }
                            }, 16);
                        } else if (text.includes(',')) {
                            let current = 0;
                            const counterInterval = setInterval(() => {
                                current += target / 100;
                                if (current >= target) {
                                    value.textContent = Math.floor(target).toLocaleString();
                                    clearInterval(counterInterval);
                                } else {
                                    value.textContent = Math.floor(current).toLocaleString();
                                }
                            }, 16);
                        } else {
                            animateCounter(value, target);
                        }
                    }
                });
                hasAnimated = true;
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const dashboardPreview = document.querySelector('.dashboard-preview');
    if (dashboardPreview) {
        counterObserver.observe(dashboardPreview);
    }
});

// ==================== FORM HANDLING ====================
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.querySelector('.email-input');
    const subscribeButton = document.querySelector('.footer-section .btn-primary');

    if (subscribeButton) {
        subscribeButton.addEventListener('click', function() {
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                console.log('Subscribing email:', email);
                showNotification('Thanks for subscribing! Check your email.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeButton.click();
            }
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// ==================== HOVER EFFECTS ====================
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ==================== DASHBOARD ANIMATION ====================
document.addEventListener('DOMContentLoaded', function() {
    const dashboardPreview = document.querySelector('.dashboard-preview');
    
    if (dashboardPreview) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    dashboardPreview.style.animation = 'slideInRight 0.8s ease-out';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(dashboardPreview);
    }
});

const dashboardStyle = document.createElement('style');
dashboardStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(dashboardStyle);

// ==================== LOGIN BUTTON ====================
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.btn-login');
    
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            console.log('Opening login page...');
            alert('Redirecting to login page... (Demo)');
        });
    }
});

console.log('SalonSync website loaded successfully!');

// ==================== DARK MODE TOGGLE ====================
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update button icon
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
});

// ==================== PRICING TOGGLE ====================
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const priceAmounts = document.querySelectorAll('.amount');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected period
            const period = this.dataset.period;
            
            // Update prices
            priceAmounts.forEach(amount => {
                if (period === 'monthly') {
                    amount.textContent = amount.dataset.monthly;
                } else {
                    amount.textContent = amount.dataset.annual;
                }
            });
        });
    });
});

// ==================== FAQ ACCORDION ====================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(i => {
                if (i !== item) {
                    i.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// ==================== FORM HANDLING ====================
document.addEventListener('DOMContentLoaded', function() {
    const demoForm = document.getElementById('demoForm');
    
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                fullName: formData.get('fullName'),
                businessName: formData.get('businessName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                salonSize: formData.get('salonSize'),
                preferredDate: formData.get('preferredDate'),
                additionalNotes: formData.get('additionalNotes')
            };
            
            // Log for now (replace with actual API call)
            console.log('Demo booking request:', data);
            
            // Show success message
            showNotification('Demo booking confirmed! Check your email for details.', 'success');
            
            // Reset form
            this.reset();
        });
    }
});

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== NEWSLETTER ====================
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.newsletter-form').forEach(function (form) {
        const btn   = form.querySelector('.btn-primary');
        const input = form.querySelector('.email-input');
        if (!btn || !input) return;

        btn.addEventListener('click', function () {
            const email = input.value.trim();
            if (validateEmail(email)) {
                showNotification('✅ Thanks for subscribing! Check your email.', 'success');
                input.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });

        // Also trigger on Enter key
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                btn.click();
            }
        });
    });
});

// ==================== CONTACT FORM ====================
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        showNotification('✅ Message sent! We will get back to you shortly.', 'success');
        contactForm.reset();
    });
});

// ==================== SIGNUP FORM ====================
document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('.auth-form');
    if (!signupForm || !document.getElementById('passwordSignup')) return;

    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email    = document.getElementById('emailSignup').value;
        const password = document.getElementById('passwordSignup').value;
        const confirm  = document.getElementById('confirmPassword').value;
        const agreed   = document.getElementById('agreeTerms').checked;

        if (!agreed) {
            showNotification('Please agree to the Terms of Service.', 'error');
            return;
        }

        if (password !== confirm) {
            showNotification('Passwords do not match!', 'error');
            return;
        }

        if (password.length < 8) {
            showNotification('Password must be at least 8 characters.', 'error');
            return;
        }

        if (db) {
            const { error } = await db.auth.signUp({ email, password });
            if (error) {
                showNotification('Signup failed: ' + error.message, 'error');
            } else {
                showNotification('✅ Account created! Check your email to confirm.', 'success');
                signupForm.reset();
            }
        } else {
            showNotification('✅ Account created successfully! (Demo mode)', 'success');
            signupForm.reset();
        }
    });
});

// ==================== START FREE TRIAL BUTTON ====================
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.btn-primary').forEach(function (btn) {
        if (btn.textContent.trim() === 'Start Free Trial') {
            btn.addEventListener('click', function () {
                window.location.href = 'signup.html';
            });
        }
    });
});

// ==================== PAYMENT PAGE ====================

// Cart state - GLOBAL so functions can access it
let cart = [
    { name: 'Pro Plan', desc: 'Monthly subscription · Up to 10 staff', price: 59 }
];

const plans = {
    starter:    { name: 'Starter Plan',    desc: 'Up to 2 staff · Basic features',       price: 29  },
    pro:        { name: 'Pro Plan',         desc: 'Up to 10 staff · Full features',        price: 59  },
    enterprise: { name: 'Enterprise Plan',  desc: 'Unlimited staff · Custom integrations', price: 199 }
};

// Select plan
function selectPlan(planKey) {
    const plan = plans[planKey];
    if (!plan) return;

    cart = [{ ...plan }];

    // Update card highlights
    document.querySelectorAll('.plan-select-card').forEach(card => {
        card.classList.remove('active-plan-card');
    });
    document.querySelectorAll('.plan-select-btn').forEach(btn => {
        btn.classList.remove('active-plan');
    });

    const selectedCard = document.querySelector(`.plan-select-card[data-plan="${planKey}"]`);
    const selectedBtn  = document.querySelector(`.plan-select-btn[data-plan="${planKey}"]`);
    if (selectedCard) selectedCard.classList.add('active-plan-card');
    if (selectedBtn)  selectedBtn.classList.add('active-plan');

    renderCart();
    updateSummary();
    showNotification('✅ ' + plan.name + ' selected!', 'success');
}

// Render cart
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;

    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="cart-item" style="justify-content:center; color:#9CA3AF; font-size:14px; padding:20px;">
                No plan selected. Choose a plan below.
            </div>`;
        return;
    }

    cart.forEach(function(item, index) {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <p>${item.name}</p>
                <p>${item.desc}</p>
            </div>
            <div class="cart-item-right">
                <span class="cart-item-price">$${item.price}.00</span>
                <button class="cart-remove-btn" onclick="removeItem(${index})">✕</button>
            </div>
        `;
        cartContainer.appendChild(div);
    });
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
    updateSummary();
    document.querySelectorAll('.plan-select-card').forEach(c => c.classList.remove('active-plan-card'));
    document.querySelectorAll('.plan-select-btn').forEach(b => b.classList.remove('active-plan'));
}

// Update totals — returns total
function updateSummary() {
    const subtotalEl = document.getElementById('subtotal');
    const gstEl      = document.getElementById('gst');
    const totalEl    = document.getElementById('total');
    if (!subtotalEl) return 0;

    const subtotal = cart.reduce(function(sum, item) { return sum + item.price; }, 0);
    const gst      = subtotal * 0.1;
    const total    = subtotal + gst;

    subtotalEl.textContent = '$' + subtotal.toFixed(2);
    gstEl.textContent      = '$' + gst.toFixed(2);
    totalEl.textContent    = '$' + total.toFixed(2);

    return total;
}

// Generate bill
function generateBill() {
    const billOutput = document.getElementById('bill-output');
    if (!billOutput) return;

    if (cart.length === 0) {
        showNotification('Please select a plan first!', 'error');
        return;
    }

    const subtotal   = cart.reduce(function(sum, item) { return sum + item.price; }, 0);
    const gst        = subtotal * 0.1;
    const total      = subtotal + gst;
    const date       = new Date().toLocaleDateString('en-AU');
    const invoiceNum = 'INV-' + Math.floor(Math.random() * 90000 + 10000);

    const itemRows = cart.map(function(item) {
        return `
            <tr>
                <td style="padding:10px 0; border-bottom:1px solid #E5E7EB;">${item.name}</td>
                <td style="padding:10px 0; border-bottom:1px solid #E5E7EB; color:#6B7280; font-size:13px;">${item.desc}</td>
                <td style="padding:10px 0; border-bottom:1px solid #E5E7EB; text-align:right; font-weight:700; color:#7C3AED;">$${item.price}.00</td>
            </tr>
        `;
    }).join('');

    billOutput.style.display = 'block';
    billOutput.innerHTML = `
        <div class="bill-header">
            <strong>🧾 AuraSync Tax Invoice</strong>
            <span>ABN: 42 123 456 789</span>
        </div>
        <hr class="bill-divider">

        <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
            <div>
                <p><strong>Invoice #:</strong> ${invoiceNum}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Due Date:</strong> ${date}</p>
            </div>
            <div style="text-align:right;">
                <p><strong>From:</strong> AuraSync Pty Ltd</p>
                <p>ABN: 42 123 456 789</p>
                <p>hello@aurasync.io</p>
            </div>
        </div>

        <hr class="bill-divider">

        <table style="width:100%; border-collapse:collapse; font-size:14px;">
            <thead>
                <tr style="font-size:12px; color:#9CA3AF; text-transform:uppercase;">
                    <th style="text-align:left; padding-bottom:8px;">Plan</th>
                    <th style="text-align:left; padding-bottom:8px;">Description</th>
                    <th style="text-align:right; padding-bottom:8px;">Amount</th>
                </tr>
            </thead>
            <tbody>${itemRows}</tbody>
        </table>

        <hr class="bill-divider">

        <div style="text-align:right; font-size:14px; line-height:2;">
            <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)} AUD</p>
            <p><strong>GST (10%):</strong> $${gst.toFixed(2)} AUD</p>
            <p style="font-size:18px; color:#7C3AED;"><strong>Total Due: $${total.toFixed(2)} AUD</strong></p>
        </div>

        <hr class="bill-divider">

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <p class="bill-footer">
                Thank you for choosing AuraSync! 🎉<br>
                hello@aurasync.io · +61 2 9000 1234<br>
                Level 12, 80 Collins St, Melbourne VIC 3000
            </p>
            <button onclick="printBill()" class="btn-secondary" style="font-size:13px; padding:8px 16px;">
                🖨️ Print Invoice
            </button>
        </div>
    `;

    billOutput.scrollIntoView({ behavior: 'smooth' });
}

// Print bill
function printBill() {
    const billContent = document.getElementById('bill-output').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>AuraSync Invoice</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; color: #1F2937; }
                table { width: 100%; border-collapse: collapse; }
                hr { border: none; border-top: 1px solid #E5E7EB; margin: 16px 0; }
                button { display: none; }
                .bill-header { text-align:center; margin-bottom:16px; }
                .bill-header strong { font-size:20px; color:#7C3AED; display:block; }
                .bill-footer { font-size:12px; color:#6B7280; }
            </style>
        </head>
        <body>${billContent}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Init payment page
document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('paypal-button-container')) return;

    // Initial render
    renderCart();
    updateSummary();

    // Set pro as default selected
    const proCard = document.querySelector('.plan-select-card[data-plan="pro"]');
    const proBtn  = document.querySelector('.plan-select-btn[data-plan="pro"]');
    if (proCard) proCard.classList.add('active-plan-card');
    if (proBtn)  proBtn.classList.add('active-plan');

    // PayPal
    if (typeof paypal !== 'undefined') {
        paypal.Buttons({
            createOrder: function (data, actions) {
                if (cart.length === 0) {
                    showNotification('Please select a plan first!', 'error');
                    return;
                }
                const total = updateSummary();
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: total.toFixed(2),
                            currency_code: 'AUD'
                        },
                        description: cart.map(function(i) { return i.name; }).join(', ')
                    }]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    showNotification(
                        '✅ Payment successful! Thank you, ' + details.payer.name.given_name + '!',
                        'success'
                    );
                    generateBill();
                });
            },
            onError: function (err) {
                showNotification('Payment failed. Please try again.', 'error');
            },
            style: {
                color:  'blue',
                shape:  'rect',
                label:  'pay',
                height: 45
            }
        }).render('#paypal-button-container');
    }
});
// ==================== SCROLL REVEAL (site-wide, auto-applied) ====================
document.addEventListener('DOMContentLoaded', function () {
    var revealSelectors = [
        '.section-header', '.feature-card', '.testimonial-card', '.pricing-card',
        '.drive-card', '.team-card', '.step', '.timeline-item', '.faq-item',
        '.setup-steps .step', '.cta h2', '.cta p', '.live-demo-copy', '.demo-widget'
    ];
    var targets = document.querySelectorAll(revealSelectors.join(','));

    targets.forEach(function (el, i) {
        el.classList.add('reveal');
        // stagger items that share a parent (cards in a grid, steps in a row, etc.)
        var siblingIndex = Array.prototype.indexOf.call(el.parentElement ? el.parentElement.children : [], el);
        var delay = Math.min((siblingIndex >= 0 ? siblingIndex : i) * 90, 450);
        el.style.transitionDelay = delay + 'ms';
    });

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        targets.forEach(function (el) { observer.observe(el); });
    } else {
        // Fallback: no IntersectionObserver support, just show everything
        targets.forEach(function (el) { el.classList.add('visible'); });
    }
});

// ==================== ANIMATED COUNTERS (stat-value numbers) ====================
document.addEventListener('DOMContentLoaded', function () {
    var statEls = document.querySelectorAll('.stat-value');
    if (!statEls.length) return;

    function animateCount(el) {
        var raw = el.textContent.trim();
        var match = raw.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
        if (!match) return; // not a number we can parse, leave as-is
        var prefix = match[1];
        var numberStr = match[2];
        var suffix = match[3];
        var target = parseFloat(numberStr.replace(/,/g, ''));
        var hasComma = numberStr.indexOf(',') !== -1;
        var duration = 1200;
        var startTime = null;

        function frame(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            var current = Math.round(target * eased);
            var display = hasComma ? current.toLocaleString('en-US') : String(current);
            el.textContent = prefix + display + suffix;
            if (progress < 1) {
                requestAnimationFrame(frame);
            } else {
                el.textContent = prefix + numberStr + suffix; // exact final value
            }
        }
        requestAnimationFrame(frame);
    }

    if ('IntersectionObserver' in window) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        statEls.forEach(function (el) { counterObserver.observe(el); });
    } else {
        statEls.forEach(animateCount);
    }
});

// ==================== LIVE DEMO WIDGET (interactive booking preview) ====================
document.addEventListener('DOMContentLoaded', function () {
    var widget = document.getElementById('liveDemoWidget');
    if (!widget) return;

    var slots = widget.querySelectorAll('.demo-slot:not(.disabled)');
    var feed = widget.querySelector('.demo-feed');
    var resetBtn = widget.querySelector('.demo-reset');
    var emptyMsg = feed ? feed.querySelector('.demo-feed-empty') : null;

    var names = ['Sarah M.', 'David N.', 'Olivia P.', 'Ben C.', 'Ria K.', 'Tom H.'];
    var nameIndex = 0;

    slots.forEach(function (slot) {
        slot.addEventListener('click', function () {
            if (slot.classList.contains('booked')) return;
            slot.classList.add('booked');
            var time = slot.textContent.trim();
            var clientName = names[nameIndex % names.length];
            nameIndex++;

            if (emptyMsg) { emptyMsg.remove(); }

            var item = document.createElement('div');
            item.className = 'demo-feed-item';
            item.innerHTML = '<span class="check">✓</span><span>' + time + ' — ' + clientName + ' booked an appointment</span>';
            feed.appendChild(item);

            if (typeof showNotification === 'function') {
                showNotification('Slot ' + time + ' booked — that\'s how easy it is!', 'success');
            }
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            slots.forEach(function (slot) { slot.classList.remove('booked'); });
            feed.querySelectorAll('.demo-feed-item').forEach(function (item) { item.remove(); });
            if (!feed.querySelector('.demo-feed-empty')) {
                var p = document.createElement('p');
                p.className = 'demo-feed-empty';
                p.textContent = 'Click a time slot to see a live booking come in →';
                feed.appendChild(p);
            }
            nameIndex = 0;
        });
    }
});

// ==================== SPLASH / INTRO PAGE ====================
document.addEventListener('DOMContentLoaded', function () {
    var lettersEl = document.getElementById('splashLetters');
    if (!lettersEl) return; // not on the splash page

    var text = 'AURA SYNC';
    var baseDelay = 0.15; // seconds before letters start
    var stepDelay = 0.06; // stagger between letters

    text.split('').forEach(function (ch, i) {
        var span = document.createElement('span');
        if (ch === ' ') {
            span.className = 'letter space';
            span.textContent = '\u00A0';
        } else {
            span.className = 'letter';
            span.textContent = ch;
        }
        span.style.animationDelay = (baseDelay + i * stepDelay) + 's';
        lettersEl.appendChild(span);
    });

    // Auto-fill progress bar, then move to the homepage
    var fill = document.getElementById('splashProgressFill');
    var AUTO_ADVANCE_MS = 4500;
    var progressStart = null;
    var cancelled = false;

    function stepProgress(ts) {
        if (cancelled) return;
        if (!progressStart) progressStart = ts;
        var elapsed = ts - progressStart;
        var pct = Math.min((elapsed / (AUTO_ADVANCE_MS - 2000)) * 100, 100);
        if (fill) fill.style.width = pct + '%';
        if (elapsed < AUTO_ADVANCE_MS - 2000) {
            requestAnimationFrame(stepProgress);
        }
    }
    // Start filling the bar once it becomes visible (matches its own CSS delay)
    setTimeout(function () { requestAnimationFrame(stepProgress); }, 2000);

    var autoNav = setTimeout(function () {
        if (!cancelled) window.location.href = 'home.html';
    }, AUTO_ADVANCE_MS);

    // Cancel auto-navigation if the person interacts (clicks Enter/Skip manually already navigate away)
    ['click', 'keydown', 'touchstart'].forEach(function (evt) {
        window.addEventListener(evt, function () {
            cancelled = true;
            clearTimeout(autoNav);
        }, { once: true, passive: true });
    });
});
