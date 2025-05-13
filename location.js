// location.js
const locationBtn = document.getElementById('location-button');
const dropdown = document.getElementById('location-dropdown');
const closeBtn = document.getElementById('close-dropdown');
const autoBtn = document.getElementById('auto-detect');
const manualBtn = document.getElementById('manual-toggle');
const manualInput = document.getElementById('manual-input');
const submitBtn = document.getElementById('submit-location');
const locationResult = document.getElementById('location-result');
const suggestionsBox = document.getElementById('location-suggestions');
const displayText = document.getElementById('location-button');

let currentAddress = '';
let showingLocality = true;

function setLocationDisplay(locality, city, fullAddress) {
  const displayText = `${locality}, ${city}`;
  document.getElementById('location-button').textContent = displayText;

  // Save to localStorage for profile page
  localStorage.setItem('userLocation', JSON.stringify({
    locality,
    city,
    fullAddress
  }));

  currentAddress = `${displayText} | ${fullAddress}`;
  locationResult.textContent = 'Location set!';
  dropdown.classList.remove('show');
}

// Toggle dropdown
locationBtn.addEventListener('click', () => {
  dropdown.classList.toggle('show');
});

// Close dropdown
closeBtn.addEventListener('click', () => {
  dropdown.classList.remove('show');
});

// Auto-detect location
autoBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      const data = await response.json();
      const address = data.address;
      const full = data.display_name;

      const locality = address.suburb || address.village || address.town || address.hamlet || address.neighbourhood || 'Unknown Area';
      const city = address.city || address.county || address.state_district || address.state || 'Unknown City';

      setLocationDisplay(locality, city, full);
    } catch (err) {
      locationResult.textContent = 'Failed to detect location';
    }
  });
});

// Manual input toggle
manualBtn.addEventListener('click', () => {
  manualInput.style.display = 'block';
suggestionsBox.style.display = 'block';
});

// Address suggestions in Hindi & English
manualInput.addEventListener('input', async () => {
  const query = manualInput.value.trim();
  if (!query) {
    suggestionsBox.innerHTML = '';
    return;
  }

  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&accept-language=hi,en&limit=5&addressdetails=1`);
  const data = await res.json();

  suggestionsBox.innerHTML = '';
  if (data.length === 0) {
    suggestionsBox.innerHTML = '<div class="suggestion">No suggestions</div>';
    return;
  }

  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'suggestion';
    div.textContent = item.display_name;
    div.addEventListener('click', () => {
      manualInput.value = item.display_name;
      suggestionsBox.innerHTML = '';
    });
    suggestionsBox.appendChild(div);
  });
});

// Submit manual location
submitBtn.addEventListener('click', async () => {
  const query = manualInput.value;
  if (!query) return;

  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (data.length === 0) {
      locationResult.textContent = 'No results found';
      return;
    }

    const item = data[0];
    const address = item.address;
    const full = item.display_name;

    const locality = address.suburb || address.village || address.town || address.hamlet || address.neighbourhood || 'Unknown Area';
    const city = address.city || address.county || address.state_district || address.state || 'Unknown City';

    setLocationDisplay(locality, city, full);
  } catch (err) {
    locationResult.textContent = 'Failed to fetch location';
  }
});

// Toggle address display on double click
locationBtn.addEventListener('dblclick', () => {
  if (!currentAddress) return;
  const [short, full] = currentAddress.split(' | ');
  locationBtn.textContent = showingLocality ? full : short;
  showingLocality = !showingLocality;
});
