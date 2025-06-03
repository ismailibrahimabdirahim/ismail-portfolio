document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Intersection Observer for skill bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skills').forEach(skill => {
        observer.observe(skill);
    });
    
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    const errorModal = document.getElementById('errorModal');
    const successModal = document.getElementById('successModal');
    const modalMessage = document.getElementById('modal-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error states
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.style.borderColor = '#ddd';
        });
        
        // Validate form
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        let errorFields = [];
        
        if (!name) {
            document.getElementById('name-error').textContent = 'Name is required';
            document.getElementById('name').style.borderColor = 'var(--accent-color)';
            isValid = false;
            errorFields.push('Name');
        }
        
        if (!email) {
            document.getElementById('email-error').textContent = 'Email is required';
            document.getElementById('email').style.borderColor = 'var(--accent-color)';
            isValid = false;
            errorFields.push('Email');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email';
            document.getElementById('email').style.borderColor = 'var(--accent-color)';
            isValid = false;
            errorFields.push('Email');
        }
        
        if (!subject) {
            document.getElementById('subject-error').textContent = 'Subject is required';
            document.getElementById('subject').style.borderColor = 'var(--accent-color)';
            isValid = false;
            errorFields.push('Subject');
        }
        
        if (!message) {
            document.getElementById('message-error').textContent = 'Message is required';
            document.getElementById('message').style.borderColor = 'var(--accent-color)';
            isValid = false;
            errorFields.push('Message');
        }
        
        if (!isValid) {
            modalMessage.textContent = `Please fill in the following fields: ${errorFields.join(', ')}`;
            showModal(errorModal);
            
            // Scroll to first error field
            const firstErrorField = document.querySelector('.error-message:not(:empty)');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            return;
        }
        
        // If form is valid, submit via AJAX
        const formData = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                showModal(successModal);
                contactForm.reset();
            } else {
                modalMessage.textContent = 'There was an error submitting your message. Please try again later.';
                showModal(errorModal);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            modalMessage.textContent = 'There was an error submitting your message. Please try again later.';
            showModal(errorModal);
        });
    });
    
    // Modal functions
    function showModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function hideModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Close modals
    document.querySelectorAll('.close-modal, .modal-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            hideModal(modal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target);
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

function submitToWhatsApp() {
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
  
    // Validate form
    let isValid = true;
    
    if (!name) {
      document.getElementById('name-error').textContent = 'Name is required';
      isValid = false;
    } else {
      document.getElementById('name-error').textContent = '';
    }
  
    if (!email) {
      document.getElementById('email-error').textContent = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('email-error').textContent = 'Invalid email format';
      isValid = false;
    } else {
      document.getElementById('email-error').textContent = '';
    }
  
    if (!subject) {
      document.getElementById('subject-error').textContent = 'Subject is required';
      isValid = false;
    } else {
      document.getElementById('subject-error').textContent = '';
    }
  
    if (!message) {
      document.getElementById('message-error').textContent = 'Message is required';
      isValid = false;
    } else {
      document.getElementById('message-error').textContent = '';
    }
  
    // If valid, send to WhatsApp
    if (isValid) {
      const whatsappText = 
        `*New Message From Portfolio*%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Email:* ${encodeURIComponent(email)}%0A` +
        `*Subject:* ${encodeURIComponent(subject)}%0A` +
        `*Message:* ${encodeURIComponent(message)}`;
      
      window.open(`https://wa.me/252619846667?text=${whatsappText}`, '_blank');
      
      // Optional: Clear form after submission
      document.getElementById('contactForm').reset();
      
      // Optional: Show success message
      alert("Thank you! You'll be redirected to WhatsApp to send your message.");
    }
  }