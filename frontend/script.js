const form = document.querySelector('#register-form');
const otpSection = document.querySelector('#otp-section');
const otpForm = document.querySelector('#otp-form');

let userEmail = '';
let userPassword = '';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Save details for OTP confirmation step
    userEmail = email;
    userPassword = password;

    // Send OTP
    try {
        const response = await fetch('/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        if (data.success) {
            document.querySelector('#register-section').style.display = 'none';
            otpSection.style.display = 'block';
        } else {
            alert(data.message || 'Failed to send OTP');
        }
    } catch (err) {
        console.error(err);
        alert('Error sending OTP');
    }
});

otpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const otp = document.querySelector('#otp').value;

    try {
        const response = await fetch('/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail, password: userPassword, otp })
        });

        const data = await response.json();
        if (data.success) {
            alert('Registered successfully! You can now log in.');
            window.location.href = '/login.html';
        } else {
            alert(data.message || 'Incorrect OTP');
        }
    } catch (err) {
        console.error(err);
        alert('Error verifying OTP');
    }
});
