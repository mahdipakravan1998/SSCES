function createGalleryPaginationButtons(totalImages, currentPage) {
  const totalPages = calculateTotalPages(totalImages);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  // Previous Page Link
  const prevPageLink = document.createElement("a");
  prevPageLink.classList.add("prev", "page-numbers");
  if (currentPage === 1) {
    prevPageLink.href = "javascript:void(0);"; // Disable link if on the first page
  } else {
    prevPageLink.addEventListener("click", () => {
      navigateToGalleryPage(currentPage - 1);
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
        navigateToGalleryPage(i);
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
      navigateToGalleryPage(currentPage + 1);
    });
  }
  pagination.appendChild(nextPageLink);
}

function calculateTotalPages(totalImages) {
  return Math.ceil(totalImages / imagesPerPage);
}

function navigateToGalleryPage(pageNumber) {
  // Fetch new data for the specified page
  fetchAndDisplayGalleryPage(pageNumber);
}

async function fetchAndDisplayGalleryPage(pageNumber) {
  const images = await fetchGalleryData();
  const totalImages = images.length;
  const totalPages = calculateTotalPages(totalImages);

  if (pageNumber < 1 || pageNumber > totalPages) {
    return; // Page number is out of range
  }

  // Display images for the current page
  displayGalleryImages(images, pageNumber);
}

async function fetchGalleryData() {
  const apiUrl = "https://ssces-fum.ir/gallery/gallery_images/";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function displayGalleryImages(images, currentPage) {
  const galleryContainer = document.getElementById("galleryContainer");
  const pagination = document.getElementById("pagination");

  // Clear previous content
  galleryContainer.innerHTML = "";
  pagination.innerHTML = "";

  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;

  for (let i = startIndex; i < endIndex && i < images.length; i++) {
    const image = images[i];
    const imageUrl = image.image;
    const description = image.description;

    const imageElement = createImageElement(imageUrl, description);
    galleryContainer.innerHTML += imageElement;
  }

  createGalleryPaginationButtons(images.length, currentPage);
}

// Add this function to create HTML elements for gallery images
function createImageElement(imageUrl, description) {
  const imageHtml = `
      <div class="card">
        <div class="card-image">
          <a href="${imageUrl}" data-fancybox="gallery" data-caption="${description}">
            <img src="${imageUrl}" alt="Image Gallery" />
          </a>
        </div>
      </div>
    `;
  return imageHtml;
}

const imagesPerPage = 9;
fetchAndDisplayGalleryPage(1);
