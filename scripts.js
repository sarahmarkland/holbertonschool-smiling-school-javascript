jQuery(function ($) {

// Function to show the loader
function showLoader() {
  jQuery(".loader").show();
}

  // Function to hide the loader
  function hideLoader() {
    $(".loader").hide();
  }

  function fetchQuotes() {
    // Display loader before making the request
    showLoader();
   
    // Ajax request to get quotes from the API
    $.ajax({
     url: "https://smileschool-api.hbtn.info/quotes",
     method: "GET",
     dataType: "json",
     success: function (data) {
       // Handle successful response
       if (data && data.length > 0) {
         // Clear existing quotes in the carousel
         const carouselInner = document.querySelector(".carousel-inner");
         carouselInner.innerHTML = "";
   
         // Iterate through the quotes and add them to the carousel
         data.forEach(function (quote) {
           var quoteItem = `<div class="carousel-item">
                            <div class="quote-item">
                              <img src="${quote.pic_url}" class="quote-image">
                              <blockquote class="blockquote">
                                <p class="quote-text">${quote.text}</p>
                                <h4 class="quote-text">${quote.name}</h4>
                                <span class="quote-text">${quote.title}</span>
                              </blockquote>
                            </div>
                          </div>`;
   
           carouselInner.innerHTML += quoteItem;
         });
   
         // Activate first item in the carousel
         const carouselItems = document.querySelectorAll(".carousel-item");
         carouselItems[0].classList.add("active");
       } else {
         // Handle the case where no quotes are received
         console.error("No quotes received from the API");
       }
   
       // Hide loader after quotes are loaded
       hideLoader();
     },
     error: function (error) {
       // Handle Ajax request error
       console.error("Error fetching quotes:", error);
   
       // Hide loader in case of an error
       hideLoader();
     },
    });
   }
   

  // Call the fetchQuotes function when the document is ready
  fetchQuotes();
});
