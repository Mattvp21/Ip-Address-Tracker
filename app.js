
const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/'
const apiKey = 'at_Ky6V3jJqzUbKSulUc9q0fGMDloFbH';
const apiUrl = 'https://geo.ipify.org/api/';

let currentIp = document.getElementById('current_ip')
let currentLocation = document.getElementById('current_location')
let currentTime = document.getElementById('current_time')
let currentIsp = document.getElementById('current_isp')
const enteredIp = document.getElementById('ip_address')
const searchButton = document.getElementById('search_button')

// const headersOption = {
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//     }
// }

var myMap = L.map('map', {
    'center': [0,0],
    'zoom': 0,
    'layers':[
        L.tileLayer("https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=JnBAq36mpYOsjjNdQZ5n", {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        })
    ]
})


updateMarker = (update_marker = [41.7360, -72.7950]) => {
    myMap.setView(update_marker, 13)
    L.marker(update_marker).addTo(myMap);
}

getIpDetails = (default_ip) => {
    if(default_ip === undefined) {
        var ipUrl = `${apiUrl}v1?apiKey=${apiKey}`
    }
    else {
        var ipUrl = `${apiUrl}v1?apiKey=${apiKey}&ipAddress=${default_ip}`
   
    }
    fetch(ipUrl) 
    .then(results => results.json())
    .then( data => {
        currentIp.innerHTML = data.ip
        currentLocation.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
        currentTime.innerHTML = data.location.timezone
        currentIsp.innerHTML = data.isp

        updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error => {
        alert("Unable to get ip details")
        console.log(error)
    })
}

document.addEventListener('load', updateMarker())

searchButton.addEventListener('click', e => {
    
    e.preventDefault()
    if (enteredIp.value != '' && enteredIp.value != null) {
        getIpDetails(enteredIp.value)
        return
    }
    alert("Please enter a valid IP address");
})