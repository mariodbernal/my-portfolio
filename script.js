document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. PROJECT GALLERIES DATA (Updated with Descriptions)
    // ==========================================
    const galleries = {
        aether: {
            title: "Print Design",
            images: [
                {
                    url: "images/print/print_gallery_TCC_1.jpg",
                    desc: "Print advertisement"
                },
                {
                    url: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?q=80&w=1200",
                    desc: "Custom typography design and brand style guidelines overview."
                },
                {
                    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200",
                    desc: "Digital outdoor advertising mockup displaying high-contrast grid systems."
                }
            ]
        },
        nexus: {
            title: "Nexus Mobile Platform",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1581291518655-9523c932dedf?q=80&w=1200",
                    desc: "User journey map and primary dark mode interface layouts."
                },
                {
                    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
                    desc: "Design system dashboard outlining responsive component variables."
                }
            ]
        },
        vanguard: {
            title: "Vanguard Journal",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1541462608141-ad4979e408c9?q=80&w=1200",
                    desc: "Editorial front cover layout emphasizing modern Swiss typography."
                },
                {
                    url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200",
                    desc: "Interior page grid setup showing mixed-media text and photo execution."
                }
            ]
        },
        apex: {
            title: "Apex Motion Graphics",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200",
                    desc: "Vector storyboards detailing complex keyframe transformations."
                }
            ]
        }
    };

    // ==========================================
    // 2. LIGHTBOX SYSTEM LOGIC
    // ==========================================
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-project-name');
    const modalDesc = document.getElementById('modal-img-description'); // Added target
    const modalCounter = document.getElementById('modal-counter');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-nav.prev');
    const nextBtn = document.querySelector('.modal-nav.next');
    
    let currentGalleryKey = null;
    let currentImageIndex = 0;

    // Open Lightbox
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const galleryKey = card.getAttribute('data-gallery');
            if (galleries[galleryKey]) {
                currentGalleryKey = galleryKey;
                currentImageIndex = 0;
                updateModalContent();
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.classList.add('modal-open');
            }
        });
    });

    // Close Lightbox
    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        modalImg.src = ""; 
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-slide-container')) {
            closeModal();
        }
    });

    // Navigate Slides
    const changeSlide = (direction) => {
        if (!currentGalleryKey) return;
        const totalImages = galleries[currentGalleryKey].images.length;
        
        currentImageIndex += direction;
        
        if (currentImageIndex >= totalImages) currentImageIndex = 0;
        if (currentImageIndex < 0) currentImageIndex = totalImages - 1;
        
        updateModalContent();
    };

    prevBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide(1));

    // Update Layout Content
    function updateModalContent() {
        const gallery = galleries[currentGalleryKey];
        const currentItem = gallery.images[currentImageIndex];
        
        modalImg.src = currentItem.url;
        modalTitle.textContent = gallery.title;
        modalDesc.textContent = currentItem.desc; // Dynamic description Injection
        modalCounter.textContent = `${currentImageIndex + 1} / ${gallery.images.length}`;
    }

    // Keyboard Accessibility Support
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowRight") changeSlide(1);
        if (e.key === "ArrowLeft") changeSlide(-1);
    });

    // ==========================================
    // 3. DARK / LIGHT MODE THEME TOGGLE
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // ==========================================
    // 4. INTERSECTION OBSERVER (SCROLL REVEAL)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});
