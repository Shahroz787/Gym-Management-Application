document.addEventListener('DOMContentLoaded', function () {
  const formsection = document.getElementById('formsection');
  const openFormLink = document.getElementById('openFormLink');
  const outputSection = document.getElementById('outputSection');
  const printButton = document.getElementById('printButton');
  const notiMessage = document.getElementById('notii');
  const gymForm = document.getElementById('gymForm');
  const closeButton = document.getElementById('form-closeButton');
  const navLinks = document.querySelectorAll('.navbar .nav-links a');

  // Open the form popup when the link is clicked
  openFormLink.addEventListener('click', function (event) {
    event.preventDefault();
    formsection.classList.add('active');

  });

  const phoneInput = document.getElementById('phoneInput');
  const phoneError = document.getElementById('phoneError');

  // Validation function for phone number
  function validatePhoneNumber(phoneNumber) {
    return phoneNumber.length === 11 && /^\d+$/.test(phoneNumber);
  }


  gymForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const customer = document.getElementById('nameInput').value;
    const age = document.getElementById('ageInput').value;
    // const birthYear = document.getElementById('ageInput').value;
    const phone = document.getElementById('phoneInput').value;
    const gender = document.getElementById('genderInput').value;
    const membership = document.getElementById('membershipInput').value;

    // Validate phone number
    if (!validatePhoneNumber(phone)) {
      phoneInput.classList.add('error-border');
      phoneError.style.display = 'block';
      return; // Don't proceed with submission if validation fails
    } else {
      phoneInput.classList.remove('error-border');
      phoneError.style.display = 'none';
    }


    // Generate a unique ID
    const uniqueId = generateUniqueId();

    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - age;



    notiMessage.style.display = "block";

    setTimeout(() => {
      notiMessage.style.display = "none";
    }, 2000);

    console.log(customer, age, phone, gender, membership);




    fetch("http://localhost:8080/saveForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: generateUniqueId(),
        name: customer,
        birthYear: birthYear,
        phone,
        gender,
        membership,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

      })
      .catch((error) => {
        console.error("Error:", error);
      });
    gymForm.reset();
  });

  function generateUniqueId() {
    const randomNumber = Math.floor(Math.random() * 1000) + 1; // Generate a random number
    return `${randomNumber}`;
  }

  closeButton.addEventListener('click', function () {
    formsection.classList.remove('active');
    navLinks[2].classList.remove('active');
    navLinks[0].classList.add('active');
    location.reload();
  });
});


