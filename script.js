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
                    url: "images/print/DrakeWhite_ConcertFlyer_Public.jpg",
                    desc: "Custom concert poster for a company fundraiser."
                },
                 {
                    url: "images/print/print_gallery_publication_section_ad4.jpg",
                    desc: "Full page ad for a nationwide publication."
                },
                 {
                    url: "images/print/print_gallery_publication_section_ad5.jpg",
                    desc: "Full page ad for a nationwide publication."
                },
                {
                    url: "images/print/print_gallery_Company_vintage_poster.jpg",
                    desc: "Vintage poster created for a 20 year anniversary."
                },
                {
                    url: "images/print/print_gallery_company_brochure1.jpg",
                    desc: "Company brochure layout - interior page"
                },
                {
                    url: "images/print/print_gallery_company_brochure2.jpg",
                    desc: "Company brochure layout - cover page."
                },
                {
                    url: "images/print/print_gallery_product_circular1.jpg",
                    desc: "Company product circular cover page layout."
                },
                {
                    url: "images/print/print_gallery_product_circular2.jpg",
                    desc: "Company product circular interior page samples."     
                },
                {
                    url: "images/print/print_gallery_product_info_card1.jpg",
                    desc: "Product information card for retail display."  
                },
                {
                    url: "images/print/print_gallery_product_info_card2.jpg",
                    desc: "Product information card for retail display."  
                },
                {
                    url: "images/print/print_gallery_print_advertising1.jpg",
                    desc: "Print publication advertisements for company promo."  
                }
            ]
        },
        nexus: {
            title: "BAS GRAPHICS",
            images: [
                {
                    url: "images/bas/bas_site_home_design6.jpg",
                    desc: "Custom front-end BAS homepage & navigation integration using J2 Fin, java & WEBS N4 platforms."
                },
                {
                    url: "images/bas/bas_site_home_design5.jpg",
                    desc: "Custom BAS graphics using J2 Fin, java & N4 platforms."
                },
                {
                    url: "images/bas/bas_site_home_design4.jpg",
                    desc: "Custom BAS graphics for a Harrah's Casino located in Council Bluffs, IA."
                },
                {
                    url: "images/bas/bas_site_home_design2.jpg",
                    desc: "Custom BAS graphics navigation, homepage and equipmet pages for Field Club of Omaha."
                },
                {
                    url: "images/bas/bas_custom_equipment2.jpg",
                    desc: "Custom multi-state thermostat widgets made for BAS front-end integrations."
                },
                {
                    url: "images/bas/bas_custom_equipment1.jpg",
                    desc: "Custom multi-state guage widgets for BAS systems."
                },
                {
                    url: "images/bas/bas_dashboard_display1.jpg",
                    desc: "Custom back up generator dashboard display desiged for Honeywell WEBS N4 platform."
                }
            ]
        },
        vanguard: {
            title: "BRANDING & DESIGN",
            images: [
                {
                    url: "images/print/DrakeWhite_ConcertFlyer_Public.jpg",
                    desc: "Custom poster design for a corporate fund raising event."
                },
                {
                    url: "images/misc/misc_channel_letters1.png",
                    desc: "Channel letters set up to scale."
                },
                {
                    url: "images/misc/misc_monument_sign1.png",
                    desc: "Custom monument sign concept created for a local business."
                },
                {
                    url: "images/misc/misc_logo_design3.jpg",
                    desc: "Custom logo illustration for a catfishing team in Omaha, NE."
                },
                {
                    url: "images/misc/misc_projecting_sign1.png",
                    desc: "Projecting sign design set up to scale for a local Omaha, NE business."
                },
                {
                    url: "images/misc/misc_logo_design4.jpg",
                    desc: "Custom logo rebrand design for pneumatic tool line sold in over 100 retail stores in the US and Mexico."
                },
                {
                    url: "images/misc/misc_logo_design6.jpg",
                    desc: "Custom logo design for All Safe Homes, a home security company."
                },
                {
                    url: "images/misc/misc_custom_cooler_design1.jpg",
                    desc: "Can cooler design as part of a branded concert fundraising event."
                },
                {
                    url: "images/misc/misc_custom_cooler_design2.png",
                    desc: "Can cooler mockup design."
                }
            ]
        },
        apex: {
            title: "DIGITAL & WEB",
            images: [
                {
                    url: "images/digital/digital_web_site1.jpg",
                    desc: "Custom website designed for South Side Barbers & Beauty in Omaha, Nebraska."
                },
                {
                    url: "images/digital/digital_hero_TCC.jpg",
                    desc: "Hero graphic for social media platform."
                },
                {
                    url: "images/digital/digital_hero_promo_ad1.jpg",
                    desc: "Mobile hero image for product sales promotion."
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
