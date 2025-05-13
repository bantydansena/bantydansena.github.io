document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const message = document.getElementById('loginMessage');
  
    const storedUser = JSON.parse(localStorage.getItem('user'));
  
    message.style.color = 'red';
  
    // Basic email validation
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      message.textContent = 'Please enter a valid email address.';
      return;
    }
  
    if (!storedUser) {
      message.textContent = 'No user found. Please sign up first.';
      return;
    }
  
    if (email !== storedUser.email || password !== storedUser.password) {
      message.textContent = 'Invalid email or password.';
      return;
    }
  
    // If login successful, save user session
    const foodFrenzyUser = {
      username: storedUser.name,
      email: storedUser.email,
      avatar: storedUser.avatar || 'Assets/avtaar.png'
    };
  
    localStorage.setItem('foodFrenzyUser', JSON.stringify(foodFrenzyUser));
  
    message.style.color = 'green';
    message.textContent = `Welcome back, ${storedUser.name}! Redirecting...`;
  
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  });
  