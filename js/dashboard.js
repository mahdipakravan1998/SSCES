// JavaScript for search, sort, and pagination
const table = document.getElementById("dataTable");
const searchInput = document.getElementById("searchInput");
const pagination = document.getElementById("pagination");
let currentPage = 1;
const itemsPerPage = 5; // Change the desired number of items per page
let currentSortColumn = null;
let sortAscending = true;

// Function to update the table based on the current page
function updateTable() {
  const rows = Array.from(table.querySelectorAll("tbody tr"));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  rows.forEach((row, index) => {
    if (index >= startIndex && index < endIndex) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Function to handle pagination
function handlePagination() {
  const rows = table.querySelectorAll("tbody tr");
  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const pagination = document.getElementById("pagination");
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
  if (columnIndex === 1) {
    // Skip sorting for the "تاریخ برگزاری" column (columnIndex 1)
    return;
  }

  if (currentSortColumn === columnIndex) {
    sortAscending = !sortAscending;
  } else {
    currentSortColumn = columnIndex;
    sortAscending = true;
  }

  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const aValue = a.querySelectorAll("td")[columnIndex].textContent;
    const bValue = b.querySelectorAll("td")[columnIndex].textContent;

    if (currentSortColumn === 0 || currentSortColumn === 2) {
      // Column 0 (Course) or 2 (Payment Status)
      return sortAscending
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });

  tbody.innerHTML = "";

  rows.forEach((row) => {
    tbody.appendChild(row);
  });

  updateTable();
  handlePagination();
}

// Event listener for search input
searchInput.addEventListener("input", () => {
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
});

// Event listener for sorting
table.querySelectorAll("th").forEach((th, columnIndex) => {
  th.addEventListener("click", () => {
    handleSort(columnIndex);
  });
});

// Initial setup
updateTable();
handlePagination();


// JavaScript for search, sort, and pagination in the collaborations table
const tableCollaborations = document.getElementById("dataTableCollaborations");
const searchInputCollaborations = document.getElementById("searchInputCollaborations");
let currentPageCollaborations = 1;
const itemsPerPageCollaborations = 5; // Change the desired number of items per page
let currentSortColumnCollaborations = null;
let sortAscendingCollaborations = true;

// Function to update the table based on the current page in the collaborations table
function updateTableCollaborations() {
  const rows = Array.from(tableCollaborations.querySelectorAll("tbody tr"));
  const startIndex = (currentPageCollaborations - 1) * itemsPerPageCollaborations;
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
