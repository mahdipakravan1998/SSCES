document.addEventListener("DOMContentLoaded", function () {
  const apiURLCourses = "http://ssces.ir:8000/central_members/council_periods/";
  const apiURLMembers = "http://ssces.ir:8000/central_members/central_members/";

  // Get the access token from the cookie
  const accessToken = getCookie("access_token");

  // Fetch data from the API for courses
  fetch(apiURLCourses, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((courseData) => {
      const courseSelectionContainer =
        document.getElementById("courseSelection");

      // Remove existing summary element
      const existingSummary =
        courseSelectionContainer.querySelector(".select-summary");
      if (existingSummary) {
        courseSelectionContainer.removeChild(existingSummary);
      }

      // Create a new summary element
      const newSummary = document.createElement("summary");
      newSummary.classList.add("select-summary", "radio-group");

      // Create the default radio input
      const defaultRadio = document.createElement("input");
      defaultRadio.setAttribute("type", "radio");
      defaultRadio.setAttribute("name", "item");
      defaultRadio.setAttribute("id", "default");
      defaultRadio.classList.add("radio-input");
      defaultRadio.title = "انتخاب دوره شورا";
      defaultRadio.checked = true;

      newSummary.appendChild(defaultRadio);

      // Determine the course with the smallest ID
      const smallestIdCourse = courseData.results.reduce((min, course) =>
        course.id < min.id ? course : min
      );

      // Iterate through the API response and create radio inputs
      courseData.results.forEach((period) => {
        const radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "item");
        radio.setAttribute("id", period.id);
        radio.classList.add("radio-input");
        radio.title = period.period;

        newSummary.appendChild(radio);
      });

      const periodOptionsContainer = document.getElementById("periodOptions");

      // Remove existing options
      while (periodOptionsContainer.firstChild) {
        periodOptionsContainer.removeChild(periodOptionsContainer.firstChild);
      }

      // Iterate through the API response and create options
      courseData.results.forEach((period) => {
        const li = document.createElement("li");
        li.classList.add("select-option");

        const label = document.createElement("label");
        label.setAttribute("for", period.id);
        label.classList.add("radio-label");
        label.textContent = period.period;

        li.appendChild(label);
        periodOptionsContainer.appendChild(li);
      });

      // Append the new summary to the container
      courseSelectionContainer.appendChild(newSummary);

      // Fetch data from the API for members based on the smallest ID course
      fetch(`${apiURLMembers}?council=${smallestIdCourse.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((membersData) => {
          const membersContainer = document.getElementById("members-container");

          if (membersData.results) {
            membersContainer.innerHTML = "";
            membersData.results.forEach((member) => {
              const imageURL = member.image
                ? member.image
                : "upload/profile.jpg";

              const memberHTML = `
                <div class="gdlr-core-item-list gdlr-core-personnel-list-column gdlr-core-column-15 gdlr-core-item-pdlr clearfix">
                  <div class="gdlr-core-personnel-list clearfix">
                    <div class="gdlr-core-personnel-list-image gdlr-core-media-image gdlr-core-zoom-on-hover" style="border-radius: 20px; -moz-border-radius: 20px; -webkit-border-radius: 20px; overflow: hidden;">
                      <img src="${imageURL}" title="${member.name}" style="width: 100%;" />
                    </div>
                    <div class="gdlr-core-personnel-list-content-wrap">
                      <h3 class="gdlr-core-personnel-list-title" style="font-size: 26px; font-weight: 500; letter-spacing: 0px; text-transform: none;">
                        <span>${member.name}</span>
                      </h3>
                      <div class="gdlr-core-personnel-list-position gdlr-core-info-font gdlr-core-skin-caption" style="font-size: 16px; font-weight: 400; font-style: normal;">${member.description}</div>
                    </div>
                  </div>
                </div>`;

              membersContainer.insertAdjacentHTML("beforeend", memberHTML);
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching member data:", error);
          // Display an error message to the user
        });

      // Add event listener for course selection
      newSummary.addEventListener("change", function (event) {
        const selectedPeriodId = event.target.id;

        // Fetch data from the API for members based on selected course
        fetch(`${apiURLMembers}?council=${selectedPeriodId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((membersData) => {
            const membersContainer =
              document.getElementById("members-container");

            if (membersData.results) {
              membersContainer.innerHTML = "";
              membersData.results.forEach((member) => {
                const imageURL = member.image
                  ? member.image
                  : "upload/profile.jpg";

                const memberHTML = `
                  <div class="gdlr-core-item-list gdlr-core-personnel-list-column gdlr-core-column-15 gdlr-core-item-pdlr clearfix">
                    <div class="gdlr-core-personnel-list clearfix">
                      <div class="gdlr-core-personnel-list-image gdlr-core-media-image gdlr-core-zoom-on-hover" style="border-radius: 20px; -moz-border-radius: 20px; -webkit-border-radius: 20px; overflow: hidden;">
                        <img src="${imageURL}" title="${member.name}" style="width: 100%;" />
                      </div>
                      <div class="gdlr-core-personnel-list-content-wrap">
                        <h3 class="gdlr-core-personnel-list-title" style="font-size: 26px; font-weight: 500; letter-spacing: 0px; text-transform: none;">
                          <span>${member.name}</span>
                        </h3>
                        <div class="gdlr-core-personnel-list-position gdlr-core-info-font gdlr-core-skin-caption" style="font-size: 16px; font-weight: 400; font-style: normal;">${member.description}</div>
                      </div>
                    </div>
                  </div>`;

                membersContainer.insertAdjacentHTML("beforeend", memberHTML);
              });
            }
          })
          .catch((error) => {
            console.error("Error fetching member data:", error);
            // Display an error message to the user
          });
      });
    })
    .catch((error) => console.error("Error fetching course data:", error));
});

// Function to get a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
