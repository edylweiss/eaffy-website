// JavaScript Document
// --- Single Page Application (SPA) Logic ---

const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav ul li a');
const moreAboutMeBtn = document.getElementById('more-about-me-btn'); // Get the new button

function setActiveSection(id) {
    // Deactivate all sections and links
    sections.forEach(sec => sec.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    // Activate the corresponding section and link
    const targetSection = document.querySelector(id);
    const targetLink = document.querySelector(`a[href="${id}"]`);

    if (targetSection) {
        targetSection.classList.add('active');
    }
    if (targetLink) {
        targetLink.classList.add('active');
    }
}

// Handle navigation clicks for NAV links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        setActiveSection(targetId);
        // Update URL hash for better navigation (optional)
        history.pushState(null, '', targetId);
    });
});

// Handle navigation for the 'More About Me' button
if (moreAboutMeBtn) {
    moreAboutMeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = moreAboutMeBtn.getAttribute('href');
        setActiveSection(targetId);
        history.pushState(null, '', targetId);
    });
}


// Initialize based on URL hash or default to home
const initialHash = window.location.hash || '#home';
setActiveSection(initialHash);

// --- JavaScript Animation (Flash Animation Equivalent) ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Target the main introductory text heading
    const mainHeading = document.querySelector('.home-title h1');

    if (mainHeading) {
        mainHeading.style.transition = 'all 0.3s ease-in-out';
        
        mainHeading.addEventListener('mouseover', () => {
            mainHeading.style.color = 'var(--lilac-accent)';
            mainHeading.style.transform = 'scale(1.02)';
        });
        
        mainHeading.addEventListener('mouseout', () => {
            mainHeading.style.color = 'var(--text-dark)';
            mainHeading.style.transform = 'scale(1.0)';
        });
    }

    // 2. Target the profile image for border glow animation
    const profileImage = document.querySelector('.profile-image img');
    if (profileImage) {
        // Apply animation class after a short delay
        setTimeout(() => {
            profileImage.classList.add('spin-border-fade');
        }, 500); 
    }
});


// --- Form Submission Handler (Required Form) ---
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent actual form submission

    const form = event.target;
    const formData = new FormData(form);
    
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    const messageBox = document.getElementById('form-message');
    const commentsList = document.getElementById('comments-list');
    
    // Get the display text for the subject dropdown
    const subjectElement = form.querySelector(`#subject option[value="${subject}"]`);
    const subjectText = subjectElement ? subjectElement.textContent : subject;

    // 1. Create the new comment card HTML
    const newComment = document.createElement('div');
    newComment.classList.add('comment-card');
    newComment.innerHTML = `
        <h4>Feedback from ${name || 'Anonymous'}</h4>
        <p class="comment-subject">[${subjectText}]</p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <span class="comment-date">Submitted just now</span>
    `;

    // 2. Add the new comment to the top of the list
    commentsList.prepend(newComment);

    // 3. Display confirmation message
    messageBox.innerHTML = `
        <h3>Thank you, ${name || 'Guest'}!</h3>
        <p>Your comment has been posted to the section below.</p>
        <p style="font-size: 0.9em; margin-top: 10px;">(In a real application, this data would be permanently stored.)</p>
    `;
    messageBox.style.display = 'block';
    
    // 4. Clear the form after a successful submission
    form.reset();
}