const x = document.getElementById("result");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    x.innerHTML = "Gelocation is not supported in your browser!";
  }
}

function success(position) {
  x.innerHTML =
    "Latitude " +
    position.coords.latitude +
    "<br/> Longitude " +
    position.coords.longitude;
}

// function error() {
//   alert("Geolocation fetch failed!");
// }

function error(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "Permission denied";
      break;

    case error.TIMEOUT:
      x.innerHTML = "Time out";
      break;

    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occured";
      break;

    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Position unavailable";
      break;

    default:
      break;
  }
}
