function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

// Form validation logic
function validateForm(email, password, errorMessageElement) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
        errorMessageElement.textContent = "All fields are required.";
        return false;
    }

    if (!emailRegex.test(email)) {
        errorMessageElement.textContent = "Invalid email format. Please enter a valid email address.";
        return false;
    }

    errorMessageElement.textContent = ""; // Clear any previous errors
    return true;
}

function displayUserEmail() {
    const email = localStorage.getItem("userEmail");
    const displayElement = document.getElementById("user-email-display");
    const authButtons = document.getElementById("auth-buttons");
    const userInfoContainer = document.getElementById("user-info-container");
    const signOutButton = document.getElementById("sign-out-button");

    if (email) {
        displayElement.textContent = email;
        authButtons.style.display = "none";
        userInfoContainer.style.display = "flex";
        signOutButton.style.display = "block"; // Show the sign-out button
    } else {
        displayElement.textContent = "";
        authButtons.style.display = "flex";
        userInfoContainer.style.display = "none";
        signOutButton.style.display = "none"; // Hide the sign-out button
    }
}

function signOut() {
    // Hide user info and show sign-up/sign-in buttons again
    document.getElementById('user-info-container').style.display = 'none';
    document.getElementById('auth-buttons').style.display = 'flex';
    
    // Clear email display
    document.getElementById('user-email-display').textContent = '';

    localStorage.clear();
    alert("Signed out successfully.");
}

// Sign-Up Form Submission
document.getElementById("sign-up-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("sign-up-email").value.trim();
    const password = document.getElementById("sign-up-password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const errorMessage = document.getElementById("error-message-sign-up");

    if (!validateForm(email, password, errorMessage)) return;

    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return;
    }

    // Save email to localStorage
    localStorage.setItem("userEmail", email);

    alert("Sign-Up Successful!");
    closeModal('modal-sign-up');
    displayUserEmail();
});

// Sign-In Form Submission
document.getElementById("sign-in-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("sign-in-email").value.trim();
    const password = document.getElementById("sign-in-password").value.trim();
    const errorMessage = document.getElementById("error-message-sign-in");

    if (!validateForm(email, password, errorMessage)) return;

    // Save email to localStorage
    localStorage.setItem("userEmail", email);

    alert("Sign-In Successful!");
    closeModal('modal-sign-in');
    displayUserEmail();
});

// Display user email on page load if available
window.onload = displayUserEmail;
