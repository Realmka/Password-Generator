// DOM Elements
const passwordInput = document.querySelector('.pass');
const copyIcon = document.querySelector('.copy-icon');
const refreshIcon = document.querySelector('.refresh-icon');
const charRange = document.getElementById('charRange');
const charNumber = document.getElementById('slider-value');
const generateBtn = document.querySelector('.genpass');
const uppercaseToggle = document.getElementById('toggle1');
const lowercaseToggle = document.getElementById('toggle2');
const numbersToggle = document.getElementById('toggle3');
const symbolsToggle = document.getElementById('toggle4');

// Character sets
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Generate password function
function generatePassword() {
    let chars = '';
    let password = '';

    if (uppercaseToggle.classList.contains('active')) chars += uppercaseChars;
    if (lowercaseToggle.classList.contains('active')) chars += lowercaseChars;
    if (numbersToggle.classList.contains('active')) chars += numberChars;
    if (symbolsToggle.classList.contains('active')) chars += symbolChars;

    const passwordLength = parseInt(charRange.value);

    if (chars.length === 0) {
        alert('Please select at least one character type.');
        return;
    }

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    passwordInput.value = password;
}

// Function to update slider background
function updateSliderBackground() {
    const value = ((charRange.value - charRange.min) / (charRange.max - charRange.min)) * 100;
    charRange.style.background = `linear-gradient(to right, #c762f4 ${value}%, #3c2d50 ${value}%)`;
}

// Event Listeners
generateBtn.addEventListener('click', generatePassword);

refreshIcon.addEventListener('click', generatePassword);

copyIcon.addEventListener('click', () => {
    passwordInput.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
});

charRange.addEventListener('input', () => {
    charNumber.textContent = charRange.value;
    updateSliderBackground();
    generatePassword();
});

// Toggle switches functionality
document.querySelectorAll('.toggle-switch').forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        generatePassword();
    });
});

// Initialize password and slider background on page load
generatePassword();
updateSliderBackground();
