const signupButton = document.getElementById('signup');
const signInButton = document.getElementById('signin');
const container = document.getElementById('container');

signupButton.addEventListener('click', () =>{
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});