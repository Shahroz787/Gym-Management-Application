document.addEventListener('DOMContentLoaded', function () {
    const openContactLink = document.getElementById('openContactLink');
    const contactPopup = document.getElementById('contactPopup');
    const contactForm = document.getElementById('contactForm');
    const submitContactButton = document.getElementById('submitContact');
    const navLinks = document.querySelectorAll('.navbar .nav-links a');

    // Open the contact form popup when the link is clicked
    opencontactLink.addEventListener('click', function (event) {
        event.preventDefault();
        contactPopup.classList.add('active');
    });

    const closeContactButton = document.getElementById('contactCloseButton');


    closeContactButton.addEventListener('click', function () {
        contactPopup.classList.remove('active'); 
        navLinks[1].classList.remove('active');
        navLinks[0].classList.add('active');
    });

    // Handle form submission
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('emailInput').value;
        const message = document.getElementById('messageInput').value;

        // Here you can add code to send the form data to a server using AJAX or Fetch API
        // For example:
        const formData = { name, email, message };
        fetch('your_server_endpoint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show a success message
                    alert('Your message has been sent successfully!');
                } else {
                    // Show an error message
                    alert('There was an error sending your message. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // For this example, let's show a simple alert
        alert('Your message has been sent successfully!');

        // Clear the form fields
        contactForm.reset();

        // Close the contact form popup
        contactPopup.classList.remove('active');
    });

    // ... Other code ...
});
