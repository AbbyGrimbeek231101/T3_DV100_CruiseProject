// cruise array
const arrCruises = [
  {
    image: "assests/slider/cruise3.jpg",
    name: "Pearl Quest",
    description: "This cruise itinerary takes you to destinations along the southeastern coast of Africa, exploring areas with rich pearl diving history and culture. You will have opportunities to learn about pearls, visit local markets, and immerse yourself in the beauty of the Indian Ocean.",
    price: 100000,
    location: "Southeastern coast of Africa",
    duration: 12,
    roundTrip: false,
    temp: ""
  },
  {
    image: "assests/slider/cruise4.jpg",
    name: "Tropical Fish Expedition",
    description: "This cruise itinerary takes you to some of the most beautiful and exotic destinations in the Indian Ocean, renowned for their diverse and colorful marine life. You will have ample opportunities for snorkeling, diving, and witnessing various species of tropical fish, rays, and other fascinating marine creatures.",
    price: 25000,
    location: "Indian Ocean",
    duration: 4,
    roundTrip: true,
    temp: ""
  },
  {
    image: "assests/slider/cruise5.jpg",
    name: "Retro Cruise",
    description: "Embark on a time-traveling adventure with the Retro Cruise . Sail through iconic eras from the 1950s in Havana to the grunge scene of 90s Seattle, and wrap up in London, celebrating the turn of the century. Immerse yourself in themed destinations, activities, and music for an unforgettable journey through time.",
    price: 30000,
    location: "Seattle",
    duration: 2,
    roundTrip: false,
    temp: ""
    
  },
  {
    image: "assests/slider/cruise6.jpg",
    name: "Exotic Islands of the Coral Triangle",
    description: "Embark on a 7-night Coral Theme Cruise to the breathtaking islands of the Coral Triangle, a paradise for marine enthusiasts. Immerse yourself in the captivating underwater world with a focus on coral reef exploration. Snorkel or dive among vibrant coral formations, discovering a diverse array of marine life. Our expert marine biologists will guide you through educational sessions, helping you understand the delicate ecosystem.",
    price: 35000,
    location: "Australia",
    destinations: "Sydney, Brisbane, Perth",
    duration: 9,
    roundTrip: true,
    temp: ""
  },
  {
    image: "assests/slider/cruise10.jpg",
    name: "Glamorous Hollywood Experience",
    description: "Experience the allure of the silver screen on our 5-night Glamorous Hollywood Cruise, taking you from Los Angeles to the stunning shores of Baja California. Step into the world of old Hollywood glamour with red carpet events, movie screenings under the stars, and elegant gala dinners. Immerse yourself in the iconic entertainment history of Los Angeles through guided tours of film studios and celebrity homes",
    price: 50000,
    location: "America",
    destinations: "Los Angles, Baja California ",
    duration: 7,
    roundTrip: false,
    temp: ""
  },
  {
    image: "assests/slider/cruise8.jpg",
    name: "Caribbean Adventure",
    description: "Embark on a 7-night Family Fun Cruise to the enchanting Caribbean, where excitement awaits every member of the family. Our cruise is designed to create cherished memories with loved ones, featuring themed kids clubs, interactive games, and engaging family-friendly activities. Explore pristine beaches, partake in snorkeling adventures, and relish quality time together. With the special offer of children under 12 sailing free with two paying adults",
    price: 15000,
    location: "Caribbean",
    duration: 10,
    roundTrip: true,
    temp: ""
  },
  
];

// Sorting & Filtering
let currentFilter = "";
let currentSort = "low to high";






// doc ready
$(document).ready(function(){

    console.log("hello")


    loadCruises(arrCruises);



});


// load cruises method
function loadCruises(showCruises) {

  $("#cruiseContainer").empty();


  for (let i = 0; i < showCruises.length; i++) {
      const cruise = showCruises[i];

      $("#cruiseContainer").append($("#cruiseCardTemp").html());

      let currentChild = $("#cruiseContainer").children().eq(i);

      

    // Weather API
    $.ajax({
      type: "GET",
      url:"https://api.openweathermap.org/data/2.5/weather?q=" + cruise.location + "&appid=0c8a911e5c7f8e5a03991afe2075de21",
      success: function(data){
          weatherData = data;

          console.log(data);
      }
        
    }).done(function(){
        $(currentChild).find("#weather-icon-img").attr('src', 'https://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png');
        $(currentChild).find("#weather-text").text(Math.round(weatherData.main.temp - 273) + "ºC");
        
        let temp = Math.round(weatherData.main.temp - 273);
      
        showCruises[i].temp = temp;
        console.log(showCruises[i].temp);

        
    })

      // Add cruise details to card
      $(currentChild).find("#cruiseImg").attr('src', cruise.image);
      $(currentChild).find(".card-title").text(cruise.name);
      $(currentChild).find(".card-text").text(cruise.description);
      $(currentChild).find(".price").text('R' + cruise.price);

      // Add hover effect to cruise card
      $(currentChild).hover(
          function () { 
              // Toggle image size
              $(this).find(".card-img-top").toggleClass("small-image");
              // Toggle Location text
              $(this).find(".location").toggle();
              // Toggle card title style
              $(this).find(".card-title").toggleClass("small-title");
              // Toggle Weather Icon
              $(currentChild).find(".weather-icon").toggle();
              
              

          }
      );

      // Add Location text to card
      $(currentChild).find(".card-text").prepend('<span class="location">Location: ' + cruise.location + '</span>');
      $(currentChild).find(".location").hide(); 
      $(currentChild).find(".weather-icon").hide();

      
  }
  
}

// -----------------
function basicFilterSortTrips(){
  let filterSortArrCruises = [];

      //Filter Trips
      if(appliedFilter){
          if(appliedFilter == "short"){
              filterSortArrCruises = arrCruises.filter(trip =>trip.duration < 6);
          }
          else if(appliedFilter == "long"){
              filterSortArrCruises = arrCruises.filter(trip =>trip.duration > 5);
          }
          else if(appliedFilter == "single"){
              filterSortArrCruises = arrCruises.filter(trip =>trip.destinations.split(",").length === 1);
          }
          else if(appliedFilter == "multi"){
              filterSortArrCruises = arrCruises.filter(trip =>trip.destinations.split(",").length > 1);
          }
          else if(appliedFilter == "row"){
              arr = arrCruises.sort(function (a, b) { 
                   return b - a; 
              });
              filterSortArrCruises = arr.slice(Math.max(arr.length - 5, 0))
          }
          else{
              filterSortArrCruises = arrCruises.filter(plant =>plant.lightAmount == appliedFilter);
          }
      }   
      else{
          filterSortArrCruises = arrCruises;
      }

      


      loadTrips(filterSortArrCruises);
}
// Removing trip items

$("#del1").click(function () {
  $("#trip1").remove();
});

$("#del2").click(function () {
  $("#trip2").remove();
});

$("#del3").click(function () {
  $("#trip3").remove();
});

$(document).ready(function () {
  $("btn btn-warning purchase").click(function (){
      alert("Thank you for your purchase, can't wait too see you soon");
  })
  
});