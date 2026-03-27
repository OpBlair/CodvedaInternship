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

    // Quotes 
    const quotes = [
        { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
        { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
        { text: "In order to be irreplaceable, one must always be different.", author: "Coco Chanel" },
        { text: "Java is to JavaScript what car is to carpet.", author: "Chris Heilmann" },
        { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
        { text: "Before software can be reusable, it first has to be usable.", author: "Ralph Johnson" },
        { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
        { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
        { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
        { text: "You'll never find time for anything. If you want time you must make it.", author: "Charles Buxton"},
        { text: "What a privilege it is to be tired from the work you once prayed for. What a privilege it is to feel overwhelmed by growth you used to dream about. What a privilege it is to be challenged by a life you created on purpose. What a privilege it is to outgrow the things you once settled for.", author: "unknown"}
    ];

    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');

    if(quoteText && quoteAuthor){
        let i = 0;

        function showQuote(){
            quoteText.style.opacity = 0;
            quoteAuthor.style.opacity = 0;

            setTimeout(() => {
                let currentQuote = quotes[i];
                i = (i + 1) % quotes.length;

                quoteText.textContent = currentQuote.text;
                quoteAuthor.textContent = `~ ${currentQuote.author}`;

                // Fade In
                setTimeout(() => {
                    quoteText.style.opacity = 1;
                    quoteAuthor.style.opacity = 1;
                    
                    setTimeout(showQuote, 5000);
                }, 400);
            }, 800);
        }

        showQuote();
    }
});
