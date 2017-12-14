var GoogleAPI = (function () {
  var API_KEY = 'AIzaSyBzrCI1GVyEBLM6nZfgjoRmiJy4fQ0VqRQ';
  var GOOGLE_URL = 'https://maps.googleapis.com/maps/api/geocode/';

  var getAddress = function (address) {
    return fetch(GOOGLE_URL + 'json?latlng=' + address.lat + ',' + address.long + '&sensor=true')
      .then(function (req) {
        return req.json();
      })
      .then(function (json) {
        return json.results[0].formatted_address;
      })
      .catch(function (err) {
        return Promise.reject(err);
      });
  };
  return {
    getAddress: getAddress
  };
})();

var model = (function () {
  var places = [
      {
          long: 31.2225712,
          lat: 30.0627897
      },
      {
          long: 31.237592,
          lat: 30.075882
      },
      {
          long: 31.198710,
          lat: 30.070682
      },
      {
          long: 30.991285,
          lat: 30.052664
      },
      {
          long: 30.936577,
          lat: 29.966919
      },
      {
          long: 29.881227,
          lat: 31.208073
      },
      {
          long: 29.935524,
          lat: 31.219805
      }
  ];

  return {
    places: places
  }
})();
var view = (function () {
  var render = function (addrString) {
    var div = document.getElementById('addresses');
    var p = document.createElement('p');
    p.innerHTML = addrString;

    div.appendChild(p);
  };

  return {
    render: render
  };
})();

var handlers = (function () {
  var showAddresses = function () {
    var sequence = Promise.resolve();

    model.places.forEach(function (place) {
      sequence = sequence.then(function () {
        return GoogleAPI.getAddress(place);
      })
      .then(view.render)
      .catch(function (error) {
        console.log(error);
      });
    });
  };

  return {
    showAddresses: showAddresses
  };
})();

document.addEventListener('DOMContentLoaded', handlers.showAddresses, false);
