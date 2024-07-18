// scripts.js

// Login function
document.getElementById('loginForm')?.addEventListener('submit', async (e) =>  {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Perform login
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.success) {
        // Redirect to profile
        window.location.href = 'profile.html';
    } else {
        alert('Login failed');
    }
});

// Register function
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Perform registration
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    if (data.success) {
        // Redirect to login
        window.location.href = 'login.html';
    } else {
        alert('Registration failed');
    }
});

// Fetch properties
async function fetchProperties() {
    const response = await fetch('/api/properties');
    const properties = await response.json();
    const propertiesList = document.getElementById('propertiesList');
    propertiesList.innerHTML = properties.map ( property => `
        <div>
            <h2>${property.title}</h2>
            <p>${property.description}</p>
            <p>${property.price}</p>
            <p>${property.location}</p>
        </div>
    `).join('');
}

// Fetch profile
async function fetchProfile() {
    const response = await fetch('/api/members/profile');
    const profile = await response.json();
    const profileDetails = document.getElementById('profileDetails');
    profileDetails.innerHTML = `
        <h2>${profile.name}</h2>
        <p>${profile.email}</p>
        <p>${profile.phone}</p>
    `;
}

// Add property
document.getElementById('addPropertyForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;
    // Add property
    const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, price, location, description })
    });
    const data = await response.json();
    if (data.success) {
        // Redirect to properties
        window.location.href = 'properties.html';
    } else {
        alert('Adding property failed');
    }
});
