// ========================
// PORTFOLIO MAIN SCRIPT
// ========================

document.addEventListener('DOMContentLoaded', function() {
  // ===== 1. SMOOTH SCROLL & ACTIVE NAV =====
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelectorAll('.nav-menu a');

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navMenu) navMenu.classList.remove('active');
      setActiveNav(this);
    });
  });

  // Set active navigation
  function setActiveNav(element) {
    navLinks.forEach(link => link.classList.remove('active'));
    element.classList.add('active');
  }

  // Highlight active section on scroll
  window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // ===== 2. HAMBURGER MENU =====
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // ===== 3. ABOUT BUTTON (SCROLL) =====
  const aboutBtn = document.getElementById('aboutBtn');
  if (aboutBtn) {
    aboutBtn.addEventListener('click', function() {
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ===== 4. CONTACT BUTTON (SCROLL) =====
  const contactBtn = document.getElementById('contactBtn');
  if (contactBtn) {
    contactBtn.addEventListener('click', function() {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ===== 5. CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showNotification('Silakan lengkapi semua field!', 'error');
        return;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Email tidak valid!', 'error');
        return;
      }

      // Create mailto link
      const subject = encodeURIComponent(`Pesan Baru dari ${name}`);
      const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);
      const mailtoLink = `mailto:lukman@example.com?subject=${subject}&body=${body}`;

      // Open email client
      window.location.href = mailtoLink;

      // Reset form
      contactForm.reset();
      showNotification('Terima kasih! Email Anda sudah dikirim.', 'success');
    });
  }

  // ===== 6. NOTIFICATION SYSTEM =====
  function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) existingNotif.remove();

    // Create notification element
    const notif = document.createElement('div');
    notif.className = `notification notification-${type}`;
    notif.textContent = message;
    document.body.appendChild(notif);

    // Show notification
    setTimeout(() => notif.classList.add('show'), 10);

    // Remove after 4 seconds
    setTimeout(() => {
      notif.classList.remove('show');
      setTimeout(() => notif.remove(), 300);
    }, 4000);
  }

  // ===== 7. SET CURRENT YEAR =====
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ===== 8. DARK MODE TOGGLE =====
  const themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeToggle) {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', function() {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // ===== 9. INTERSECTION OBSERVER FOR ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // observer.unobserve(entry.target); // Optional: unobserve after first visibility
      }
    });
  }, observerOptions);

  // Observe project cards for animation
  document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
  });

  // ===== 10. PROJECT CARDS LAZY LOADING =====
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const img = card.querySelector('img');
    if (img) {
      img.addEventListener('error', function() {
        this.style.display = 'none';
      });
    }
  });

  // ===== 11. SMOOTH PAGE LOAD ANIMATION =====
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);

  // ===== 12. CONSOLE WELCOME MESSAGE =====
  console.log('%c🎉 Selamat datang di portofolio Muhammad Lukman Toro!', 'color: #0066ff; font-size: 16px; font-weight: bold;');
  console.log('%cBuat pertanyaan atau kolaborasi? Email: lukman@example.com', 'color: #666; font-size: 14px;');
});

// ===== NOTIFICATION STYLES (added via JavaScript) =====
const style = document.createElement('style');
style.textContent = `
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 20px;
    border-radius: 8px;
    font-weight: 500;
    z-index: 1000;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.3s ease;
  }

  .notification.show {
    opacity: 1;
    transform: translateY(0);
  }

  .notification-success {
    background: #10b981;
    color: white;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  .notification-error {
    background: #ef4444;
    color: white;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }

  .notification-info {
    background: #3b82f6;
    color: white;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  @media (max-width: 480px) {
    .notification {
      right: 10px;
      left: 10px;
      top: unset;
      bottom: 20px;
    }
  }
`;
document.head.appendChild(style);
