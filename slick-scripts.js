jQuery(function ($) {

// Fetch data from the API
fetch('https://smileschool-api.hbtn.info/popular-tutorials')
  .then(response => response.json())
  .then(data => {
    // Process data and initialize the carousel
    initializeCarousel(data);
  })
  .catch(error => console.error('Error fetching data:', error));


  function initializeCarousel(data) {
    populateCarousel(data);
    console.log("data populated");
    $('#popular-card').slick({
      slidesToShow: 4, // Adjust based on window size
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });
    console.log("carousel initialized");
    // Populate carousel with data
  }

  function populateCarousel(data) {
    console.log("populating data");
    data.forEach(item => {
      $('#popular-card').append(`
              <div class="card p-3" >
                <img src="${item.thumb_url}" alt="${item.title}" class="card-img-top">
                <div class="card-img-overlay" style="top: 25px; top: 5%">
                  <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${item.title}</h5>
                  <p class="card-text text-muted">${item['sub-title']}</p>
                  <div class="creator d-flex align-items-center">
                    <img src="${item.author_pic_url}" alt="${item.author}" class="rounded-circle" width="30px">
                  </div>
                  <h6 class="pl-3 m-0 main-color">${item.author}</h6>
                </div>
                <div class="info pt-3 d-flex justify-content-between">
                  <div class="rating">
                    <img src="images/star_on.png" alt="star" width="15px">
                    <span class="pl-2 pr-2">${item.star}</span>
                  </div>
                  <div class="duration">
                    <span>${item.duration}</span>
                  </div>
                </div>
              </div>
      `);
    });
  }
});
