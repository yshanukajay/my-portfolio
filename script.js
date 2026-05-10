document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup tsParticles for Neural Network Background
    const setupParticles = async () => {
        try {
            await tsParticles.load({
                id: "tsparticles",
                options: {
                    background: {
                        color: {
                            value: "transparent",
                        },
                    },
                    fpsLimit: 60,
                    interactivity: {
                        events: {
                            onHover: {
                                enable: true,
                                mode: "grab", // Network lines connect to mouse
                            },
                            resize: true,
                        },
                        modes: {
                            grab: {
                                distance: 140,
                                links: {
                                    opacity: 0.5,
                                    color: "#00f0ff"
                                },
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: ["#00f0ff", "#7000ff"],
                        },
                        links: {
                            color: "#a0a0a5",
                            distance: 150,
                            enable: true,
                            opacity: 0.3,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 1,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 60,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 3 },
                        },
                    },
                    detectRetina: true,
                },
            });
        } catch (error) {
            console.log("Error loading particles", error);
        }
    };
    
    // Check if tsParticles is available before loading
    if(typeof tsParticles !== 'undefined') {
        setupParticles();
    }

    // 2. Typing Effect for Hero Section
    const typingElement = document.querySelector('.typed-text');
    const roles = [
        "Machine Learning Engineer",
        "Data Engineer",
        "MLOps Specialist"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Handle word completion and deletion initiation
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // pause at the end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; // move to next word
            typingSpeed = 500; // pause before typing new word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect
    if (typingElement) {
        setTimeout(type, 1000); // Initial delay
    }

    // 3. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Optional: Stop observing once revealed
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3.5 Animated Skill Graphs
    const skillFills = document.querySelectorAll('.progress-fill');
    
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.5 // Trigger when half of the bar is visible
    });

    skillFills.forEach(fill => skillObserver.observe(fill));

    // 4. Update Footer Year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 5. Setup Vanilla Tilt for 3D Cards & Bento Items
    if(typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card, .bento-item"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    // 6. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                // Adjust scroll position for fixed navbar
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
