jQuery(function ($) {

function fetchVideos() {
  // Display loader before making the request
  showLoader();
 
  // Ajax request to get videos from the API
  $.ajax({
    url: "https://smileschool-api.hbtn.info/popular-tutorials",
    method: "GET",
    dataType: "json",
    success: function (data) {
      // Handle successful response
      if (data && data.length > 0) {
        // Clear existing videos in the carousel
        const carouselInner = document.querySelector(".video-carousel-inner");
        carouselInner.innerHTML = "";
 
        // Iterate through the videos and add them to the carousel
        data.forEach(function (video) {
          var videoItem = `<div class="carousel-item">
                          <div class="video-item">
                            <img src="${video.pic_url}" class="video-image">
                            <div class="video-content">
                              <h4 class="video-title">${video.title}</h4>
                              <p class="video-description">${video.description}</p>
                            </div>
                          </div>
                        </div>`;
 
          carouselInner.innerHTML += videoItem;
        });
 
        // Activate first item in the carousel
        const carouselItems = document.querySelectorAll(".carousel-item");
        carouselItems[0].classList.add("active");
      } else {
        // Handle the case where no videos are received
        console.error("No videos received from the API");
      }
 
      // Hide loader after videos are loaded
      hideLoader();
    },
    error: function (error) {
      // Handle Ajax request error
      console.error("Error fetching videos:", error);
 
      // Hide loader in case of an error
      hideLoader();
    },
  });
 }
}
$('.video-carousel').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
 });
 