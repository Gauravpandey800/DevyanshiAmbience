// Show/hide mobile menu
function showMenu(toggleId, navId) {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
            toggle.classList.toggle('show-icon');
        });
    }
}

showMenu('nav-toggle', 'nav-menu');

// Dropdown functionality
const dropdownItems = document.querySelectorAll('.dropdown__item');

dropdownItems.forEach((item) => {
    const dropdownButton = item.querySelector('.dropdown__button');

    if (dropdownButton) {
        dropdownButton.addEventListener('click', () => {
            const showDropdown = document.querySelector('.show-dropdown');
            toggleItem(item);

            if (showDropdown && showDropdown !== item) {
                toggleItem(showDropdown);
            }
        });
    }
});

// Toggle dropdown item
function toggleItem(item) {
    const dropdownContainer = item.querySelector('.dropdown__container');

    if (item.classList.contains('show-dropdown')) {
        dropdownContainer.removeAttribute('style');
        item.classList.remove('show-dropdown');
    } else {
        dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px';
        item.classList.add('show-dropdown');
    }
}

// Remove dropdown styles on larger screens
function removeDropdownStyles() {
    const mediaQuery = matchMedia('(min-width: 1118px)');
    const dropdownContainers = document.querySelectorAll('.dropdown__container');
    const dropdownItems = document.querySelectorAll('.dropdown__item');

    if (mediaQuery.matches) {
        dropdownContainers.forEach((container) => {
            container.removeAttribute('style');
        });

        dropdownItems.forEach((item) => {
            item.classList.remove('show-dropdown');
        });
    }
}

// Add resize event listener
window.addEventListener('resize', removeDropdownStyles);

// Theme toggle functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// Add theme toggle button event listener
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}


// new hero section
const slideshow = {
    currentSlide: 0,
    slides: document.querySelectorAll('.slide'),
    dots: document.querySelectorAll('.dot'),
    interval: null,

    init() {
        this.interval = setInterval(() => this.nextSlide(), 5000);
        this.addEventListeners();
    },

    addEventListeners() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
    },

    goToSlide(index) {
        // Clear existing interval
        clearInterval(this.interval);

        // Remove active classes
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');

        // Set new slide
        this.currentSlide = index;

        // Add active classes
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');

        // Restart interval
        this.interval = setInterval(() => this.nextSlide(), 5000);
    },

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    },

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }
};

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    slideshow.init();
});


// ============slider================
// JavaScript
let currentSlideIndex = 0;
let autoSlideInterval;

// Initialize slideshow
function initSlideshow() {
  const slides = document.querySelectorAll('.home-slide');
  if (slides.length > 0) {
    slides[0].classList.add('active');
  }
  
  // Start auto-slide
  autoSlideInterval = setInterval(() => moveSlide(1), 5000);
  
  // Pause on hover
  const wrapper = document.querySelector('.home-slideshow-wrapper');
  wrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  wrapper.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => moveSlide(1), 5000);
  });
}

function moveSlide(direction) {
  const slides = document.querySelectorAll('.home-slide');
  const track = document.querySelector('.home-slideshow-track');
  
  slides[currentSlideIndex].classList.remove('active');
  
  currentSlideIndex += direction;
  if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
  if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
  
  track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  slides[currentSlideIndex].classList.add('active');
}

// Modal functions
function openModal() {
  document.getElementById('home-gallery-modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('home-gallery-modal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Event listeners
document.querySelector('.home-slideshow-prev').addEventListener('click', () => moveSlide(-1));
document.querySelector('.home-slideshow-next').addEventListener('click', () => moveSlide(1));
document.querySelector('.home-modal-close').addEventListener('click', closeModal);
document.getElementById('home-gallery-modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('home-gallery-modal')) closeModal();
});

// Initialize slideshow when page loads
document.addEventListener('DOMContentLoaded', initSlideshow);

// Open modal when clicking any slide
document.querySelectorAll('.home-slide').forEach(slide => {
  slide.addEventListener('click', openModal);
});