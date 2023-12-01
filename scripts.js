jQuery(function ($) {

// Function to show the loader
function showLoader() {
  jQuery(".loader").show();
}

  // Function to hide the loader
  function hideLoader() {
    $(".loader").hide();
  }

  // Function to fetch quotes from the API
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
          $(".carousel-inner").empty();

          // Iterate through the quotes and add them to the carousel
          data.forEach(function (quote) {
            var quoteItem = `<div class="carousel-item">
                               <blockquote class="blockquote">
                                 <p>${quote.text}</p>
                                 <footer class="blockquote-footer">${quote.name}</footer>
                               </blockquote>
                             </div>`;

            $(".carousel-inner").append(quoteItem);
          });

          // Activate first item in the carousel
          $(".carousel-inner .carousel-item:first").addClass("active");
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
