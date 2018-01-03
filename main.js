const GoogleAPI = (function() {
  const GOOGLE_URL = "https://maps.googleapis.com/maps/api/geocode/";

  const getAddress = function(address) {
    return fetch(`${GOOGLE_URL}json?latlng=${address.lat},${address.long}&sensor=true`)
      .then(req => req.json())
      .then(json => json.results[0].formatted_address)
      .catch(err => Promise.reject(err));
  };
  return {
    getAddress
  };
})();

const model = (function() {
  const places = [
    {
      long: 31.2225712,
      lat: 30.0627897
    },
    {
      long: 31.237592,
      lat: 30.075882
    },
    {
      long: 31.19871,
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
    places
  };
})();

const view = (function() {
  const render = function(addrString) {
    const div = document.getElementById("addresses");
    const p = document.createElement("p");
    p.innerHTML = addrString;

    div.appendChild(p);
  };

  return {
    render
  };
})();

const handlers = (function() {
  const showAddresses = async function() {
    for (const place of model.places) {
      try {
        const addr = await GoogleAPI.getAddress(place);
        view.render(addr);
      } catch (e) {
        view.render(`Error: ${e.message}`);
      }
    }
  };

  return {
    showAddresses
  };
})();

document.addEventListener("DOMContentLoaded", handlers.showAddresses, false);
