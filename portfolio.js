// Section Navigation
const navItems = document.querySelectorAll('.nav-item, .dashboard-btn, [data-section]');
const sections = document.querySelectorAll('.section');

function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active', 'skills-active');
    });
    
    const activeNavItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeNavItem && activeNavItem.classList.contains('nav-item')) {
        activeNavItem.classList.add('active');
        if (sectionId === 'skills') {
            activeNavItem.classList.add('skills-active');
        }
    }
}

// Add click event listeners
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.getAttribute('data-section');
        if (sectionId) {
            showSection(sectionId);
        }
    });
});

// Terminal prompt typing effect
const terminalPrompt = document.querySelector('.terminal-prompt');
if (terminalPrompt) {
    const originalText = terminalPrompt.textContent;
    terminalPrompt.textContent = '';
    
    setTimeout(() => {
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                terminalPrompt.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        typeWriter();
    }, 500);
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    });
}

// AI Chat functionality
document.querySelector('.ai-chat').addEventListener('click', () => {
    const messages = [
        "Hello! I'm here to help you learn more about my work and experience.",
        "Feel free to ask me about any of my projects or technical skills!",
        "I can tell you more about my DevOps expertise or backend development experience.",
        "Would you like to know about my latest achievements or certifications?"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(`AI Assistant: ${randomMessage}`);
});

// Add subtle parallax effect to floating elements
window.addEventListener('mousemove', (e) => {
    const elements = document.querySelectorAll('.floating-element');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    elements.forEach((element, index) => {
        const moveX = (x - 0.5) * (10 + index * 5);
        const moveY = (y - 0.5) * (10 + index * 5);
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Smooth scroll to top when switching sections
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top when switching sections
navItems.forEach(item => {
    item.addEventListener('click', () => {
        setTimeout(smoothScrollToTop, 100);
    });
});

// Dynamic dashboard metrics animation
function animateMetrics() {
    const metrics = document.querySelectorAll('.dashboard-metric');
    metrics.forEach(metric => {
        const finalValue = metric.textContent;
        const isPercent = finalValue.includes('%');
        const isPlus = finalValue.includes('+');
        const numValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        
        let current = 0;
        const increment = Math.ceil(numValue / 30);
        const timer = setInterval(() => {
            current += increment;
            if (current >= numValue) {
                current = numValue;
                clearInterval(timer);
            }
            
            let display = current.toString();
            if (isPlus) display += '+';
            if (isPercent) display += '%';
            
            metric.textContent = display;
        }, 50);
    });
}

// Trigger metric animation when dashboard is shown
const dashboardBtn = document.querySelector('[data-section="dashboard"]');
if (dashboardBtn) {
    dashboardBtn.addEventListener('click', () => {
        setTimeout(animateMetrics, 500);
    });
}

// Function to change background color frequently
function changeBackgroundColor() {
    const colors = ['#ff69b4', '#33cc33', '#6666ff', '#ff9966', '#0099cc'];
    let index = 0;
    setInterval(() => {
        document.body.style.background = colors[index];
        index = (index + 1) % colors.length;
    }, 2000); // Change color every 2 seconds
}

// Function to get system configuration
function getSystemConfig() {
    const config = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
    };
    document.getElementById('system-config').innerHTML = `
        <h4>System Configuration:</h4>
        <p>User Agent: ${config.userAgent}</p>
        <p>Platform: ${config.platform}</p>
        <p>Language: ${config.language}</p>
    `;
}

// Function to get current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&limit=1`)
                .then(response => response.json())
                .then(data => {
                    const address = data.display_name;
                    document.getElementById('location').innerHTML = `
                        <h4>Current Location:</h4>
                        <p>${address}</p>
                    `;
                })
                .catch(error => console.error('Error:', error));
        }, error => console.error('Error:', error));
    } else {
        document.getElementById('location').innerHTML = 'Geolocation is not supported by this browser.';
    }
}

// Call the functions
// changeBackgroundColor();
getSystemConfig();
getCurrentLocation();
