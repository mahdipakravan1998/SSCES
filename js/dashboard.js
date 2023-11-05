// JavaScript for search, sort, and pagination
const table = document.getElementById("dataTable");
const searchInput = document.getElementById("searchInput");
const pagination = document.getElementById("pagination");
let currentPage = 1;
const itemsPerPage = 5; // Change the desired number of items per page
let currentSortColumn = null;
let sortAscending = true;
let originalData = null; // Store the original API data
let data = null; // Store the API data
let accessToken = getAccessToken(); // Function to get the access token

function getAccessToken() {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "access_token") {
      return value;
    }
  }
  return null;
}

// Function to update the table based on the current page
function updateTable() {
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = ""; // Clear existing table rows
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const rows = data.results.slice(startIndex, endIndex);

  rows.forEach((event) => {
    const row = document.createElement("tr");
    const paymentStatus = event.is_paid ? "پرداخت شده" : "پرداخت نشده";
    const persianDate = persianDateConverter(event.event.date);
    const isPaidClass = event.is_paid ? 'class="paid"' : "";

    row.innerHTML = `
        <td data-label="عنوان رویداد">${event.event.title}</td>
        <td data-label="تاریخ برگزاری">${persianDate}</td>
        <td data-label="وضعیت پرداخت" ${isPaidClass}>${paymentStatus}</td>
    `;
    tbody.appendChild(row);
  });

  handlePagination();
}

// Function to handle pagination
function handlePagination() {
  const rows = data.results;
  const totalPages = Math.ceil(rows.length / itemsPerPage);
  pagination.innerHTML = "";

  // Create the "Next" button
  const nextPageLink = document.createElement("a");
  nextPageLink.classList.add("next", "page-numbers");
  if (currentPage === totalPages) {
    nextPageLink.href = "javascript:void(0);"; // Disable link if on the last page
  } else {
    nextPageLink.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        updateTable();
        handlePagination();
      }
    });
  }
  pagination.appendChild(nextPageLink);

  // Page Number Links
  for (let i = totalPages; i >= 1; i--) {
    let pageLink;

    if (i === currentPage) {
      pageLink = document.createElement("span");
      pageLink.classList.add("page-numbers", "current");
      pageLink.textContent = i;
      pageLink.setAttribute("aria-current", "page");
    } else {
      pageLink = document.createElement("a");
      pageLink.classList.add("page-numbers");
      pageLink.textContent = i;

      pageLink.addEventListener("click", () => {
        currentPage = i;
        updateTable();
        handlePagination();
      });
    }

    pagination.appendChild(pageLink);
  }

  // Create the "Previous" button
  const prevPageLink = document.createElement("a");
  prevPageLink.classList.add("prev", "page-numbers");
  if (currentPage === 1) {
    prevPageLink.href = "javascript:void(0);"; // Disable link if on the first page
  } else {
    prevPageLink.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        updateTable();
        handlePagination();
      }
    });
  }
  pagination.appendChild(prevPageLink);
}

// Function to handle sorting
function handleSort(columnIndex) {
  if (currentSortColumn === columnIndex) {
    sortAscending = !sortAscending;
  } else {
    currentSortColumn = columnIndex;
    sortAscending = true;
  }

  data.results.sort((a, b) => {
    let aValue, bValue;

    if (columnIndex === 0) {
      // Column 0 (عنوان رویداد)
      aValue = a.event.title;
      bValue = b.event.title;
    } else if (columnIndex === 1) {
      // Column 1 (تاریخ برگزاری)
      aValue = a.event.date;
      bValue = b.event.date;
    } else if (columnIndex === 2) {
      // Column 2 (وضعیت پرداخت)
      aValue = a.is_paid ? "پرداخت شده" : "پرداخت نشده";
      bValue = b.is_paid ? "پرداخت شده" : "پرداخت نشده";
    }

    const compareResult = sortAscending
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);

    // For the "تاریخ برگزاری" column, convert to Gregorian date and compare
    if (columnIndex === 1) {
      const aDate = new Date(aValue);
      const bDate = new Date(bValue);
      return sortAscending ? aDate - bDate : bDate - aDate;
    }

    return compareResult;
  });

  updateTable();
}

// Function to handle search input
function handleSearch() {
  const searchValue = searchInput.value.toLowerCase();
  const rows = table.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    const course = row.querySelectorAll("td")[0].textContent.toLowerCase(); // Search in the "عنوان رویداد" column

    if (course.includes(searchValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

  // After filtering, reset to page 1
  currentPage = 1;
  handlePagination();
}

// Event listener for search input
searchInput.addEventListener("input", handleSearch);

// Event listener for sorting
table.querySelectorAll("th").forEach((th, columnIndex) => {
  th.addEventListener("click", () => {
    handleSort(columnIndex);
  });
});

// JavaScript for search, sort, and pagination in the collaborations table
const tableCollaborations = document.getElementById("dataTableCollaborations");
const searchInputCollaborations = document.getElementById(
  "searchInputCollaborations"
);
let currentPageCollaborations = 1;
const itemsPerPageCollaborations = 5; // Change the desired number of items per page
let currentSortColumnCollaborations = null;
let sortAscendingCollaborations = true;

// Function to update the table based on the current page in the collaborations table
function updateTableCollaborations() {
  const rows = Array.from(tableCollaborations.querySelectorAll("tbody tr"));
  const startIndex =
    (currentPageCollaborations - 1) * itemsPerPageCollaborations;
  const endIndex = startIndex + itemsPerPageCollaborations;

  rows.forEach((row, index) => {
    if (index >= startIndex && index < endIndex) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Function to handle pagination in the collaborations table
function handlePaginationCollaborations() {
  const rows = tableCollaborations.querySelectorAll("tbody tr");
  const totalPages = Math.ceil(rows.length / itemsPerPageCollaborations);
  const pagination = document.getElementById("paginationCollaborations");
  pagination.innerHTML = "";

  // Create the "Next" button
  const nextPageLink = document.createElement("a");
  nextPageLink.classList.add("next", "page-numbers");
  if (currentPageCollaborations === totalPages) {
    nextPageLink.href = "javascript:void(0);"; // Disable link if on the last page
  } else {
    nextPageLink.addEventListener("click", () => {
      if (currentPageCollaborations < totalPages) {
        currentPageCollaborations++;
        updateTableCollaborations();
        handlePaginationCollaborations();
      }
    });
  }
  pagination.appendChild(nextPageLink);

  // Page Number Links
  for (let i = totalPages; i >= 1; i--) {
    let pageLink;

    if (i === currentPageCollaborations) {
      pageLink = document.createElement("span");
      pageLink.classList.add("page-numbers", "current");
      pageLink.textContent = i;
      pageLink.setAttribute("aria-current", "page");
    } else {
      pageLink = document.createElement("a");
      pageLink.classList.add("page-numbers");
      pageLink.textContent = i;

      pageLink.addEventListener("click", () => {
        currentPageCollaborations = i;
        updateTableCollaborations();
        handlePaginationCollaborations();
      });
    }

    pagination.appendChild(pageLink);
  }

  // Create the "Previous" button
  const prevPageLink = document.createElement("a");
  prevPageLink.classList.add("prev", "page-numbers");
  if (currentPageCollaborations === 1) {
    prevPageLink.href = "javascript:void(0);"; // Disable link if on the first page
  } else {
    prevPageLink.addEventListener("click", () => {
      if (currentPageCollaborations > 1) {
        currentPageCollaborations--;
        updateTableCollaborations();
        handlePaginationCollaborations();
      }
    });
  }
  pagination.appendChild(prevPageLink);
}

// Function to handle sorting in the collaborations table
function handleSortCollaborations(columnIndex) {
  if (columnIndex === 1) {
    // Skip sorting for the "پاسخ من" column (columnIndex 0)
    return;
  }

  if (currentSortColumnCollaborations === columnIndex) {
    sortAscendingCollaborations = !sortAscendingCollaborations;
  } else {
    currentSortColumnCollaborations = columnIndex;
    sortAscendingCollaborations = true;
  }

  const tbody = tableCollaborations.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const aValue = a.querySelectorAll("td")[columnIndex].textContent;
    const bValue = b.querySelectorAll("td")[columnIndex].textContent;

    if (currentSortColumnCollaborations === 0) {
      // Column 1 (عنوان همکاری)
      return sortAscendingCollaborations
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });

  tbody.innerHTML = "";

  rows.forEach((row) => {
    tbody.appendChild(row);
  });

  updateTableCollaborations();
  handlePaginationCollaborations();
}

// Event listener for search input in the collaborations table
searchInputCollaborations.addEventListener("input", () => {
  const searchValue = searchInputCollaborations.value.toLowerCase();
  const rows = tableCollaborations.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    const collaborationTitle = row
      .querySelectorAll("td")[0]
      .textContent.toLowerCase(); // Search in the "عنوان همکاری" column

    if (collaborationTitle.includes(searchValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

  // After filtering, reset to page 1
  currentPageCollaborations = 1;
  handlePaginationCollaborations();
});

// Event listener for sorting in the collaborations table
tableCollaborations.querySelectorAll("th").forEach((th, columnIndex) => {
  th.addEventListener("click", () => {
    handleSortCollaborations(columnIndex);
  });
});

// Initial setup
updateTableCollaborations();
handlePaginationCollaborations();

// Function to open the modal with response text
function openModal(responseText) {
  const modal = document.getElementById("myModal");
  const responseTextElement = document.getElementById("responseText");

  // Set the response text in the modal
  responseTextElement.textContent = responseText;

  // Display the modal
  modal.style.display = "block";

  // Display the modal overlay
  const modalOverlay = document.getElementById("modalOverlay");
  modalOverlay.style.display = "block";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("myModal");
  const modalOverlay = document.getElementById("modalOverlay");

  // Hide the modal and modal overlay
  modal.style.display = "none";
  modalOverlay.style.display = "none";
}

if (!accessToken) {
  console.error("Access token not found in cookies.");
} else {
  // 2. Make an HTTP GET request to the API
  fetch("https://ssces-fum.ir/users/profile/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // 3. Update the HTML elements with the retrieved data
      document.getElementById("username").textContent = data.username;
      document.getElementById("name").textContent = data.name;
      document.getElementById("phone_number").textContent = data.phone_number;
      document.getElementById("student_id").textContent = data.student_id;
    })
    .catch((error) =>
      console.error("Error fetching data from the API:", error)
    );
}

function getFaFormattedDate(inputDate) {
  const dayMonth = getDateFormat(inputDate, {
    day: "2-digit",
    month: "long",
  });

  const year = getDateFormat(inputDate, {
    year: "numeric",
  });

  return `${dayMonth} ${year}`;
}

function getDateFormat(uDate, option) {
  let date = new Intl.DateTimeFormat("fa-IR", option).format(uDate);
  return date;
}

function persianDateConverter(gregorianDate) {
  const inputDate = new Date(gregorianDate);
  const formattedFaDate = getFaFormattedDate(inputDate);

  return formattedFaDate;
}

// Function to fetch data from the API
async function fetchData() {
  if (!accessToken) {
    console.error("Access token not found.");
    return;
  }

  const apiUrl = "https://ssces-fum.ir/events/registered_event/";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    data = await response.json();

    // Sort the data by date in descending order
    data.results.sort(
      (a, b) => new Date(b.event.date) - new Date(a.event.date)
    );

    updateTable();
  } catch (error) {
    console.error("Error:", error);
  }
}

// Initial setup: Fetch data and populate the table
fetchData();

// Function to fetch and populate the collaborations table with API data
async function fetchAndPopulateCollaborationsTable() {
  if (!accessToken) {
    console.error("Access token not found in cookies.");
  } else {
    const apiUrl = "https://ssces-fum.ir/cooperation/cooperation_replies/";

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();
      const tableBody = document.querySelector(
        "#dataTableCollaborations tbody"
      );

      // Clear existing table rows
      tableBody.innerHTML = "";

      data.results.forEach((result) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td data-label="عنوان همکاری">${result.cooperation_detail.title}</td>
          <td class="my-response-modal" data-label="پاسخ من">${result.text}</td>
        `;

        tableBody.appendChild(row);
      });

      // Attach event listeners for opening the modal
      attachEventListenersForModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

// Function to attach event listeners for opening and closing the modal
function attachEventListenersForModal() {
  // Event listener to open the modal when clicking on a response text
  tableCollaborations.querySelectorAll("tbody tr").forEach((row) => {
    const responseTextCell = row.querySelectorAll("td")[1]; // Assuming the "پاسخ من" column is at index 1
    const responseText = responseTextCell.textContent;

    responseTextCell.addEventListener("click", () => {
      openModal(responseText);
    });
  });

  // Close modal when clicking outside of it
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("myModal");
    if (event.target === modal) {
      closeModal();
    }
  });
}

// Call the fetchAndPopulateCollaborationsTable function to populate the table
fetchAndPopulateCollaborationsTable();
