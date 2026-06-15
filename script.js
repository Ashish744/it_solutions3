// Mobile nav toggle
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close menu when clicking a link (mobile UX)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// Password visibility toggle functionality
function initPasswordToggle(toggleBtnId, inputId) {
  const toggleBtn = document.getElementById(toggleBtnId);
  const input = document.getElementById(inputId);
  
  if (toggleBtn && input) {
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleBtn.classList.toggle("active");
      
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    });
  }
}

// Initialize password toggles
initPasswordToggle("togglePassword", "password");
initPasswordToggle("toggleSignupPassword", "signup-password");
initPasswordToggle("toggleSignupConfirm", "signup-confirm");

// Simple testimonials auto slider (home page)
const testimonials = document.querySelectorAll(".testimonial");
let testimonialIndex = 0;

if (testimonials.length > 0) {
  setInterval(() => {
    testimonials[testimonialIndex].classList.remove("active");
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    testimonials[testimonialIndex].classList.add("active");
  }, 5000);
}

// Basic contact form handler (front-end demo only)
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get email input
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validate email format
    if (!emailRegex.test(email)) {
      formStatus.style.color = "#ef4444";
      formStatus.textContent = "Please enter a valid email address.";
      emailInput.style.borderColor = "#ef4444";
      emailInput.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)";
      setTimeout(() => {
        emailInput.style.borderColor = "";
        emailInput.style.boxShadow = "";
      }, 3000);
      return;
    }
    
    formStatus.style.color = "#a5b4fc";
    formStatus.textContent = "Sending...";

    // Simulate async send
    setTimeout(() => {
      formStatus.style.color = "#22c55e";
      formStatus.textContent = "Message sent! We will get back to you soon.";
      contactForm.reset();
      emailInput.style.borderColor = "";
    }, 1200);
  });
}

// Advanced Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // For sections, apply animation style
      if (entry.target.classList.contains("section")) {
        entry.target.style.animation = "fadeUp 0.8s ease-out forwards";
      }
      // For scroll-animate elements, trigger animation by setting opacity
      if (entry.target.classList.contains("scroll-animate")) {
        entry.target.style.opacity = "1";
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0";
  observer.observe(section);
});

// Observe scroll-animate elements for staggered animations
document.querySelectorAll(".scroll-animate").forEach((element) => {
  observer.observe(element);
});

// Add hover effects to cards dynamically
document.querySelectorAll(".card, .project-card, .price-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-6px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Parallax effect for hero section
const heroSection = document.querySelector(".hero");
if (heroSection) {
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition < 600) {
      heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      heroSection.style.opacity = 1 - scrollPosition / 800;
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  });
});

// Social icons interaction
document.querySelectorAll(".social-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.15)";
  });

  icon.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add scroll-triggered animations to tech items
const techItems = document.querySelectorAll(".tech-item");
const techObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.animation = `popIn 0.6s ease-out forwards`;
      }, index * 80);
    }
  });
}, { threshold: 0.3 });

techItems.forEach((item) => {
  techObserver.observe(item);
});

// Login form handler
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;
    
    // Validate inputs
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    
    // Store credentials in localStorage if remember me is checked
    if (rememberMe) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("rememberMe");
    }
    
    // Simulate login (frontend demo)
    const submitBtn = loginForm.querySelector(".btn-login");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Signing in...";
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert(`Welcome back, ${email}! (This is a demo - no actual login occurred)`);
      loginForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
  
  // Load saved email if remember me was checked
  if (localStorage.getItem("rememberMe")) {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      document.getElementById("email").value = savedEmail;
      document.getElementById("rememberMe").checked = true;
    }
  }
}

// Social login buttons handler
document.querySelectorAll(".social-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const provider = btn.textContent.trim();
    alert(`Redirecting to ${provider} login... (Demo only)`);
  });
});

// Signup Modal Handler
const signupModal = document.getElementById("signupModal");
const openSignupBtn = document.getElementById("openSignupBtn");
const closeSignupBtn = document.getElementById("closeSignupBtn");
const backToLoginBtn = document.getElementById("backToLoginBtn");
const modalOverlay = document.querySelector(".modal-overlay");
const signupForm = document.getElementById("signupForm");

if (openSignupBtn) {
  openSignupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signupModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
}

if (closeSignupBtn) {
  closeSignupBtn.addEventListener("click", () => {
    signupModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

if (backToLoginBtn) {
  backToLoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signupModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", () => {
    signupModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && signupModal && signupModal.classList.contains("active")) {
    signupModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Signup form handler
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const company = document.getElementById("signup-company").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirm = document.getElementById("signup-confirm").value;
    const agreeTerms = document.getElementById("agreeTerms").checked;
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validate inputs
    if (!name || !email || !company || !password || !confirm) {
      alert("Please fill in all fields");
      return;
    }
    
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    
    if (!agreeTerms) {
      alert("You must agree to the Terms of Service and Privacy Policy");
      return;
    }
    
    // Simulate account creation
    const submitBtn = signupForm.querySelector(".signup-btn");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Creating account...";
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert(`Welcome to IT Solutions, ${name}! Your account has been created successfully.`);
      signupForm.reset();
      signupModal.classList.remove("active");
      document.body.style.overflow = "auto";
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}
 