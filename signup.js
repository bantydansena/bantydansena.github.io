document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('signupMessage');
  
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Feedback
    message.style.color = 'red';
  
    if (!emailPattern.test(email)) {
      message.textContent = 'Please enter a valid email.';
      return;
    }
  
    if (password.length < 6) {
      message.textContent = 'Password must be at least 6 characters.';
      return;
    }
  
    if (password !== confirmPassword) {
      message.textContent = 'Passwords do not match.';
      return;
    }
  
    // Save to localStorage as "fake database"
    localStorage.setItem('user', JSON.stringify({ name, email, password }));
  
    message.style.color = 'green';
    message.textContent = 'Signup successful! Redirecting to login...';
  
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  });
  