async function fetchEventsData() {
  const apiUrl = "https://ssces-fum.ir/events/events/?ordering=-date";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

const postsPerPage = 9;

function calculateTotalPages(totalPosts) {
  return Math.ceil(totalPosts / postsPerPage);
}

function displayPosts(posts, currentPage) {
  const eventSections = document.getElementById("events-cards");
  const pagination = document.getElementById("pagination");

  // Clear previous content
  eventSections.innerHTML = "";
  pagination.innerHTML = "";

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  for (let i = startIndex; i < endIndex && i < posts.length; i++) {
    const post = posts[i];
    const id = post.id;
    const title = post.title;
    const rawDate = post.date;
    const imageUrl = post.image;

    const date = persianDateConverter(rawDate);

    // Check if anonymousUserPrice and authenticatedUserPrice are different
    const authenticatedUserPrice = post.authenticated_user_price;
    const anonymousUserPrice = post.anonymous_user_price;
    const hasDiscount = anonymousUserPrice !== authenticatedUserPrice;

    const eventElement = createEventElement(
      id,
      title,
      date,
      hasDiscount,
      imageUrl
    );
    eventSections.appendChild(eventElement);
  }

  createPaginationButtons(posts.length, currentPage);
}

function getFaFormattedDate(inputDate) {
  const dayMonth = getDateFormat(inputDate, {
    day: "2-digit",
    month: "long",
  });

  const year = getDateFormat(inputDate, {
    year: "numeric",
  });

  return `${dayMonth}، ${year}`;
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

function createEventElement(id, title, date, hasDiscount, imageUrl) {
  const discountBadge = hasDiscount
    ? '<div class="discount-ribbon">تخفیف دانشجویی</div>'
    : "";

  const eventElement = document.createElement("div");
  eventElement.classList.add(
    "event-item-list",
    "gdlr-core-item-list",
    "gdlr-core-item-pdlr",
    "gdlr-core-item-mgb",
    "gdlr-core-column-20"
  );

  eventElement.innerHTML = `
      <div class="gdlr-core-blog-modern gdlr-core-with-image gdlr-core-hover-overlay-content gdlr-core-opacity-on-hover gdlr-core-zoom-on-hover gdlr-core-style-1 gdlr-core-outer-frame-element post-event-image">
          ${discountBadge}
          <div class="gdlr-core-blog-modern-inner">
              <div class="gdlr-core-blog-thumbnail gdlr-core-media-image">
                  <img src="${imageUrl}" alt="${title}" title="${title}" />
              </div>
              <div class="gdlr-core-blog-modern-content gdlr-core-center-align" style="padding: 0px 30px 30px 30px;">
                  <h3 class="gdlr-core-blog-title gdlr-core-skin-title" style="font-size: 20px; font-weight: 700; letter-spacing: 0px;">
                      <a href="event-registration.html?eventID=${id}" dir="rtl">${title}</a>
                  </h3>
                  <div class="gdlr-core-blog-info-wrapper gdlr-core-skin-divider">
                      <span class="gdlr-core-blog-info gdlr-core-blog-info-font gdlr-core-skin-caption gdlr-core-blog-info-date">
                          <span class="gdlr-core-blog-info-sep">•</span>
                          <span dir="rtl">${date}</span>
                          <span class="gdlr-core-head"><i class="gdlr-icon-clock"></i></span>
                      </span>
                  </div>
              </div>
          </div>
      </div>
    `;

  return eventElement;
}

function createPaginationButtons(totalPosts, currentPage) {
  const totalPages = calculateTotalPages(totalPosts);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  // Previous Page Link
  const prevPageLink = document.createElement("a");
  prevPageLink.classList.add("prev", "page-numbers");
  if (currentPage === 1) {
    prevPageLink.href = "javascript:void(0);"; // Disable link if on the first page
  } else {
    prevPageLink.addEventListener("click", () => {
      navigateToPage(currentPage - 1);
    });
  }
  pagination.appendChild(prevPageLink);

  // Page Number Links
  for (let i = 1; i <= totalPages; i++) {
    let pageLink;

    if (i === currentPage) {
      pageLink = document.createElement("span");
      pageLink.classList.add("page-numbers", "current");
      pageLink.textContent = i;
      pageLink.setAttribute("aria-current", "page");
    } else {
      pageLink = document.createElement("a");
      pageLink.classList.add("page-numbers");

      pageLink.addEventListener("click", () => {
        navigateToPage(i);
      });

      pageLink.textContent = i;
    }

    pagination.appendChild(pageLink);
  }

  // Next Page Link
  const nextPageLink = document.createElement("a");
  nextPageLink.classList.add("next", "page-numbers");

  if (currentPage === totalPages) {
    nextPageLink.href = "javascript:void(0);"; // Disable link if on the last page
  } else {
    nextPageLink.addEventListener("click", () => {
      navigateToPage(currentPage + 1);
    });
  }
  pagination.appendChild(nextPageLink);
}

function navigateToPage(pageNumber) {
  // Fetch new data for the specified page
  fetchAndDisplayPage(pageNumber);
}

async function fetchAndDisplayPage(pageNumber) {
  const posts = await fetchEventsData();
  const totalPosts = posts.length;
  const totalPages = calculateTotalPages(totalPosts);

  if (pageNumber < 1 || pageNumber > totalPages) {
    return; // Page number is out of range
  }

  // Display posts for the current page
  displayPosts(posts, pageNumber);
}

const categoryMapping = {
  workshop: 1,
  course: 2,
  conference: 3,
  celebration: 4,
};

document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(
    "#filter-container input[type='checkbox']"
  );
  const searchButton = document.getElementById("search-button");
  const filteredPostsContainer = document.getElementById("events-cards");
  const noContentMessage = document.getElementById("no-content-message");

  // Filter and display posts based on selected categories
  function filterAndDisplayPosts(postsData) {
    const selectedCategories = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => categoryMapping[checkbox.value]);

    const filteredPosts = postsData.filter((post) =>
      selectedCategories.includes(post.category)
    );

    displayFilteredPosts(filteredPosts);
  }

  // Display filtered posts or show no content message
  function displayFilteredPosts(posts) {
    if (posts.length === 0) {
      filteredPostsContainer.innerHTML = "";
      noContentMessage.classList.remove("hidden-not-found");
      pagination.innerHTML = ""; // Remove pagination when there are no posts
    } else {
      noContentMessage.classList.add("hidden-not-found");
      filteredPostsContainer.innerHTML = "";
      displayPosts(posts, 1); // Display filtered posts with pagination
      createPaginationButtons(posts.length, 1); // Reset pagination with filtered posts
    }
  }

  // Set up event listener for search button
  searchButton.addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent form submission and page reload
    const postsData = await fetchEventsData();
    filterAndDisplayPosts(postsData);
  });

  // Initial fetch and display of all posts
  fetchAndDisplayPage(1);
});
