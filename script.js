// Static data
const courses = {
    electronics: {
        title: "Arduino Weather Station",
        steps: ["Connect sensors", "Upload code", "Test system"],
        resources: ["Circuit diagram", "Code template"],
        duration: "2 hours",
        difficulty: "Beginner"
    },
    chemistry: {
        title: "Chemical Reactions Lab",
        steps: ["Prepare compounds", "Mix solutions", "Record results"],
        resources: ["Safety guide", "Experiment template"],
        duration: "1.5 hours",
        difficulty: "Intermediate"
    }
};

// Camera Setup
let videoStream;

async function setupCamera() {
    try {
        videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.getElementById('videoFeed');
        video.srcObject = videoStream;
    } catch (err) {
        console.error('Camera error:', err);
    }
}

// homefunc
function homefunc() {
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.profile-section').style.display = 'none';
    document.querySelector('.dashboard').style.display = 'block';
    closeResults();
    closeDetails();
}

function mainFunc() {
    document.querySelector('.main-content').style.display = 'block';
    document.querySelector('.profile-section').style.display = 'none';
    document.querySelector('.dashboard').style.display = 'none';
}
function showGames() {
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.profile-section').style.display = 'none';
    document.querySelector('.dashboard').style.display = 'none';
    //yet to be completed using react

}

let currentUser = {
    name: "QuantumEd",
    email: "QuantumEd@gmail.com",
    verified: false
};

let generatedOTP = null;

// navigation btn
document.getElementById('profile').addEventListener('click', () => {
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.dashboard').style.display = 'none';
    document.querySelector('.profile-section').style.display = 'block';
    loadProfile();
});

function loadProfile() {
    document.getElementById('profileName').value = currentUser.name;
    document.getElementById('profileEmail').value = currentUser.email;
}

function updateProfile(e) {
    e.preventDefault();
    currentUser.name = document.getElementById('profileName').value;
    currentUser.email = document.getElementById('profileEmail').value;
    alert('Profile updated successfully!');
}

function sendVerification() {
    // Simulate of OTP
    generatedOTP = Math.floor(100000 + Math.random() * 900000);
    alert(`Simulated OTP sent to email: ${generatedOTP}`);
    document.getElementById('otpOverlay').classList.add('active');
}

function verifyOTP() {
    const enteredOTP = Array.from(document.querySelectorAll('.otp-input'))
        .map(input => input.value)
        .join('');

    if (enteredOTP === generatedOTP.toString()) {
        currentUser.verified = true;
        document.getElementById('otpMessage').textContent = "Email verified successfully!";
        document.getElementById('otpMessage').style.color = "green";
        setTimeout(() => {
            closeOTP();
            alert('Email verification successful!');
        }, 1000);
    } else {
        document.getElementById('otpMessage').textContent = "Invalid code. Please try again.";
        document.getElementById('otpMessage').style.color = "red";
    }
}

function closeOTP() {
    document.getElementById('otpOverlay').classList.remove('active');
    document.querySelectorAll('.otp-input').forEach(input => input.value = '');
}

function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.style.display = chatContainer.style.display === 'flex' ? 'none' : 'flex';
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatBody = document.getElementById('chatBody');
    const messageText = userInput.value.trim();

    if (messageText === '') return;

    // Display user message
    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user-message');
    userMessage.textContent = messageText;
    chatBody.appendChild(userMessage);
    userInput.value = '';

    chatBody.scrollTop = chatBody.scrollHeight;

    // Fetch response from backend
    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageText })
        });

        const data = await response.json();
        const botReply = data.reply;

        // Display bot response
        const botMessage = document.createElement('div');
        botMessage.classList.add('chat-message', 'bot-message');
        botMessage.innerHTML = botReply; // Use innerHTML to render bold text & structured form
        chatBody.appendChild(botMessage);

        chatBody.scrollTop = chatBody.scrollHeight;
    } catch (error) {
        console.error('Error fetching response:', error);
    }
}

document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

document.querySelector('.dashboard').style.display = 'none';

// Overlay
function openScanner() {
    setupCamera();
    document.getElementById('cameraOverlay').classList.add('active');
}

async function closeScanner() {
    // Close the camera overlay and stop the video stream
    document.getElementById('cameraOverlay').classList.remove('active');
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
    }
}

async function captureImage() {
    const video = document.getElementById('videoFeed');

    // Check if the video stream is ready
    if (!video.videoWidth) {
        alert('Video stream not ready. Please wait.');
        return;
    }

    // Create a canvas element to capture the image
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame onto the canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a data URL
    const imageUrl = canvas.toDataURL('image/jpeg');

    // Create a link element to download the image
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'captured-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show a success message and wait for the user to click "OK"
    alert('Image saved successfully!');

    // After the user clicks "OK", execute the fetch request
    await reloadTargetPage();
}

async function reloadTargetPage() {
    const targetUrl = 'http://127.0.0.1:5000/';

    try {
        // Add a cache-buster to ensure a fresh reload
        const timestamp = new Date().getTime();
        const response = await fetch(`${targetUrl}?cache=${timestamp}`, {
            method: 'GET',
            mode: 'cors', // Ensure CORS handling
            cache: 'no-cache'
        });

        // Check if the request was successful
        if (response.ok) {
            console.log('Target page reloaded successfully');
        } else {
            console.error('Failed to reload the target page');
        }
    } catch (error) {
        console.error('Error while reloading the target page:', error);
    }
}


function showResults(resources) {
    window.currentResources = resources;

    const grid = document.getElementById('resultsGrid');
    grid.innerHTML = resources.map((project, index) => `
<div class="result-card" onclick="showDetail(${index})">
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <p>⏱ ${project.duration}</p>
    <p>⭐ ${project.difficulty}</p>
</div>
`).join('');

    document.getElementById('resultsOverlay').classList.add('active');
}

function showDetail(index) {
    const project = window.currentResources[index];
    const content = document.getElementById('detailContent');

    content.innerHTML = `
<h2>${project.title}</h2>
<p>${project.description}</p>
<div class="project-meta">
    <p>⏱ ${project.duration} | ⭐ ${project.difficulty}</p>
</div>

<h3>Steps</h3>
<ol class="step-list">
    ${project.steps.map(step => `<li>${step}</li>`).join('')}
</ol>

<h3>Resources</h3>
<div class="resources">
    ${project.resources.map(res => `<div class="resource">📄 ${res}</div>`).join('')}
</div>
`;

    document.getElementById('detailOverlay').classList.add('active');
}

function closeResults() {
    document.getElementById('resultsOverlay').classList.remove('active');
}

function closeDetails() {
    document.getElementById('detailOverlay').classList.remove('active');
}

// Close overlays on ESC press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeScanner();
        closeResults();
        closeDetails();
        document.getElementById('analysisOverlay').classList.remove('active');
    }
});

// API for detection
const API_KEY = 'AIzaSyDLzJy9YHFrlX8uxMp-kjW-58_J0CaE5NA';

async function fetchGeminiResponse(materials) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Given these materials: ${materials}, suggest relevant educational projects 
                and learning resources which must include these materials compulsorily. Return the response in this exact JSON format:
                {
                    "projects": [
                        {
                            "title": "Project Title",
                            "description": "Brief description",
                            "difficulty": "Beginner/Intermediate/Advanced",
                            "duration": "Estimated time",
                            "steps": ["step1", "step2", "step3"],
                            "resources": ["resource1", "resource2"]
                        }
                    ]
                }`
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Parse the response text as JSON
        try {
            const textResponse = data.candidates[0].content.parts[0].text;
            const jsonResponse = JSON.parse(textResponse);
            return jsonResponse.projects;
        } catch (parseError) {
            console.error('Failed to parse response:', parseError);
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

async function handleMaterialsSubmit(event) {
    event.preventDefault();

    // Fetch detected labels dynamically from output.html
    let materials = '';
    try {
        const response = await fetch('output.html');
        const htmlText = await response.text();
        materials = htmlText;
    } catch (error) {
        console.error('Error fetching output.html:', error);
        alert('Failed to fetch detected labels. Please try again.');
        return;
    }

    document.getElementById('analysisOverlay').classList.add('active');

    try {
        const resources = await fetchGeminiResponse(materials);
        document.getElementById('analysisOverlay').classList.remove('active');

        if (resources && resources.length > 0) {
            showResults(resources);
        } else {
            throw new Error('No resources found');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('analysisOverlay').classList.remove('active');
        alert('Failed to fetch learning resources. Please check your API key and try again.');
    }
}

//changes made:
// Existing functions remain unchanged

// Upload Overlay Functions
function openUploadOverlay() {
    document.getElementById('uploadOverlay').classList.add('active');
}

async function closeUploadOverlay() {
    document.getElementById('uploadOverlay').classList.remove('active');
    document.getElementById('imagePreview').innerHTML = '';
    alert ("Image saved sucessfully")
    showMessage();
    await reloadTargetPage();
}

// Handle Image Upload and Preview
const imageInput = document.getElementById('imageUpload');
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('imagePreview').innerHTML = `
                <img src="${e.target.result}" alt="Uploaded Image" style="max-width: 50%; border-radius: 10px;">
                <a href="${e.target.result}" download="captured-image.jpg" class="action-button">Upload Image</a>
            `;
        };
        reader.readAsDataURL(file);
    }
});


