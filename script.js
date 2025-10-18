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

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.stat, .skill-category, .project-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic form validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.backgroundPosition = `center ${rate}px`;
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Initialize counter animations when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section').forEach(section => {
        revealObserver.observe(section);
    });
});

// Project demo and output button functionality
document.addEventListener('DOMContentLoaded', () => {
    // Demo button handlers
    document.querySelectorAll('.demo-btn').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const projectTitles = [
                'AI-Based Traffic Management System',
                'Car Price Prediction System',
                'Interior Design Web Application',
                'Cloud-Based Resume Builder',
                'Phishing Detection System'
            ];
            
            const demoMessages = [
                '🚦 AI Traffic Management Demo:\n\n• Real-time traffic monitoring\n• LSTM-based traffic prediction\n• YOLOv5 emergency vehicle detection\n• 30% congestion reduction simulation\n\nDemo includes live traffic flow visualization and AI decision-making process.',
                '🚗 Car Price Prediction Demo:\n\n• Interactive car specification input\n• Real-time price prediction using ML models\n• 10% improved accuracy over traditional methods\n• Django-powered REST API integration\n\nDemo shows the complete prediction workflow with visual results.',
                '🏠 Interior Design Demo:\n\n• Gradio-powered interactive interface\n• Real-time design visualization\n• AI-enhanced design suggestions\n• Intuitive user experience\n\nDemo showcases the design process from concept to visualization.',
                '☁️ Cloud Resume Builder Demo:\n\n• Cloud-based resume creation\n• Real-time editing and preview\n• Secure cloud storage\n• Multiple template options\n\nDemo demonstrates the complete resume building workflow.',
                '🛡️ Phishing Detection Demo:\n\n• Streamlit-powered interactive interface\n• Real-time URL analysis and scanning\n• Machine learning pattern detection\n• Custom feature extraction algorithms\n• Comprehensive threat assessment\n• Simnept simulation tool validation\n\nDemo shows live phishing detection with URL input and real-time analysis results.'
            ];
            
            // Special handling for projects with demo videos
            if (index === 3) {
                showCloudResumeDemo(projectTitles[index]);
                return;
            } else if (index === 4) {
                showPhishingDetectionDemo(projectTitles[index]);
                return;
            }
            
            showProjectModal('Demo', projectTitles[index], demoMessages[index]);
        });
    });
    
    // Output button handlers
    document.querySelectorAll('.output-btn').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const projectTitles = [
                'AI-Based Traffic Management System',
                'Car Price Prediction System', 
                'Interior Design Web Application',
                'Cloud-Based Resume Builder',
                'Phishing Detection System'
            ];
            
            const outputMessages = [
                '📊 Project Output & Results:\n\n✅ 30% reduction in simulated traffic congestion\n✅ Real-time emergency vehicle detection accuracy: 95%\n✅ LSTM model prediction accuracy: 92%\n✅ React-based interactive dashboard\n✅ OpenCV integration for computer vision\n\nTechnologies: Python, React, TensorFlow, OpenCV, LSTM, YOLOv5',
                '💰 Project Output & Results:\n\n✅ 10% improvement in price prediction accuracy\n✅ 5 REST APIs successfully implemented\n✅ Responsive web interface created\n✅ Django framework integration\n✅ Real-time prediction system\n\nTechnologies: Python, HTML, CSS, JavaScript, Django, Machine Learning',
                '🎨 Project Output & Results:\n\n✅ Intuitive Gradio-based interface\n✅ Enhanced user experience for designers\n✅ Real-time design visualization platform\n✅ Successful team collaboration\n✅ ML-powered design suggestions\n\nTechnologies: Python, Gradio, Machine Learning Algorithms',
                '',
                '🛡️ Project Output & Results:\n\n✅ Machine learning-powered phishing detection\n✅ Real-time URL threat analysis system\n✅ Custom feature extraction algorithms\n✅ Streamlit-based interactive web interface\n✅ Comprehensive testing with Simnept simulation\n✅ High accuracy in phishing pattern identification\n✅ Individual project developed from scratch\n\nTechnologies: Python, Streamlit, Machine Learning, Cybersecurity, URL Analysis'
            ];
            
            // Special handling for projects with images
            if (index === 2) {
                showInteriorDesignOutput(projectTitles[index]);
                return;
            } else if (index === 3) {
                showCloudResumeOutput(projectTitles[index]);
                return;
            } else if (index === 4) {
                showPhishingDetectionOutput(projectTitles[index]);
                return;
            }
            
            // Regular output for other projects (including Phishing Detection)
            if (index === 4 || outputMessages[index]) {
            
                showProjectModal('Output', projectTitles[index], outputMessages[index]);
            }
        });
    });
});

// Function to show project modal
function showProjectModal(type, title, content) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('project-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'project-modal';
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h3 class="modal-title"></h3>
                <div class="modal-body"></div>
                <div class="modal-footer">
                    <button class="modal-btn contact-btn">Contact for More Info</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add close functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Contact button functionality
        modal.querySelector('.contact-btn').addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = `${title} - ${type}`;
    modal.querySelector('.modal-body').innerHTML = content.replace(/\n/g, '<br>');
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Special function for Cloud Resume Builder output with images
function showCloudResumeOutput(title) {
    // Create special modal for images
    let modal = document.getElementById('image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.className = 'project-modal image-modal';
        modal.innerHTML = `
            <div class="modal-content image-modal-content">
                <span class="modal-close">&times;</span>
                <h3 class="modal-title"></h3>
                <div class="modal-body image-gallery">
                    <div class="gallery-text">
                        <p>📄 <strong>Cloud-Based Resume Builder - Project Output & Results</strong></p>
                        <div class="output-features">
                            <p>✅ Cloud-based resume creation system</p>
                            <p>✅ Multiple professional resume templates</p>
                            <p>✅ Real-time editing and preview capabilities</p>
                            <p>✅ Secure cloud storage implementation</p>
                            <p>✅ Team project successfully completed</p>
                            <p>✅ User-friendly interface design</p>
                        </div>
                        <p><strong>Technologies:</strong> Cloud Computing, Web Development, HTML, CSS, JavaScript</p>
                    </div>
                    <div class="image-grid"></div>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn contact-btn">Contact for More Info</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add close functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Contact button functionality
        modal.querySelector('.contact-btn').addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = `${title} - Output`;
    
    // Create image gallery
    const imageGrid = modal.querySelector('.image-grid');
    imageGrid.innerHTML = '';
    
    const images = [
        'Resume 01.jpg', 'Resume 02.jpg', 'Resume 03.jpg', 'Resume 04.jpg',
        'Resume 05.jpg', 'Resume 06.jpg', 'Resume 07.jpg', 'Resume 08.jpg'
    ];
    
    images.forEach((imageName, index) => {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'gallery-image-container';
        
        const img = document.createElement('img');
        img.src = `project-images/${imageName}`;
        img.alt = `Cloud Resume Builder Output ${index + 1}`;
        img.className = 'gallery-image';
        img.loading = 'lazy';
        
        // Add click to enlarge functionality
        img.addEventListener('click', () => {
            enlargeImage(img.src, img.alt);
        });
        
        const caption = document.createElement('p');
        caption.className = 'image-caption';
        caption.textContent = `Resume Template ${index + 1}`;
        
        imageContainer.appendChild(img);
        imageContainer.appendChild(caption);
        imageGrid.appendChild(imageContainer);
    });
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Function to enlarge image on click
function enlargeImage(src, alt) {
    let enlargeModal = document.getElementById('enlarge-modal');
    if (!enlargeModal) {
        enlargeModal = document.createElement('div');
        enlargeModal.id = 'enlarge-modal';
        enlargeModal.className = 'enlarge-modal';
        enlargeModal.innerHTML = `
            <div class="enlarge-content">
                <span class="enlarge-close">&times;</span>
                <img class="enlarged-image" />
            </div>
        `;
        document.body.appendChild(enlargeModal);
        
        // Close functionality
        enlargeModal.querySelector('.enlarge-close').addEventListener('click', () => {
            enlargeModal.style.display = 'none';
        });
        
        enlargeModal.addEventListener('click', (e) => {
            if (e.target === enlargeModal || e.target === enlargeModal.querySelector('.enlarge-content')) {
                enlargeModal.style.display = 'none';
            }
        });
    }
    
    const enlargedImg = enlargeModal.querySelector('.enlarged-image');
    enlargedImg.src = src;
    enlargedImg.alt = alt;
    enlargeModal.style.display = 'flex';
}

// Special function for Phishing Detection output with images
function showPhishingDetectionOutput(title) {
    // Create special modal for images
    let modal = document.getElementById('phishing-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'phishing-modal';
        modal.className = 'project-modal image-modal';
        modal.innerHTML = `
            <div class="modal-content image-modal-content">
                <span class="modal-close">&times;</span>
                <h3 class="modal-title"></h3>
                <div class="modal-body image-gallery">
                    <div class="gallery-text">
                        <p>🛡️ <strong>Phishing Detection System - Project Output & Results</strong></p>
                        <div class="output-features">
                            <p>✅ Machine learning-powered phishing detection</p>
                            <p>✅ Real-time URL threat analysis system</p>
                            <p>✅ Custom feature extraction algorithms</p>
                            <p>✅ Streamlit-based interactive web interface</p>
                            <p>✅ Comprehensive testing with Simnept simulation</p>
                            <p>✅ High accuracy in phishing pattern identification</p>
                            <p>✅ Individual project developed from scratch</p>
                        </div>
                        <p><strong>Technologies:</strong> Python, Streamlit, Machine Learning, Cybersecurity, URL Analysis</p>
                    </div>
                    <div class="image-grid"></div>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn contact-btn">Contact for More Info</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add close functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Contact button functionality
        modal.querySelector('.contact-btn').addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = `${title} - Output`;
    
    // Create image gallery
    const imageGrid = modal.querySelector('.image-grid');
    imageGrid.innerHTML = '';
    
    const images = [
        'Screenshot (340).png', 'Screenshot (341).png', 'Screenshot (342).png',
        'Screenshot (343).png', 'Screenshot (344).png', 'Screenshot (345).png',
        'Screenshot (346).png', 'Screenshot (347).png', 'Screenshot (348).png'
    ];
    
    images.forEach((imageName, index) => {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'gallery-image-container';
        
        const img = document.createElement('img');
        img.src = `project-images/${imageName}`;
        img.alt = `Phishing Detection System Output ${index + 1}`;
        img.className = 'gallery-image';
        img.loading = 'lazy';
        
        // Add click to enlarge functionality
        img.addEventListener('click', () => {
            enlargeImage(img.src, img.alt);
        });
        
        const caption = document.createElement('p');
        caption.className = 'image-caption';
        caption.textContent = `Interface Screenshot ${index + 1}`;
        
        imageContainer.appendChild(img);
        imageContainer.appendChild(caption);
        imageGrid.appendChild(imageContainer);
    });
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Special function for Interior Design output with images
function showInteriorDesignOutput(title) {
    // Create special modal for images
    let modal = document.getElementById('interior-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'interior-modal';
        modal.className = 'project-modal image-modal';
        modal.innerHTML = `
            <div class="modal-content image-modal-content">
                <span class="modal-close">&times;</span>
                <h3 class="modal-title"></h3>
                <div class="modal-body image-gallery">
                    <div class="gallery-text">
                        <p>🏠 <strong>Interior Design Web Application - Project Output & Results</strong></p>
                        <div class="output-features">
                            <p>✅ Intuitive Gradio-based interactive interface</p>
                            <p>✅ Real-time design visualization platform</p>
                            <p>✅ Enhanced user experience for designers and architects</p>
                            <p>✅ AI-enhanced design suggestions and recommendations</p>
                            <p>✅ Successful team collaboration and project delivery</p>
                            <p>✅ Machine learning-powered design optimization</p>
                            <p>✅ Comprehensive design workflow integration</p>
                        </div>
                        <p><strong>Technologies:</strong> Python, Gradio, Machine Learning, UI/UX Design, Web Development</p>
                    </div>
                    <div class="image-grid"></div>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn contact-btn">Contact for More Info</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add close functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Contact button functionality
        modal.querySelector('.contact-btn').addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = `${title} - Output`;
    
    // Create image gallery
    const imageGrid = modal.querySelector('.image-grid');
    imageGrid.innerHTML = '';
    
    const images = [
        'Screenshot (105).png', 'Screenshot (106).png', 'Screenshot (107).png',
        'Screenshot (108).png', 'Screenshot (109).png', 'Screenshot (110).png',
        'Screenshot (111).png', 'Screenshot (112).png', 'Screenshot (113).png',
        'Screenshot (116).png', 'Screenshot (117).png', 'Screenshot (118).png',
        'Screenshot (119).png'
    ];
    
    images.forEach((imageName, index) => {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'gallery-image-container';
        
        const img = document.createElement('img');
        img.src = `project-images/${imageName}`;
        img.alt = `Interior Design Application Output ${index + 1}`;
        img.className = 'gallery-image';
        img.loading = 'lazy';
        
        // Add click to enlarge functionality
        img.addEventListener('click', () => {
            enlargeImage(img.src, img.alt);
        });
        
        const caption = document.createElement('p');
        caption.className = 'image-caption';
        caption.textContent = `Design Interface ${index + 1}`;
        
        imageContainer.appendChild(img);
        imageContainer.appendChild(caption);
        imageGrid.appendChild(imageContainer);
    });
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Demo video function for Cloud Resume Builder
function showCloudResumeDemo(title) {
    showVideoModal('Demo', title, [
        'Cloud Computing video 1 .mp4',
        'Cloud Computing video 2 .mp4'
    ], 'Cloud-based resume creation and editing demonstration showcasing the complete workflow from template selection to final resume generation.');
}

// Demo video function for Phishing Detection
function showPhishingDetectionDemo(title) {
    showVideoModal('Demo', title, [
        'phishing project.mp4'
    ], 'Live demonstration of the phishing detection system analyzing URLs in real-time and identifying potential threats.');
}

// Generic video modal function
function showVideoModal(type, title, videos, description) {
    let modal = document.getElementById('video-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'video-modal';
        modal.className = 'project-modal video-modal';
        modal.innerHTML = `
            <div class="modal-content video-modal-content">
                <span class="modal-close">&times;</span>
                <h3 class="modal-title"></h3>
                <div class="modal-body video-gallery">
                    <div class="video-description"></div>
                    <div class="video-container"></div>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn contact-btn">Contact for More Info</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add close functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            // Pause all videos when closing
            modal.querySelectorAll('video').forEach(video => {
                video.pause();
            });
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.querySelectorAll('video').forEach(video => {
                    video.pause();
                });
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Contact button functionality
        modal.querySelector('.contact-btn').addEventListener('click', () => {
            modal.querySelectorAll('video').forEach(video => {
                video.pause();
            });
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = `${title} - ${type}`;
    modal.querySelector('.video-description').innerHTML = `<p>${description}</p>`;
    
    // Create video player(s)
    const videoContainer = modal.querySelector('.video-container');
    videoContainer.innerHTML = '';
    
    videos.forEach((videoName, index) => {
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'video-wrapper';
        
        const video = document.createElement('video');
        video.src = `project-videos/${videoName}`;
        video.controls = true;
        video.className = 'demo-video';
        video.preload = 'metadata';
        
        if (videos.length > 1) {
            const caption = document.createElement('p');
            caption.className = 'video-caption';
            caption.textContent = `Demo Video ${index + 1}`;
            videoWrapper.appendChild(caption);
        }
        
        videoWrapper.appendChild(video);
        videoContainer.appendChild(videoWrapper);
    });
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
