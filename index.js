// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {

    // --- Dynamic Year for Footer ---
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");
    const mobileLinks = document.querySelectorAll(".mobile-nav a");

    hamburger.addEventListener("click", () => {
        mobileNav.classList.toggle("active");
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("active");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !mobileNav.contains(e.target) && mobileNav.classList.contains("active")) {
            mobileNav.classList.remove("active");
        }
    });

    // --- Active Navigation State & Smooth Scroll ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".desktop-nav a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // --- Scroll Reveal Animations ---
    const fadeElements = document.querySelectorAll(".fade-in");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // --- Testimonial Carousel ---
    const track = document.getElementById("testimonial-track");
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const dotsNav = document.querySelector(".carousel-nav");
    const dots = Array.from(dotsNav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + "px";
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        if (!targetSlide) return;
        track.style.transform = "translateX(-" + targetSlide.style.left + ")";
        currentSlide.classList.remove("current-slide");
        targetSlide.classList.add("current-slide");
    }

    const updateDots = (currentDot, targetDot) => {
        if (!targetDot) return;
        currentDot.classList.remove("current-indicator");
        targetDot.classList.add("current-indicator");
    }

    nextBtn.addEventListener("click", e => {
        const currentSlide = track.querySelector(".current-slide");
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector(".current-indicator");
        const nextDot = currentDot.nextElementSibling;
        
        if(nextSlide) {
            moveToSlide(track, currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
        } else {
            // Loop back to start
            moveToSlide(track, currentSlide, slides[0]);
            updateDots(currentDot, dots[0]);
        }
    });

    prevBtn.addEventListener("click", e => {
        const currentSlide = track.querySelector(".current-slide");
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector(".current-indicator");
        const prevDot = currentDot.previousElementSibling;
        
        if(prevSlide) {
            moveToSlide(track, currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
        } else {
            // Loop to end
            moveToSlide(track, currentSlide, slides[slides.length - 1]);
            updateDots(currentDot, dots[dots.length - 1]);
        }
    });

    dotsNav.addEventListener("click", e => {
        const targetDot = e.target.closest("button");
        if (!targetDot) return;

        const currentSlide = track.querySelector(".current-slide");
        const currentDot = dotsNav.querySelector(".current-indicator");
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    });
});