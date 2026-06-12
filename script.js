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
    formStatus.style.color = "#a5b4fc";
    formStatus.textContent = "Sending...";

    // Simulate async send
    setTimeout(() => {
      formStatus.style.color = "#22c55e";
      formStatus.textContent = "Message sent! We will get back to you soon.";
      contactForm.reset();
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

 