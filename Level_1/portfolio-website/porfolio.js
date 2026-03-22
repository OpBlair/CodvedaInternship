"use strict";

document.addEventListener('DOMContentLoaded', () => {

    // AUTOMATIC NAVIGATION HIGHLIGHTING 
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        if(currentPath === linkPath) {
            link.classList.add('active');
        } else if((currentPath === "" || currentPath === "index.html") && linkPath === "index.html"){
            link.classList.add('active');
        }
    });

    // CONTACT FORM 
    const contactForm = document.querySelector('form');
    const feedback = document.getElementById('formFeedback');

    if(contactForm && feedback){
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";

            feedback.textContent = "Processing your request...";
            feedback.style.color = "var(--primary-blue)";
            feedback.style.marginTop = "10px";
            feedback.style.fontSize = "0.9rem";

            setTimeout(() => {
                feedback.textContent = "Message sent! I'll get Back to you soon.";
                feedback.style.color = "#4cd964";

                submitBtn.disabled = false;
                submitBtn.textContent = originalText;

                contactForm.reset();

                setTimeout(() => {
                    feedback.textContent = "";
                }, 5000);
            }, 1500);
        });
    }

});
