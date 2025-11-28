/* Basic interactions:
   - mobile nav toggle
   - smooth scroll for nav links
   - rotating testimonials
   - Web3Forms AJAX submit (stay on page + show success)
   - modal for TOS and Privacy Policy
*/

// --- Modal functions ---
function openModal(content) {
  const modal = document.getElementById("tosModal");
  const modalBody = document.getElementById("tosModalContent");
  modalBody.innerHTML = content;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // disable background scroll
}

function closeModal() {
  const modal = document.getElementById("tosModal");
  modal.style.display = "none";
  document.body.style.overflow = ""; // restore background scroll
}

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  navToggle && navToggle.addEventListener("click", () => {
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // Testimonials rotation
  (function rotateTestimonials() {
    const blocks = document.querySelectorAll(".testimonial");
    const clientLabel = document.getElementById("testimonial-client");
    if (!blocks.length || !clientLabel) return;
    let idx = 0;
    const update = () => {
      blocks.forEach((b, i) => b.classList.toggle("active", i === idx));
      clientLabel.textContent = blocks[idx].getAttribute("data-client") || "";
      idx = (idx + 1) % blocks.length;
    };
    update();
    setInterval(update, 4500);
  })();

  // Contact form
  const form = document.getElementById("contactForm");
  const successBox = document.getElementById("formSuccess");
  const errorBox = document.getElementById("formError");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      successBox.hidden = true; errorBox.hidden = true;
      const url = "https://api.web3forms.com/submit";
      const formData = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true; submitBtn.textContent = "Sending...";
      fetch(url, { method: "POST", body: formData })
        .then(async res => {
          submitBtn.disabled = false; submitBtn.textContent = "Send Message";
          if (res.ok) { successBox.hidden = false; form.reset(); setTimeout(() => { successBox.hidden = true; }, 6000); }
          else { errorBox.hidden = false; console.error(await res.text()); }
        })
        .catch(err => { errorBox.hidden = false; submitBtn.disabled = false; submitBtn.textContent = "Send Message"; console.error(err); });
    });
  }

  // Footer year
  const y = new Date().getFullYear();
  document.getElementById("year") && (document.getElementById("year").textContent = y);

  // TOS / Privacy links
  const tosLink = document.getElementById("tosLink");
  const privacyLink = document.getElementById("privacyLink");
  const modalClose = document.querySelector(".modal-close");

  // Click handlers
  tosLink && tosLink.addEventListener("click", e => { e.preventDefault(); openModal(tosContent); });
  privacyLink && privacyLink.addEventListener("click", e => { e.preventDefault(); openModal(privacyContent); });
  modalClose && modalClose.addEventListener("click", closeModal);
  window.addEventListener("click", e => { if (e.target.id === "tosModal") closeModal(); });
});

// --- TOS & Privacy content ---
const tosContent = `...your full TOS HTML here...`;
const privacyContent = `...your full Privacy Policy HTML here...`;
