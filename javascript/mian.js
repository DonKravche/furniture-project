// Define the image data
const galleryImages = [
    { src: "./images/badroom-furintire.jpg", alt: "Bedroom Furniture"},
    { src: "./images/kitchen-furiniture.jpg", alt: "Kitchen Furniture"},
    { src: "./images/living-room.jpg", alt: "Living Room"},
    { src: "./images/office-furniture.jpg", alt: "Office Furniture"}
];


let currentSlide = 0;
let slides;
let slideInterval;

// Function to generate the gallery HTML
function generateGallery() {
    const galleryElement = document.getElementById('gallery');
    if (!galleryElement) return;
    
    // Clear any existing content
    galleryElement.innerHTML = '';
    
    // Create slide elements
    galleryImages.forEach((image, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        
        const link = document.createElement('a');
        link.href = image.link;
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        
        // Add event listeners to debug image loading
        img.addEventListener('load', () => console.log(`Image ${index} loaded: ${image.src}`));
        img.addEventListener('error', () => {
            console.error(`Image ${index} failed to load: ${image.src}`);
            // Make the error visible
            img.style.display = 'none';
            slideDiv.innerHTML += `<div style="color:red;padding:20px;background:#ffeeee;">Image failed to load: ${image.src}</div>`;
        });
        
        link.appendChild(img);
        slideDiv.appendChild(link);
        galleryElement.appendChild(slideDiv);
    });
    
    // Generate indicators
    generateIndicators();
    
    // Update slides reference
    slides = document.querySelectorAll('.slide');
}

// Function to generate indicators
function generateIndicators() {
    const container = document.querySelector('.gallery-container');
    
    // Remove existing indicators if any
    const existingIndicators = document.querySelector('.slide-indicators');
    if (existingIndicators) {
        existingIndicators.remove();
    }
    
    // Create new indicators
    const indicatorsDiv = document.createElement('div');
    indicatorsDiv.className = 'slide-indicators';
    
    galleryImages.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsDiv.appendChild(indicator);
    });
    
    container.appendChild(indicatorsDiv);
}

// Initialize the gallery
function initGallery() {
    // Generate gallery HTML
    generateGallery();
    
    if (slides.length > 0) {
        slides[0].classList.add('active');
        startAutoSlide();
    }
}

// Change slide function
function changeSlide(direction) {
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove active class from current slide and indicator
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Calculate new slide index
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // Reset the timer
    resetAutoSlide();
}

// Go to specific slide
function goToSlide(slideIndex) {
    const indicators = document.querySelectorAll('.indicator');
    
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = slideIndex;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    resetAutoSlide();
}

// Start automatic slideshow
function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 12000);
}

// Reset the auto slide timer
function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    
    // Add event listeners for hover
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        galleryContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    
    // Add event listeners for navigation buttons
    const leftBtn = document.querySelector('.btn.left');
    const rightBtn = document.querySelector('.btn.right');
    
    if (leftBtn) leftBtn.addEventListener('click', () => changeSlide(-1));
    if (rightBtn) rightBtn.addEventListener('click', () => changeSlide(1));
});


// Add this to your main.js file

document.addEventListener('DOMContentLoaded', function() {
    // Handle newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // You would normally send this to your server
            console.log('Newsletter signup:', email);
            
            // Show success message
            const formContainer = this.parentElement;
            const successMessage = document.createElement('p');
            successMessage.textContent = 'მადლობა გამოწერისთვის!';
            successMessage.className = 'success-message';
            successMessage.style.color = '#4CAF50';
            successMessage.style.fontWeight = 'bold';
            
            // Hide the form
            this.style.display = 'none';
            
            // Add the success message
            formContainer.appendChild(successMessage);
            
            // Optional: Reset form and show it again after a delay
            setTimeout(() => {
                this.reset();
                this.style.display = 'flex';
                formContainer.removeChild(successMessage);
            }, 5000);
        });
    }
    
    // Add smooth scrolling for map when clicking on address
    const addressElement = document.querySelector('.contact-info li:first-child');
    const mapSection = document.querySelector('.map-section');
    
    if (addressElement && mapSection) {
        addressElement.style.cursor = 'pointer';
        addressElement.addEventListener('click', function() {
            mapSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});