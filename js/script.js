// Project data structure
const projects = {
    project1: {
        photos: ['images/project1/photo1.jpg', 'images/project1/photo2.jpg'],
        video: 'videos/project1/demo.mp4'
    }
    // Add more projects as needed
};

// Function to view project photos
function viewProjectPhotos(projectId) {
    const modal = document.getElementById('photoModal');
    const photoContainer = modal.querySelector('.photo-container');
    photoContainer.innerHTML = '';

    // Add photos to modal
    projects[projectId].photos.forEach(photoUrl => {
        const img = document.createElement('img');
        img.src = photoUrl;
        img.style.width = '100%';
        img.style.marginBottom = '10px';
        photoContainer.appendChild(img);
    });

    modal.style.display = 'block';
}

// Function to view project video
function viewProjectVideo(projectId) {
    const modal = document.getElementById('videoModal');
    const videoContainer = modal.querySelector('.video-container');
    videoContainer.innerHTML = '';

    const video = document.createElement('video');
    video.src = projects[projectId].video;
    video.controls = true;
    video.style.width = '100%';
    videoContainer.appendChild(video);

    modal.style.display = 'block';
}

// Close modal when clicking the close button or outside the modal
document.querySelectorAll('.modal .close').forEach(closeBtn => {
    closeBtn.onclick = function() {
        closeBtn.parentElement.style.display = 'none';
    }
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});