document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
//
    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
//by default clicking submit btn lead to reload page or request to server we prevent this to make a custom handlisng in js
            event.preventDefault();
            const username = this.querySelector('input[name="txt"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const password = this.querySelector('input[name="pswd"]').value;
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            window.location.href = '/assets/home.html';
        });
    }
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = this.querySelector('input[name="email"]').value;
            const password = this.querySelector('input[name="pswd"]').value;

            const storedEmail = localStorage.getItem('email');
            const storedPassword = localStorage.getItem('password');

            if (email === storedEmail && password === storedPassword) {
                window.location.href = '/assets/home.html';
            } else {
                alert('Incorrect email or password. Please sign up first!');
            }
        });
    }
});
