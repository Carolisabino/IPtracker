const API_KEY = "at_3i10fktLlEwNBUX1M7TpG5C4sZM6y";

let current_ip = document.getElementById('current_ip')
let current_location = document.getElementById('current_location')
let current_timezone = document.getElementById('current_timezone')
let current_isp = document.getElementById('current_isp')

const entered_ip = document.getElementById('ip_address')
const search_btn = document.getElementById('search_btn')

const map = L.map('display-map', {
    'center': [0,0],
    'zoom': 0,
    'layers':[
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
    
    })
]

})

updateMarker = (update_marker = [-33.665, 18.993]) => {
    map.setView(update_marker, 13);
    L.marker(update_marker).addTo(map);
}

getApiDetails = (userInput) => {
    fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${API_KEY}&ipAddress=${userInput}`)
    .then (results => results.json())
    .then(data => {
        current_ip.innerHTML = data.ip
        current_location.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
        current_timezone.innerHTML = data.location.timezone
        current_isp.innerHTML = data.isp 
        
        updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error => {
        alert('Unable to get IP data')
        console.log(error)
    })
}

document.addEventListener('load', updateMarker())

search_btn.addEventListener('click', e =>{
    e.preventDefault()
    if (entered_ip.value != '' && entered_ip.value != null){
        getApiDetails(entered_ip.value)
        return
    }
    alert("Please enter a valid IP address");
})