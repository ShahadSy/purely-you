document.addEventListener('DOMContentLoaded', function () {
    // Display User Information
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    if (username) document.getElementById('profileName').textContent = username;
    if (email) document.getElementById('profileEmail').textContent = email;

    // Display Skin Test Result
    const skinResult = localStorage.getItem('skinResult');
    document.getElementById('skinResult').textContent = skinResult || 'No test taken yet.';

    // Display Hair Test Result
    const hairResult = localStorage.getItem('hairResult');
    document.getElementById('hairResult').textContent = hairResult || 'No test taken yet.';

    // Display Appointment Details
    const appointment = localStorage.getItem('appointment');
    document.getElementById('appointmentInfo').textContent = appointment || 'No appointments booked yet.';
});
const uploadInput = document.getElementById('uploadProfilePic');
const profileImage = document.getElementById('userProfileImage');

uploadInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImage.src = e.target.result;
            // Optionally, you can save this to localStorage to keep it after refreshing
            localStorage.setItem('profileImage', e.target.result);
        }
        reader.readAsDataURL(file);
    }
});

// Load saved profile image if it exists
window.addEventListener('load', function () {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        profileImage.src = savedImage;
    }
});