// Register Page - Send OTP Button Click Event
document.getElementById('sendOtpBtn').addEventListener('click', function() {
    const email = document.getElementById('email').value;

    // Simulate sending OTP (Replace with actual API call in backend later)
    if (email) {
        alert("OTP sent to " + email);
        // Simulate OTP code
        localStorage.setItem('otp', '123456'); // Just for testing, will be replaced with actual API later
    } else {
        alert("Please enter a valid email");
    }
});

// Register Form Submit Logic
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const otp = document.getElementById('otp').value;

    // Check if passwords match and OTP is correct
    if (password === confirmPassword && otp === localStorage.getItem('otp')) {
        alert("Account created successfully!");
        window.location.href = "login.html";
    } else {
        alert("Passwords don't match or OTP is incorrect!");
    }
});

// Login Form Submit Logic (For now, just an alert)
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // In actual implementation, you'd call your API here to check login credentials
    if (email && password) {
        alert("Logged in successfully!");
        // Redirect to dashboard or another page after successful login
    } else {
        alert("Please fill out all fields!");
    }
});
