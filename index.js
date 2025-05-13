// Check if the user is logged in
const user = JSON.parse(localStorage.getItem('user'));

// Get the authLink element where Login/Profile will be added
const authLink = document.getElementById('authLink');

if (user) {
  // If the user is logged in, replace the Login link with Profile menu
  authLink.innerHTML = `
    <a href="profile.html">Hello, ${user.name}</a>
  `;
} else {
  // If no user is logged in, show the Login link
  authLink.innerHTML = `<a href="login.html">Login</a>`;
}
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const user = JSON.parse(localStorage.getItem('foodFrenzyUser'));
  
    // Clear old nav
    navLinks.innerHTML = `
      <a href="#">Home</a>
      <a href="#">Restaurants</a>
      <a href="#">Offers</a>
      ${
        user
          ? `<a href="profile.html">👤 ${user.username}</a>`
          : `<a href="login.html">Login</a>`
      }
    `;
  });
  