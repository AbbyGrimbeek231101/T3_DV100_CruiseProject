
let trips = [];
let populateTrips = (tempTrips) => {};
$(document).ready(function(){


  var apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  var apiKey = "c44b267c0632279305ead82f300abc55";

  var latitude = 44;
  var longitude = 20;

  var apiEndpoint = apiUrl + "?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

  $.ajax({
      url: apiEndpoint,
      method: "GET",
      success: function(response) {
          var weatherData = response;
          var weatherInfo = "Temperature: " + (weatherData.main.temp - 273.15).toFixed(2) + "°C";
          $("#weather-info").text(weatherInfo);
      },
      error: function(error) {
          console.error("Error fetching weather data:", error);
      }
  });



// let trip = {
    // duration: '',
    // destination:'',
    // theme:'',
    // price:''
// }

trips = [
    {
        duration: 12,
        destination:'New England and Eastern Canada',
        theme:'New England Fall Foliage Cruise',
        price: 27000,
        imageURL:"assets/DV4.JPG",
        information:'Witness the stunning fall foliage transformation in New England and Eastern Canada, visiting charming ports like Boston and Halifax.'
    },
    {
        duration: 10,
        destination:'Australian Coastline ',
        theme:'Australian Coastal Serenity',
        price:375000,
        imageURL:"assets/DV4_1.JPG",
        information:'Explore Australias diverse coastline, from Sydneys landmarks to the vibrant marine life of the Great Barrier Reef.'
    },
    {
        duration: 8,
        destination:'Transatlantic Voyage',
        theme:'iconic cities and regions around the world that were significant',
        price:30000,
        imageURL:"assets/DV 5.jpg",
        information:'Experience timeless luxury on a classic transatlantic journey between New York and Southampton.'
    },
    {
        duration: 7,
        destination:'Southeasst Aia',
        theme:'Asian Fusion Odyssey',
        price:39000,
        imageURL:"assets/DV 6.jpg",
        information:'Immerse in Southeast Asias contrasts, from Singapores modernity to Thailands temples and Vietnams markets.'
    },
    {
        duration: 5,
        destination:'Norwegian Fjords',
        theme:'Norwegian Fjords Discovery',
        price:29000,
        imageURL:"assets/DV 7.jpg",
        information:'Sail through Norways dramatic fjords, marveling at waterfalls, cliffs, and charming villages like Bergen and Alesund.'
    },
    {
        duration: 7,
        destination:'Caribbean South Pacific Islands',
        theme:' Tropical Paradise Escape',
        price:405000,
        imageURL:"assets/Dv 8.PNG",
        information:'Relax in the South Pacifics island paradises, where white-sand beaches, coral reefs, and warm hospitality await.'
    },
]

function generateCard(trip, index) {
  return `
    <div class="col-4">
      <div class="card">
        <img src="${trip.imageURL}" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-title">${trip.destination}</h4>
          <p class="card-text" id="priceText">R${trip.price}</p>
          <p class="card-text mt-4 description" id="descriptionText_${index}">
            - ${trip.theme} <br>
            - ${trip.duration} Days <br>
            - ${trip.information}
          </p>
        </div>
      </div>
    </div>
  `;
}

populateTrips = (tempTrips) => {
  const container = $('.row.pt-5');
  container.empty();
  tempTrips.forEach(function (trip, index) {
    const cardHTML = generateCard(trip, index);
    container.append(cardHTML);
  });

  $(".card").click(function () {
    const descriptionId = $(this).find(".description").attr("id");
    $("#" + descriptionId).toggle();
    $(this).find(".card-img-top").toggleClass("small");
  });

  $(".description").hide();
}

$(document).ready(function () {
  populateTrips(trips);
});



});


function DurationFilter(start,end){
  const tempTrips = trips.filter(trip => (trip.duration >= start && trip.duration <= end));
  populateTrips(tempTrips);
}

function PriceFilter(min, max){
  const tempTrips = trips.filter(trip => (trip.price >= min && trip.price <= max));
  populateTrips(tempTrips);
}

fetchForecast = function () {
	var endpoint =
		"https://api.openweathermap.org/data/2.5/onecall?lat=38.7267&lon=-9.1403&exclude=current,hourly,minutely,alerts&units=metric&appid=c44b267c0632279305ead82f300abc55";
	var forecastEl = document.getElementsByClassName("forecast");

	fetch(endpoint)
	.then(function (response) {
		if (200 !== response.status) {
			console.log(
				"Looks like there was a problem. Status Code: " + response.status
			);
			return;
		}

		forecastEl[0].classList.add('loaded');

		response.json().then(function (data) {
			var fday = "";
			data.daily.forEach((value, index) => {
				if (index > 0) {
					var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
						weekday: "long",
					});
					var icon = value.weather[0].icon;
					var temp = value.temp.day.toFixed(0);
					fday = `<div class="forecast-day">
						<p>${dayname}</p>
						<p><span class="ico-${icon}" title="${icon}"></span></p>
						<div class="forecast-day--temp">${temp}<sup>°C</sup></div>
					</div>`;
					forecastEl[0].insertAdjacentHTML('beforeend', fday);
				}
			});
		});
	})
	.catch(function (err) {
		console.log("Fetch Error :-S", err);
	});
};