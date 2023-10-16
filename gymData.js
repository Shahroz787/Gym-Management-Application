const dataContainer = document.getElementById('dataContainer');
const tableBody = document.querySelector('.data-table tbody');
const editFormContainer = document.getElementById('dataContainer');
// document.getElementById('noti').style.display = "none";
let editingEntryId = null; // Store the ID of the entry being edited



// Define urlParams to extract query parameters
const urlParams = new URLSearchParams(window.location.search);

async function fetchAdmissionData() {
  fetch('http://localhost:8080/getAdmissionData')
    .then(response => response.json())
    .then(data => {
      const admissionData = data;
      let html = '';
      admissionData.forEach(entry => {
        html += `<tr class="data-row" data-entry-id="${entry._id}" onclick="showEntryDetails('${entry._id}')">
          <td>${entry.id}</td>
          <td>${entry.name}</td>
          <td>${entry.age}</td>
          <td>${entry.phone}</td>
          <td>${entry.gender}</td>
          <td>${entry.membership}</td>
          <td>
          <button class="edit-button" data-entry-id="${entry._id}" onclick="showEditForm('${entry._id}')">EDIT</a></button>
          <button class="delete-button" data-entry-id="${entry._id}" onclick="deleteEntry('${entry._id}')">Delete</button>
          <button class="print-button" data-entry-id="${entry._id}" onclick="printEntryData('${entry._id}')">Print</button>
          </td>
        </tr>`;
      });
      tableBody.innerHTML = html;


      // Attach event listeners to the edit buttons
      const editButtons = document.querySelectorAll('.edit-button');
      editButtons.forEach(button => {
        button.addEventListener('click', () => showEditForm(button.getAttribute('data-entry-id')));
      });

      // Check if an edited row needs to be highlighted
      const highlightedRowId = urlParams.get('editedId');
      if (highlightedRowId) {
        const highlightedRow = document.querySelector(`.data-row[data-entry-id="${highlightedRowId}"]`);
        highlightedRow.classList.add('highlighted');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

const printButtons = document.querySelectorAll('.print-button');
printButtons.forEach(button => {
  button.addEventListener('click', () => printEntryData(button.getAttribute('data-entry-id')));
});


function showEntryDetails(id) {
  const entry = findEntryById(id); // Implement a function to fetch entry details based on the ID
  // Use the entry data to populate a dialogue box and show it
  // You can use a modal or a custom dialogue box for this
}

async function findEntryById(id) {
  try {
    const response = await fetch(`http://localhost:8080/getAdmissionData/${id}`);
    console.log('ID parameter:', id);
    console.log('Response:', response);
    console.log('Response status:', response.status);

    if (!response.ok) {
      console.error('Response not OK:', response.statusText);
      throw new Error('Failed to fetch entry');
    }

    const entry = await response.json();
    console.log('Entry:', entry);

    return entry;
  } catch (error) {
    console.error('Error fetching entry:', error);
    return null;
  }
}




async function printEntryData(id) {
  console.log('ID parameter:', id);
  try {
    // const entry = await findEntryById(id);
    // console.log('Entry fetched:', entry);
    
    const response = await fetch(`http://localhost:8080/getAdmissionData/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch entry: ${response.statusText}`);
    }
    const entry = await response.json();



    if (entry) {
      const printWindow = window.open('', '_blank');
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Entry</title>
          </head>
          <body>
            <h2>Entry Details</h2>
            <p>ID: ${entry.id}</p>
            <p>Name: ${entry.name}</p>
            <p>Age: ${entry.age}</p>
            <p>Phone: ${entry.phone}</p>
            <p>Gender: ${entry.gender}</p>
            <p>Membership: ${entry.membership}</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Entry not found.');
    }
  } catch (error) {
    console.error('Error printing entry:', error);
  }
}




async function showEditForm(id) {
  console.log('ID parameter:', id);

  var editFormContainer = document.getElementById("editFormContainer");
  const closeButton = document.getElementById('editCloseButton');

  closeButton.addEventListener('click', function () {
    editFormContainer.style.display = 'none';
  });

  editFormContainer.style.display = "block";

  editingEntryId = id;


  // Fetch the entry by ID from the server
  try {
    const response = await fetch(`http://localhost:8080/getAdmissionData/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch entry: ${response.statusText}`);
    }
    const entry = await response.json();

    // Populate the form fields with existing data
    document.getElementById('name').value = entry.name;
    document.getElementById('age').value = entry.age;
    document.getElementById('phone').value = entry.phone;
    document.getElementById('gender').value = entry.gender;
    document.getElementById('membership').value = entry.membership;

    // Display the edit form overlay
    editFormContainer.style.display = "block";



    // Redirect to the edit page with the entry ID as a query parameter
    // window.location.href = `./gymEditData.html?id=${id}`;
  } catch (error) {
    console.error('Error fetching entry:', error);
  }
}

async function fetchAndPopulateEntry() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  // const updated = urlParams.get('updated');

  if (!id) {
    console.error('Entry ID not provided.');
    return;
  }

  editingEntryId = id;

  // Fetch the entry by ID from the server
  try {
    const response = await fetch(`http://localhost:8080/getAdmissionData/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch entry: ${response.statusText}`);
    }
    const entry = await response.json();

    // Populate form fields with existing data
    document.getElementById('name').value = entry.name;
    document.getElementById('age').value = entry.age;
    document.getElementById('phoneInput').value = entry.phone;
    document.getElementById('gender').value = entry.gender;
    console.log('Fetched entry membership:', entry.membership);
    document.getElementById('membership').value = entry.membership;
    console.log('Membership value set in the select element');


  } catch (error) {
    console.error('Error fetching entry:', error);
  }
}


async function saveEdit() {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const phone = document.getElementById('phone').value;
  const gender = document.getElementById('gender').value;
  const membership = document.getElementById('membership').value;

  console.log('Saving data:', { name, age, gender, membership }); // Log the data being saved

  if (!name || !age || !phone || !gender || !membership) {
    alert('Please fill in all fields.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/updateEntry/${editingEntryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, age, phone, gender, membership }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update entry: ${response.statusText}`);
    }

    const notiElement = document.getElementById('noti');
    notiElement.style.display = "block"; // Change display style to "block" to show the notification

    // Hide the notification after a delay
    setTimeout(() => {
      // notiElement.style.display = "none"; // Change display style back to "none" to hide the notification
      window.location.href = `./gymData.html`;
    }, 1000);
  } catch (error) {
    console.error('Error updating entry:', error);
  }
}




function findEntryById(id) {
  
  const admissionData = [
    
  ];
  return admissionData.find(entry => entry._id === id);
}



async function deleteEntry(id) {
  try {
    const response = await fetch(`http://localhost:8080/deleteEntry/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete entry: ${response.statusText}`);
    }

    // Remove the deleted entry from the webpage
    const entryRow = document.querySelector(`.data-row[data-entry-id="${id}"]`);
    window.location.reload()
    entryRow.remove();
  } catch (error) {
    console.error('Error deleting entry:', error);
  }
}




document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.navbar .nav-links a');
  const dataContainer = document.getElementById('dataContainer');
  const tableBody = document.querySelector('.data-table tbody');
  // ... Rest of your code ...
  fetchAdmissionData();

  // Get the search input element
  const searchInput = document.getElementById('searchAge');

  // Add an event listener to the search input
  searchInput.addEventListener('input', handleSearch);

  // Function to handle the search
  // function handleSearch() {
  //   const searchValue = searchInput.value.toLowerCase();
  //   const dataRows = document.querySelectorAll('.data-row');

  //   dataRows.forEach(row => {
  //     const ageCell = row.querySelector('td:nth-child(2)'); // Assuming age is in the second column
  //     const age = ageCell.textContent.trim().toLowerCase();

  //     if (age.startsWith(searchValue)) {
  //       row.style.display = 'table-row';
  //     } else {
  //       row.style.display = 'none';
  //     }
  //   });

  //   dataRows.forEach(row => {
  //     const nameCell = row.querySelector('td:nth-child(1)'); // Assuming age is in the second column
  //     const name = nameCell.textContent.trim().toLowerCase();

  //     if (name.includes(searchValue)) {
  //       row.style.display = 'table-row';
  //     } else {
  //       row.style.display = 'none';
  //     }
  //   });

  //   dataRows.forEach(row => {
  //     const genderCell = row.querySelector('td:nth-child(3)'); // Assuming age is in the second column
  //     const gender = genderCell.textContent.trim().toLowerCase();

  //     if (gender.includes(searchValue)) {
  //       row.style.display = 'table-row';
  //     } else {
  //       row.style.display = 'none';
  //     }
  //   });


  // }
  // Function to handle the search
  function handleSearch() {
    const searchValue = searchInput.value.toLowerCase();
    const dataRows = document.querySelectorAll('.data-row');

    dataRows.forEach(row => {
      const idCell = row.querySelector('td:nth-child(1)');
      const id = idCell.textContent.trim();

      const nameCell = row.querySelector('td:nth-child(2)');
      const name = nameCell.textContent.trim().toLowerCase();

      const phoneCell = row.querySelector('td:nth-child(4)');
      const phone = phoneCell.textContent.trim();

      const genderCell = row.querySelector('td:nth-child(5)');
      const gender = genderCell.textContent.trim().toLowerCase();

      const membershipCell = row.querySelector('td:nth-child(6)');
      const membership = membershipCell.textContent.trim().toLowerCase();

      const idMatches = id.toLowerCase() === `sg-${searchValue}`;
      const nameMatches = name.includes(searchValue);
      const phoneMatches = phone === searchValue;
      const genderMatches = gender.includes(searchValue);
      const membershipMatches = membership.includes(searchValue);

      // Show the row if any of the specified fields matches the search value
      if (idMatches || nameMatches || phoneMatches || genderMatches || membershipMatches) {
        row.style.display = 'table-row';
      } else {
        row.style.display = 'none';
      }
    });
  }
  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      // Remove the active class from all navigation links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      // Add the active class to the clicked link
      link.classList.add('active');
    });
  });

});







