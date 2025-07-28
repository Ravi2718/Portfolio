document.addEventListener('DOMContentLoaded', () => {
  // Typed Text Effect
  new Typed(".text", {
    strings: ["Cybersecurity Researcher", "Ethical Hacker", "Software Developer"],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 1200,
    loop: true,
    showCursor: false
  });

  // Mobile Menu Toggle
  const menuToggle = document.createElement('div');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '<i class="bx bx-menu"></i>';
  document.querySelector('.header').appendChild(menuToggle);

  const navbar = document.querySelector('.navbar');
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuToggle.innerHTML = navbar.classList.contains('active')
      ? '<i class="bx bx-x"></i>'
      : '<i class="bx bx-menu"></i>';
  });

  // Close Menu on Link Click
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      menuToggle.innerHTML = '<i class="bx bx-menu"></i>';
    });
  });

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('active', window.scrollY > 300);
  });
  backToTop?.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // AJAX Contact Form Submission
  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.createElement("div");
  formFeedback.id = "form-feedback";
  formFeedback.style.marginTop = "15px";
  formFeedback.style.fontWeight = "bold";
  formFeedback.style.display = "none";
  contactForm?.appendChild(formFeedback);

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);

      fetch("https://formsubmit.co/ajax/ravigeetha915@gmail.com", {
        method: "POST",
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(response => {
        if (response.ok) {
          contactForm.reset();
          formFeedback.style.color = "lime";
          formFeedback.textContent = "✅ Message sent successfully! We will get back to you soon.";
          formFeedback.style.display = "block";

          setTimeout(() => {
            formFeedback.style.display = "none";
          }, 4000);
        } else {
          formFeedback.style.color = "red";
          formFeedback.textContent = "❌ Failed to send. Please try again.";
          formFeedback.style.display = "block";
        }
      })
      .catch(error => {
        formFeedback.style.color = "red";
        formFeedback.textContent = "❌ Something went wrong.";
        formFeedback.style.display = "block";
      });
    });
  }

  // Horizontal Scroll for Projects
  const servContainer = document.querySelector('.serv-container');
  if (servContainer) {
    servContainer.addEventListener('wheel', function (e) {
      if (e.deltaY !== 0) {
        e.preventDefault();
        servContainer.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }
});
