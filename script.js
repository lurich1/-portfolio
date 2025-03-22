document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const moonIcon = document.getElementById('moon-icon');
  const sunIcon = document.getElementById('sun-icon');
  
  // Check for saved theme preference or use system preference
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = localStorage.getItem('theme');
  
  if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.documentElement.classList.add('dark');
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    moonIcon.classList.remove('hidden');
    sunIcon.classList.add('hidden');
  }
  
  themeToggleBtn.addEventListener('click', function() {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      moonIcon.classList.remove('hidden');
      sunIcon.classList.add('hidden');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
    }
  });
  
  // Reveal Elements on Scroll
  const revealElements = document.querySelectorAll('.reveal-element');
  
  function revealOnScroll() {
    for (let i = 0; i < revealElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add('revealed');
      }
    }
  }
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
  
  // Feature Carousel
  const carousel = document.getElementById('feature-carousel');
  const prevBtn = document.getElementById('feature-prev');
  const nextBtn = document.getElementById('feature-next');
  
  let isDragging = false;
  let startPosition = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  
  carousel.addEventListener('mousedown', dragStart);
  carousel.addEventListener('touchstart', dragStart);
  carousel.addEventListener('mouseup', dragEnd);
  carousel.addEventListener('touchend', dragEnd);
  carousel.addEventListener('mousemove', drag);
  carousel.addEventListener('touchmove', drag);
  carousel.addEventListener('mouseleave', dragEnd);
  
  function dragStart(e) {
    e.preventDefault();
    isDragging = true;
    startPosition = getPositionX(e);
    carousel.style.cursor = 'grabbing';
  }
  
  function drag(e) {
    if (isDragging) {
      const currentPosition = getPositionX(e);
      currentTranslate = prevTranslate + currentPosition - startPosition;
      carousel.style.transform = `translateX(${currentTranslate}px)`;
    }
  }
  
  function dragEnd() {
    isDragging = false;
    const threshold = 100;
    const carouselWidth = carousel.offsetWidth;
    const maxTranslate = -(carousel.scrollWidth - carouselWidth);
    
    if (currentTranslate > 0) {
      currentTranslate = 0;
    } else if (currentTranslate < maxTranslate) {
      currentTranslate = maxTranslate;
    }
    
    carousel.style.transform = `translateX(${currentTranslate}px)`;
    carousel.style.cursor = 'grab';
    prevTranslate = currentTranslate;
  }
  
  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }
  
  prevBtn.addEventListener('click', () => {
    const carouselWidth = carousel.offsetWidth;
    currentTranslate += 320; // Width of one item + gap
    
    if (currentTranslate > 0) {
      currentTranslate = 0;
    }
    
    carousel.style.transform = `translateX(${currentTranslate}px)`;
    prevTranslate = currentTranslate;
  });
  
  nextBtn.addEventListener('click', () => {
    const carouselWidth = carousel.offsetWidth;
    const maxTranslate = -(carousel.scrollWidth - carouselWidth);
    currentTranslate -= 320; // Width of one item + gap
    
    if (currentTranslate < maxTranslate) {
      currentTranslate = maxTranslate;
    }
    
    carousel.style.transform = `translateX(${currentTranslate}px)`;
    prevTranslate = currentTranslate;
  });
  
  // Portfolio Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Timeline Events
  const timelineContents = document.querySelectorAll('.timeline-content');
  
  timelineContents.forEach(content => {
    content.addEventListener('click', () => {
      content.classList.toggle('expanded');
      const details = content.querySelector('.timeline-details');
      
      if (content.classList.contains('expanded')) {
        details.style.height = details.scrollHeight + 'px';
        details.style.opacity = '1';
      } else {
        details.style.height = '0';
        details.style.opacity = '0';
      }
    });
  });
  
  // Form Validation
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const budgetInput = document.getElementById('budget');
  const messageInput = document.getElementById('message');
  const submitButton = document.getElementById('submit-button');
  
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const phoneError = document.getElementById('phone-error');
  const budgetError = document.getElementById('budget-error');
  const messageError = document.getElementById('message-error');
  
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  function showError(input, errorElement, message) {
    input.style.borderColor = '#ef4444';
    errorElement.textContent = message;
    errorElement.classList.add('visible');
  }
  
  function clearError(input, errorElement) {
    input.style.borderColor = '';
    errorElement.textContent = '';
    errorElement.classList.remove('visible');
  }
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Validate Name
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, nameError, 'Name must be at least 2 characters.');
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }
    
    // Validate Email
    if (!validateEmail(emailInput.value)) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }
    
    // Validate Phone
    if (phoneInput.value.trim().length < 10) {
      showError(phoneInput, phoneError, 'Please enter a valid phone number.');
      isValid = false;
    } else {
      clearError(phoneInput, phoneError);
    }
    
    // Validate Budget
    if (budgetInput.value.trim() === '') {
      showError(budgetInput, budgetError, 'Please enter your budget.');
      isValid = false;
    } else {
      clearError(budgetInput, budgetError);
    }
    
    // Validate Message
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, messageError, 'Message must be at least 10 characters.');
      isValid = false;
    } else {
      clearError(messageInput, messageError);
    }
    
    if (isValid) {
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Simulate form submission
      setTimeout(() => {
        alert('Thank you for your message. We\'ll get back to you soon!');
        contactForm.reset();
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
      }, 2000);
    }
  });
  
  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterEmailError = document.getElementById('newsletter-email-error');
  const newsletterSubmit = document.getElementById('newsletter-submit');
  
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateEmail(newsletterEmail.value)) {
      showError(newsletterEmail, newsletterEmailError, 'Please enter a valid email address.');
    } else {
      clearError(newsletterEmail, newsletterEmailError);
      newsletterSubmit.textContent = 'Subscribing...';
      newsletterSubmit.disabled = true;
      
      // Simulate form submission
      setTimeout(() => {
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
        newsletterSubmit.textContent = 'Subscribe';
        newsletterSubmit.disabled = false;
      }, 2000);
    }
  });
  
  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Custom Cursor
  const customCursor = document.getElementById('custom-cursor');
  
  document.addEventListener('mousemove', (e) => {
    if (window.innerWidth >= 768) {
      customCursor.style.left = e.clientX + 'px';
      customCursor.style.top = e.clientY + 'px';
    }
  });
  
  // Prevent cursor from showing on touch devices
  window.addEventListener('touchstart', () => {
    customCursor.style.display = 'none';
  });
  
  // Initialize all animations and effects
  revealOnScroll();
});