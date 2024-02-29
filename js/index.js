async function fetchApiData() {
  const apiURL = "http://ssces.ir:8000/events/events/?ordering=-date";

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // Get the id and title of the first post
      const lastPostId = data.results[0].id;
      const lastPostTitle = data.results[0].title;
      const lastPostImg = data.results[0].image;

      //last-event-title-text
      document.getElementById("last-event-title-text").textContent =
        lastPostTitle;

      // Construct the dynamic link for the first post
      const lastPostLink = `event-registration.html?eventID=${lastPostId}`;

      const homePosterLinkElement = document.getElementById("home-poster-link");
      const homeEventTitleLinkElement = document.getElementById(
        "home-event-title-link"
      );

      const homePosterImgElement = document.getElementById("home-poster-img");

      homePosterImgElement.src = lastPostImg;
      homePosterLinkElement.href = lastPostLink;
      homeEventTitleLinkElement.href = lastPostLink;
    } else {
      console.log("No posts found in the API response.");
    }
  } catch (error) {
    console.error("Error fetching API data:", error);
  }
}

// Call the function to fetch the API data
fetchApiData();

// Fetch the API data
fetch("http://ssces.ir:8000/events/events/?ordering=-date")
  .then((response) => response.json())
  .then((data) => {
    // Process the data and update the event section
    displayEventData(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function displayEventData(apiData) {
  // Get the last 9 events from the API response
  const lastNineEvents = apiData.results.slice(-9);

  // Loop through each event and display its information
  lastNineEvents.forEach((event, index) => {
    const title = event.title;
    const id = event.id;
    const imageUrl = event.image;

    // Check if anonymousUserPrice and authenticatedUserPrice are different
    const authenticatedUserPrice = event.authenticated_user_price;
    const anonymousUserPrice = event.anonymous_user_price;
    const arePricesDifferent = anonymousUserPrice !== authenticatedUserPrice;

    const eventCardPosterId = `event-card-poster-${index + 1}`;
    const eventCardPosterElement = document.getElementById(eventCardPosterId);

    var discountBadge = document.createElement("div");
    discountBadge.setAttribute("class", "tourmaster-ribbon");
    discountBadge.textContent = "تخفیف دانشجویی";

    if (eventCardPosterElement && arePricesDifferent) {
      eventCardPosterElement.classList.add("tourmaster-with-ribbon");
      eventCardPosterElement.appendChild(discountBadge);
    }

    const eventPosterId = `event-poster-link-${index + 1}`;
    const eventPosterElement = document.getElementById(eventPosterId);

    const eventTitleId = `event-title-${index + 1}`;
    const eventTitleElement = document.getElementById(eventTitleId);

    const registrationLink = `event-registration.html?eventID=${id}`;
    const eventRegistrationId = `event-registration-${index + 1}`;
    const eventRegistrationElement =
      document.getElementById(eventRegistrationId);

    const posterImgId = `poster-img-${index + 1}`;
    const posterImgElement = document.getElementById(posterImgId);

    if (
      eventRegistrationElement &&
      eventTitleElement &&
      eventPosterElement &&
      posterImgElement
    ) {
      eventPosterElement.href = registrationLink;
      eventTitleElement.innerHTML = `${title}`;
      eventTitleElement.href = registrationLink;
      eventRegistrationElement.href = registrationLink;
      eventCardPosterElement.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('${imageUrl}')`;
      posterImgElement.src = imageUrl;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from the API
  fetch("http://ssces.ir:8000/gallery/gallery_images/")
    .then((response) => response.json())
    .then((data) => {
      // Get the gallery container element
      const galleryContainer = document.getElementById("gallery-list");

      // Extract the last 6 items from the API results
      const lastSixImages = data.results.slice(-6);

      // Update HTML for each image
      lastSixImages.forEach((imageData, index) => {
        const imageIndex = index + 1;

        // Update the image source
        const imageElement = document.querySelector(
          `#gallery-list li:nth-child(${imageIndex}) img`
        );
        imageElement.src = imageData.image;
        imageElement.alt = imageData.description;
        imageElement.title = imageData.description;
        imageElement.draggable = true;

        imageElement.classList.add("cropped-image");

        // Remove the 'a' tag
        const anchorElement = document.querySelector(
          `#gallery-list li:nth-child(${imageIndex}) a`
        );
        const parentLi = anchorElement.parentElement;
        parentLi.replaceChild(imageElement, anchorElement);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
