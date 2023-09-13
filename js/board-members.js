document.addEventListener('DOMContentLoaded', function () {
    const apiURL = 'http://localhost:3000/members'; // Use the correct URL
  
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const membersContainer = document.getElementById('members-container');
        const membersData = data.results;
  
        if (membersData) {
          membersContainer.innerHTML = '';
          membersData.forEach((member) => {
            // Check if image URL is null, and replace it with the default image URL
            const imageURL = member.image ? member.image : 'upload/profile.jpg';
  
            const memberHTML = `
                  <div class="gdlr-core-item-list gdlr-core-personnel-list-column gdlr-core-column-20 gdlr-core-item-pdlr clearfix">
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
  
            membersContainer.insertAdjacentHTML('beforeend', memberHTML);
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Display an error message to the user
      });
  });