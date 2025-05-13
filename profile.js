// Safely fetch user data from localStorage
const userData = JSON.parse(localStorage.getItem("foodFrenzyUser"));

if (userData) {
  // Inject data into profile page
  document.getElementById("username").textContent = userData.username || "Guest";
  document.getElementById("user-email").textContent = userData.email || "guest@foodfrenzy.com";
  document.getElementById("user-avatar").src = userData.avatar || "Assets/avtaar.png";
} else {
  // Fallback guest user
  document.getElementById("username").textContent = "Guest";
  document.getElementById("user-email").textContent = "guest@foodfrenzy.com";
  document.getElementById("user-avatar").src = "Assets/avtaar.png";
}

// Logout handling
document.querySelector(".logout").addEventListener("click", () => {
  localStorage.removeItem("foodFrenzyUser");
  localStorage.removeItem("user");
  window.location.href = "index.html";
});
