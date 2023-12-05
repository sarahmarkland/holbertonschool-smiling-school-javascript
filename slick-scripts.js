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
    $('#popular-card').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: calculateSlidesToShow(), // Adjust based on window size
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  
    // Populate carousel with data
    populateCarousel(data);
  }

  function populateCarousel(data) {
    data.forEach(item => {
      $('#popular-card').slick('slickAdd', `
        <div class="carousel slide">
          <div class="card">
          <img src="${item.thumb_url}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p>${item['sub-title']}</p>
          <div class="carousel-card-info">
            <div class="carousel-card-info-left">
              <img src="${item.author_pic_url}" alt="${item.author}">
              <p>${item.author}</p>
            </div>
            <div class="carousel-card-info-right">
              <img src="images/star_on.png" alt="star">
              <p>${item.star}</p>
            </div>
          </div>
      `);
    });
  }
  
  function calculateSlidesToShow() {
    const windowWidth = $(window).width();
    if (windowWidth >= 1024) {
      return 4;
    } else if (windowWidth >= 768) {
      return 2;
    } else {
      return 1;
    }
  }
  
  $(window).on('resize', () => {
    const slidesToShow = calculateSlidesToShow();
    $('#carousel').slick('slickSetOption', 'slidesToShow', slidesToShow, true);
  });
});
