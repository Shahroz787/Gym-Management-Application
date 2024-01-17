// if ("serviceWorker" in navigator) {
//     window.addEventListener("load", function () {
//         navigator.serviceWorker
//             .register("/serviceWorker.js")
//             .then(res => {
//                 console.log("service worker registered")
//                 Notification.requestPermission().then(res => {
//                     if (Notification.permission == 'granted') {
//                         console.log("Granted permission")
//                         return
//                     }
//                     console.log(res)
//                 })
//             })
//             .catch(err => console.log("service worker not registered", err))
//     })
// }


document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get user input
    var adminID = document.getElementById("adminID").value;
    var password = document.getElementById("password").value;
    
    // You can add more complex validation here if needed
    
    // Send login data to the backend
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ adminID: adminID, password: password })
        });

        const data = await response.json();

        if (data.success) {
            // Show a success notification
            var notificationContainer = document.getElementById("notificationContainer");
            var successMessage = document.createElement("div");
            successMessage.className = "success-message";
            successMessage.innerText = "Welcome to SHEROO GYM!";
            notificationContainer.appendChild(successMessage);

            // Redirect to the gymData page after 2 seconds
            setTimeout(function() {
                window.location.href = "gymData.html";
            }, 2000);
        } else {
            // Show an error message below the password field
            var errorMessage = document.createElement("div");
            errorMessage.className = "error-message";
            errorMessage.innerText = "your id and password is incorrect";
            document.getElementById("password").insertAdjacentElement("afterend", errorMessage);

            // Remove the error message after 2 seconds
            setTimeout(function() {
                errorMessage.remove();
            }, 2000);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});
