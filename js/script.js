/* Basic interactions:
   - mobile nav toggle
   - smooth scroll for nav links
   - rotating testimonials
   - Web3Forms AJAX submit (stay on page + show success)
   - modal for TOS and Privacy Policy
*/

document.addEventListener("DOMContentLoaded", function () {

  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  navToggle && navToggle.addEventListener("click", () => {
    if (nav.style.display === "flex") nav.style.display = "none";
    else nav.style.display = "flex";
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Rotating testimonials
  (function rotateTestimonials() {
    const blocks = document.querySelectorAll(".testimonial");
    const clientLabel = document.getElementById("testimonial-client");
    if (!blocks.length || !clientLabel) return;
    let idx = 0;
    const update = () => {
      blocks.forEach((b, i) => b.classList.toggle("active", i === idx));
      const active = blocks[idx];
      clientLabel.textContent = active.getAttribute("data-client") || "";
      idx = (idx + 1) % blocks.length;
    };
    update();
    setInterval(update, 4500); // change every 4.5 seconds
  })();

  // Contact form (Web3Forms) using fetch
  const form = document.getElementById("contactForm");
  const successBox = document.getElementById("formSuccess");
  const errorBox = document.getElementById("formError");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      successBox.hidden = true;
      errorBox.hidden = true;

      const url = "https://api.web3forms.com/submit";
      const formData = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      fetch(url, {
        method: "POST",
        body: formData
      })
      .then(async (res) => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";

        if (res.ok) {
          successBox.hidden = false;
          errorBox.hidden = true;
          form.reset();
          setTimeout(() => { successBox.hidden = true; }, 6000);
        } else {
          let data;
          try { data = await res.json(); } catch (_) { data = await res.text(); }
          console.error("Web3Forms error:", data);
          successBox.hidden = true;
          errorBox.hidden = false;
        }
      }).catch((err) => {
        console.error("Fetch error:", err);
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
        successBox.hidden = true;
        errorBox.hidden = false;
      });
    });
  }

  // Footer year
  const y = new Date().getFullYear();
  document.getElementById("year") && (document.getElementById("year").textContent = y);

  // Modal for TOS & Privacy Policy
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");
  const closeModal = document.querySelector(".modal-close");
  const tosLink = document.getElementById("tos-link");
  const privacyLink = document.getElementById("privacy-link");

  const tosContent = `
<h2>Terms of Service</h2>
<p>Effective Date: 07/07/2025</p>
<p>These Terms of Service ("Terms") govern your use of the Pages Of Purpose LLC website (the "Site") and any services provided by us ("Services"). By accessing or using our Site, you agree to these Terms. If you do not agree, you should not use our Site.</p>

<h3>1. General Information</h3>
<p>Pages Of Purpose LLC offers real estate investment services including property evaluations, property acquisitions, and consulting for real estate investors. These Terms apply to anyone who accesses or uses the Site or Services.</p>

<h3>2. Use of the Site</h3>
<p>You agree to use the Site in accordance with all applicable laws and regulations. You may not:</p>
<ul>
<li>Use the Site for any illegal or unauthorized purposes.</li>
<li>Interfere with or disrupt the functionality of the Site.</li>
<li>Post or transmit any harmful, unlawful, or infringing content.</li>
</ul>

<h3>3. Account Registration</h3>
<p>To access certain features of the Site, you may be required to create an account. You agree to provide accurate and complete information during registration and to keep your account credentials confidential. You are responsible for all activities that occur under your account.</p>

<h3>4. Real Estate Investment Services</h3>
<p>We offer various real estate services, including investment analysis, consultations, and project evaluations. These services are provided “as is,” and while we strive to offer high-quality, reliable information, we do not guarantee the success or profitability of any investment.</p>

<h3>5. Payment and Fees</h3>
<p>If applicable, you agree to pay any fees associated with the Services provided. All payments are processed securely, and we reserve the right to modify or change our pricing at any time.</p>

<h3>6. Limitation of Liability</h3>
<p>To the maximum extent permitted by law, Pages Of Purpose LLC shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use or inability to use the Site or Services, even if we have been advised of the possibility of such damages.</p>

<h3>7. Intellectual Property</h3>
<p>All content on the Site, including text, graphics, logos, images, and software, is owned by Pages Of Purpose LLC or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, or distribute any content from the Site without our express permission.</p>

<h3>8. Termination</h3>
<p>We reserve the right to suspend or terminate your access to the Site or Services at our discretion, with or without notice, if you violate these Terms.</p>

<h3>9. Governing Law</h3>
<p>These Terms will be governed by and construed in accordance with the laws of the state where Pages Of Purpose LLC is based, without regard to its conflict of law principles.</p>

<h3>10. Changes to Terms</h3>
<p>We may update these Terms from time to time. Any changes will be posted on this page, and the updated Terms will become effective as of the date posted.</p>
`;

const privacyContent = `
<h2>Privacy Policy</h2>
<p>At Pages Of Purpose LLC, we respect and are committed to protecting your privacy. This Privacy Policy outlines the types of information we collect and how we use, protect, and share it.</p>

<h3>1. Information We Collect</h3>
<p>We may collect the following types of personal information when you visit our website, register for services, or communicate with us:</p>
<ul>
<li>Personal Information: Name, email address, phone number, mailing address.</li>
<li>Transaction Information: Details about your inquiries, real estate interests, and services you’ve requested.</li>
<li>Usage Data: Information about how you use our website, such as IP addresses, device types, and browser information.</li>
<li>Cookies and Tracking Technologies: We use cookies to improve site functionality and your browsing experience.</li>
</ul>

<h3>2. How We Use Your Information</h3>
<p>We use the information we collect for the following purposes:</p>
<ul>
<li>To provide and improve our real estate services.</li>
<li>To communicate with you regarding your inquiries, investments, or account.</li>
<li>To personalize your user experience.</li>
<li>To send marketing and promotional content (if you’ve opted in).</li>
<li>To comply with legal obligations.</li>
</ul>

<h3>3. How We Protect Your Information</h3>
<p>We use administrative, technical, and physical security measures to protect your personal information from unauthorized access, use, or disclosure. However, no data transmission over the Internet can be guaranteed to be 100% secure.</p>

<h3>4. Sharing Your Information</h3>
<p>We may share your personal information with third parties under the following circumstances:</p>
<ul>
<li>With trusted service providers who help us manage and operate the website.</li>
<li>If required by law, such as to comply with a subpoena or legal process.</li>
<li>With your consent, for example, if you agree to receive marketing from a third party.</li>
</ul>

<h3>5. Your Rights</h3>
<p>Depending on your location, you may have the right to:</p>
<ul>
<li>Request access to your personal data.</li>
<li>Correct, update, or delete your personal data.</li>
<li>Opt-out of marketing communications.</li>
<li>Withdraw consent at any time where we are relying on consent to process your personal data.</li>
</ul>

<h3>6. Third-Party Links</h3>
<p>Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of these external sites.</p>

<h3>7. Changes to This Privacy Policy</h3>
<p>We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated effective date.</p>
`;

  tosLink.addEventListener("click", (e) => {
    e.preventDefault();
    modalText.innerHTML = tosContent;
    modal.style.display = "flex";
  });

  privacyLink.addEventListener("click", (e) => {
    e.preventDefault();
    modalText.innerHTML = privacyContent;
    modal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => { modal.style.display = "none"; });
  window.addEventListener("click", (e) => { if(e.target === modal) modal.style.display = "none"; });

});
