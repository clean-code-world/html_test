function setupHeroSlideshow(slideshowId) {
    const heroSlideshow = document.getElementById(slideshowId);
    if (!heroSlideshow)
        return;
    const currentPage = document.body.id || "home";
    const slidesData = {
        index: [{
            image: "img/test_pic1.jpeg",
            caption: "アニメの聖地巡礼を楽しもう"
        }, {
            image: "img/test_pic1.jpeg",
            caption: "日本全国のアニメスポットを探索"
        }, {
            image: "img/test_pic1.jpeg",
            caption: "地域と文化をつなぐ新しい体験"
        }, {
            image: "img/test_pic1.jpeg",
            caption: "JapanAnimeMapsアプリで簡単に検索"
        }, {
            image: "img/test_pic1.jpeg",
            caption: "お気に入りの作品の舞台を訪れよう"
        }],
        "regional-revitalization": [{
            image: "img/moesami.png",
            caption: "地域活性化イベント"
        }, {
            image: "img/test_pic1.jpeg",
            caption: "アプリを活用して地域活性化"
        }, {
            image: "img/coding.jpg",
            caption: "地域と文化をつなぐ新しい体験を創造"
        }, {
            image: "img/test_pic1.jpeg",
            caption: "JapanAnimeMapsアプリで簡単に検索"
        }, {
            image: "img/test_pic1.jpeg",
            caption: "お気に入りの作品の舞台を訪れよう"
        }]
    };
    let slides;
    if (slidesData[currentPage]) {
        slides = slidesData[currentPage]
    } else {
        slides = slidesData["index"]
    }
    const slideshowWrapper = document.createElement("div");
    slideshowWrapper.className = "slideshow-wrapper";
    slides.forEach(( (slide, index) => {
        const slideElement = document.createElement("div");
        slideElement.className = `slide ${index === 0 ? "active" : index === 1 ? "next" : "hidden"}`;
        const img = document.createElement("img");
        img.src = slide.image;
        img.alt = slide.caption;
        const caption = document.createElement("div");
        caption.className = "slide-caption";
        caption.textContent = slide.caption;
        slideElement.appendChild(img);
        slideElement.appendChild(caption);
        slideshowWrapper.appendChild(slideElement)
    }
    ));
    heroSlideshow.appendChild(slideshowWrapper);
    let slideInterval = setInterval((function() {
        const activeSlide = document.querySelector(".slide.active");
        const currentIndex = Array.from(activeSlide.parentNode.children).indexOf(activeSlide);
        const newIndex = (currentIndex + 1) % slides.length;
        goToSlide(newIndex)
    }
    ), 6e3);
    heroSlideshow.addEventListener("mouseenter", (function() {
        clearInterval(slideInterval)
    }
    ));
    heroSlideshow.addEventListener("mouseleave", (function() {
        slideInterval = setInterval((function() {
            const activeSlide = document.querySelector(".slide.active");
            const currentIndex = Array.from(activeSlide.parentNode.children).indexOf(activeSlide);
            const newIndex = (currentIndex + 1) % slides.length;
            goToSlide(newIndex)
        }
        ), 6e3)
    }
    ));
	    // Touch swipe support for mobile
	    let touchStartX = 0;
	    let touchStartY = 0;
	    let touchDeltaX = 0;
	    let isSwiping = false;
	    const swipeThreshold = 30; // px
	    function onTouchStart(e) {
	        if (!e.touches || e.touches.length === 0) return;
	        const t = e.touches[0];
	        touchStartX = t.clientX;
	        touchStartY = t.clientY;
	        touchDeltaX = 0;
	        isSwiping = false;
	        clearInterval(slideInterval);
	    }
	    function onTouchMove(e) {
	        if (!e.touches || e.touches.length === 0) return;
	        const t = e.touches[0];
	        const dx = t.clientX - touchStartX;
	        const dy = t.clientY - touchStartY;
	        // Activate horizontal swipe only if horizontal movement dominates
	        if (!isSwiping && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5) {
	            isSwiping = true;
	        }
	        if (isSwiping) {
	            touchDeltaX = dx;
	            // prevent page scroll while swiping horizontally
	            e.preventDefault();
	        }
	    }
	    function onTouchEnd() {
	        if (isSwiping) {
	            if (Math.abs(touchDeltaX) > swipeThreshold) {
	                const activeSlide = document.querySelector(".slide.active");
	                const currentIndex = Array.from(activeSlide.parentNode.children).indexOf(activeSlide);
	                if (touchDeltaX < 0) {
	                    // swipe left -> next
	                    const newIndex = (currentIndex + 1) % slides.length;
	                    goToSlide(newIndex);
	                } else {
	                    // swipe right -> prev
	                    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
	                    goToSlide(newIndex);
	                }
	            }
	        }
	        // resume autoplay
	        slideInterval = setInterval((function() {
	            const activeSlide = document.querySelector(".slide.active");
	            const currentIndex = Array.from(activeSlide.parentNode.children).indexOf(activeSlide);
	            const newIndex = (currentIndex + 1) % slides.length;
	            goToSlide(newIndex)
	        }
	        ), 6e3);
	        isSwiping = false;
	        touchDeltaX = 0;
	    }
	    heroSlideshow.addEventListener("touchstart", onTouchStart, { passive: false });
	    heroSlideshow.addEventListener("touchmove", onTouchMove, { passive: false });
	    heroSlideshow.addEventListener("touchend", onTouchEnd);
	    heroSlideshow.addEventListener("touchcancel", onTouchEnd);
	    
	    // Mouse drag support for desktop/web devices
	    let mouseStartX = 0;
	    let mouseStartY = 0;
	    let mouseDeltaX = 0;
	    let isDragging = false;
	    const dragThreshold = 30; // px
	    
	    function onMouseDown(e) {
	        // Ignore if it's a touch device
	        if (e.touches) return;
	        mouseStartX = e.clientX;
	        mouseStartY = e.clientY;
	        mouseDeltaX = 0;
	        isDragging = false;
	        clearInterval(slideInterval);
	        e.preventDefault();
	    }
	    
	    function onMouseMove(e) {
	        if (mouseStartX === 0) return;
	        const dx = e.clientX - mouseStartX;
	        const dy = e.clientY - mouseStartY;
	        
	        // Activate horizontal drag only if horizontal movement dominates
	        if (!isDragging && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5) {
	            isDragging = true;
	            heroSlideshow.style.cursor = 'grabbing';
	        }
	        
	        if (isDragging) {
	            mouseDeltaX = dx;
	            // Visual feedback: move the active slide during drag
	            const activeSlide = document.querySelector(".slide.active");
	            if (activeSlide) {
	                const slideWidth = activeSlide.offsetWidth;
	                const dragPercent = (mouseDeltaX / slideWidth) * 100;
	                // Limit the drag to prevent over-dragging
	                const clampedPercent = Math.max(-30, Math.min(30, dragPercent));
	                activeSlide.style.transform = `translateX(${clampedPercent}%)`;
	                activeSlide.style.transition = 'none';
	            }
	            e.preventDefault();
	        }
	    }
	    
	    function onMouseUp() {
	        const activeSlide = document.querySelector(".slide.active");
	        
	        if (isDragging && activeSlide) {
	            // Reset transform and transition
	            activeSlide.style.transform = '';
	            activeSlide.style.transition = '';
	            
	            if (Math.abs(mouseDeltaX) > dragThreshold) {
	                const currentIndex = Array.from(activeSlide.parentNode.children).indexOf(activeSlide);
	                if (mouseDeltaX < 0) {
	                    // drag left -> next
	                    const newIndex = (currentIndex + 1) % slides.length;
	                    goToSlide(newIndex);
	                } else {
	                    // drag right -> prev
	                    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
	                    goToSlide(newIndex);
	                }
	            }
	        } else if (activeSlide) {
	            // Reset transform if drag was too small
	            activeSlide.style.transform = '';
	            activeSlide.style.transition = '';
	        }
	        
	        // Reset drag state
	        isDragging = false;
	        mouseStartX = 0;
	        mouseStartY = 0;
	        mouseDeltaX = 0;
	        heroSlideshow.style.cursor = 'grab';
	        
	        // Resume autoplay
	        slideInterval = setInterval((function() {
	            const activeSlide = document.querySelector(".slide.active");
	            const currentIndex = Array.from(activeSlide.parentNode.children).indexOf(activeSlide);
	            const newIndex = (currentIndex + 1) % slides.length;
	            goToSlide(newIndex)
	        }
	        ), 3e3);
	    }
	    
	    // Handle window blur to cancel drag (when user switches tabs or windows)
	    window.addEventListener("blur", function() {
	        if (isDragging) {
	            const activeSlide = document.querySelector(".slide.active");
	            if (activeSlide) {
	                activeSlide.style.transform = '';
	                activeSlide.style.transition = '';
	            }
	            onMouseUp();
	        }
	    });
	    
	    // Add mouse event listeners for drag functionality
	    heroSlideshow.addEventListener("mousedown", onMouseDown);
	    document.addEventListener("mousemove", onMouseMove);
	    document.addEventListener("mouseup", onMouseUp);
	    
	    // Set initial cursor style
	    heroSlideshow.style.cursor = 'grab';
	    heroSlideshow.style.userSelect = 'none';
	    
    function goToSlide(index) {
        const slides = document.querySelectorAll(".slide");
        slides.forEach((slide => slide.className = "slide hidden"));
        slides[index].className = "slide active";
        const prevIndex = index === 0 ? slides.length - 1 : index - 1;
        const nextIndex = (index + 1) % slides.length;
        slides[prevIndex].className = "slide prev";
        slides[nextIndex].className = "slide next";
    }
}
function setupMobileNavigation() {
    const mobileToggle = document.createElement("button");
    mobileToggle.className = "mobile-nav-toggle";
    mobileToggle.setAttribute("aria-label", "メニューを開閉");
    mobileToggle.innerHTML = `\n      <span></span>\n      <span></span>\n      <span></span>\n    `;
    const navOverlay = document.createElement("div");
    navOverlay.className = "nav-overlay";
    const headerInner = document.querySelector(".header__inner");
    headerInner.appendChild(mobileToggle);
    document.body.appendChild(navOverlay);
    const nav = document.querySelector(".header__nav");
    const dropdowns = document.querySelectorAll(".has-dropdown");
    mobileToggle.addEventListener("click", (function() {
        this.classList.toggle("active");
        nav.classList.toggle("active");
        navOverlay.classList.toggle("active");
        document.body.style.overflow = nav.classList.contains("active") ? "hidden" : ""
    }
    ));
    navOverlay.addEventListener("click", (function() {
        closeMobileMenu()
    }
    ));
    dropdowns.forEach((dropdown => {
        const link = dropdown.querySelector(".header__nav-link");
        link.addEventListener("click", (function(e) {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                const isActive = dropdown.classList.contains("active");
                dropdowns.forEach((other => {
                    other.classList.remove("active")
                }
                ));
                if (!isActive) {
                    dropdown.classList.add("active")
                }
            }
        }
        ))
    }
    ));
    function closeMobileMenu() {
        mobileToggle.classList.remove("active");
        nav.classList.remove("active");
        navOverlay.classList.remove("active");
        document.body.style.overflow = "";
        dropdowns.forEach((dropdown => {
            dropdown.classList.remove("active")
        }
        ))
    }
    window.addEventListener("resize", (function() {
        if (window.innerWidth > 991) {
            closeMobileMenu()
        }
    }
    ));
    document.addEventListener("keydown", (function(e) {
        if (e.key === "Escape" && nav.classList.contains("active")) {
            closeMobileMenu()
        }
    }
    ))
}
function setupStrengthItemDecorations() {
    const strengthItems = document.querySelectorAll(".strength-item");
    
    strengthItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const borderWidth = rect.width - 60; // Account for padding
        const borderHeight = rect.height - 60;
        
        // Create 3-5 random decorative elements per container
        const numDecorations = 3 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < numDecorations; i++) {
            const decoration = document.createElement("div");
            decoration.className = "strength-item__decoration";
            
            // Randomly choose shape type
            const shapeTypes = ["circle", "square", "triangle"];
            const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            decoration.classList.add(`strength-item__decoration--${shapeType}`);
            
            // Set size based on shape (doubled)
            let size = 16 + Math.floor(Math.random() * 24); // 16-40px (doubled from 8-20px)
            if (shapeType === "circle") {
                decoration.style.width = size + "px";
                decoration.style.height = size + "px";
            } else if (shapeType === "square") {
                decoration.style.width = size + "px";
                decoration.style.height = size + "px";
            } else if (shapeType === "triangle") {
                decoration.style.width = "0";
                decoration.style.height = "0";
                decoration.style.borderLeftWidth = size / 2 + "px";
                decoration.style.borderRightWidth = size / 2 + "px";
                decoration.style.borderBottomWidth = size + "px";
            }
            
            // Set initial position on border (random starting point along perimeter)
            const perimeter = 2 * borderWidth + 2 * borderHeight;
            const startPosition = Math.random() * perimeter;
            let startX = 0, startY = 0;
            
            if (startPosition < borderWidth) {
                // Top border
                startX = startPosition;
                startY = 0;
            } else if (startPosition < borderWidth + borderHeight) {
                // Right border
                startX = borderWidth;
                startY = startPosition - borderWidth;
            } else if (startPosition < 2 * borderWidth + borderHeight) {
                // Bottom border
                startX = borderWidth - (startPosition - borderWidth - borderHeight);
                startY = borderHeight;
            } else {
                // Left border
                startX = 0;
                startY = 2 * borderWidth + 2 * borderHeight - startPosition;
            }
            
            decoration.style.left = (startX + 30) + "px"; // Account for padding
            decoration.style.top = (startY + 30) + "px";
            
            // Set CSS variables for animation
            decoration.style.setProperty("--border-width", borderWidth + "px");
            decoration.style.setProperty("--border-height", borderHeight + "px");
            
            // Random animation delay and duration
            const delay = Math.random() * 5;
            const duration = 15 + Math.random() * 10; // 15-25 seconds
            decoration.style.animationDelay = delay + "s";
            decoration.style.animationDuration = duration + "s";
            decoration.classList.add("animated");
            
            item.appendChild(decoration);
        }
    });
}

document.addEventListener("DOMContentLoaded", (function() {
    setupMobileNavigation();
    window.addEventListener("scroll", (function() {
        const header = document.querySelector(".header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled")
        } else {
            header.classList.remove("scrolled")
        }
    }
    ));
    const dropdownItems = document.querySelectorAll(".has-dropdown");
    dropdownItems.forEach((item => {
        const navLink = item.querySelector(".header__nav-link");
        const dropdownMenu = item.querySelector(".dropdown-menu");
        let timeoutId;
        if (window.innerWidth > 991) {
            item.addEventListener("mouseenter", (function() {
                clearTimeout(timeoutId);
                document.querySelectorAll(".dropdown-menu").forEach((menu => {
                    if (menu !== dropdownMenu) {
                        menu.style.opacity = "0";
                        menu.style.visibility = "hidden";
                        menu.style.pointerEvents = "none"
                    }
                }
                ));
                if (dropdownMenu) {
                    dropdownMenu.style.opacity = "1";
                    dropdownMenu.style.visibility = "visible";
                    dropdownMenu.style.pointerEvents = "auto";
                    dropdownMenu.style.transform = "translateX(-50%) translateY(0)"
                }
            }
            ));
            item.addEventListener("mouseleave", (function() {
                if (dropdownMenu) {
                    timeoutId = setTimeout((function() {
                        dropdownMenu.style.opacity = "0";
                        dropdownMenu.style.visibility = "hidden";
                        dropdownMenu.style.pointerEvents = "none";
                        dropdownMenu.style.transform = "translateX(-50%) translateY(10px)"
                    }
                    ), 300)
                }
            }
            ))
        }
        if (navLink && dropdownMenu) {
            navLink.addEventListener("click", (function(e) {
                if (window.innerWidth > 991) {
                    if (dropdownMenu.style.visibility !== "visible") {
                        e.preventDefault();
                        document.querySelectorAll(".dropdown-menu").forEach((menu => {
                            menu.style.opacity = "0";
                            menu.style.visibility = "hidden";
                            menu.style.pointerEvents = "none"
                        }
                        ));
                        dropdownMenu.style.opacity = "1";
                        dropdownMenu.style.visibility = "visible";
                        dropdownMenu.style.pointerEvents = "auto";
                        dropdownMenu.style.transform = "translateX(-50%) translateY(0)"
                    }
                }
            }
            ))
        }
    }
    ));
    document.addEventListener("click", (function(e) {
        if (!e.target.closest(".has-dropdown") && window.innerWidth > 991) {
            document.querySelectorAll(".dropdown-menu").forEach((menu => {
                menu.style.opacity = "0";
                menu.style.visibility = "hidden";
                menu.style.pointerEvents = "none"
            }
            ))
        }
    }
    ));
    window.addEventListener("scroll", (function() {
        if (window.innerWidth > 991) {
            document.querySelectorAll(".dropdown-menu").forEach((menu => {
                menu.style.opacity = "0";
                menu.style.visibility = "hidden";
                menu.style.pointerEvents = "none"
            }
            ))
        }
    }
    ));
    const heroSlideshow = document.getElementById("heroSlideshow");
    const heroSlideshowRegional = document.getElementById("heroSlideshowRegional");
    if (heroSlideshow) {
        setupHeroSlideshow("heroSlideshow")
    }
    if (heroSlideshowRegional) {
        setupHeroSlideshow("heroSlideshowRegional")
    }
    document.querySelectorAll('a[href^="#"]').forEach((anchor => {
        anchor.addEventListener("click", (function(e) {
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute("href"));
                if (target) {
                    const headerHeight = document.querySelector(".header").offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                    const mobileNav = document.querySelector(".header__nav");
                    const mobileToggle = document.querySelector(".mobile-nav-toggle");
                    const navOverlay = document.querySelector(".nav-overlay");
                    if (mobileNav && mobileNav.classList.contains("active")) {
                        mobileNav.classList.remove("active");
                        if (mobileToggle)
                            mobileToggle.classList.remove("active");
                        if (navOverlay)
                            navOverlay.classList.remove("active");
                        document.body.style.overflow = ""
                    }
                }
            }
        }
        ))
    }
    ));
    const scrollTopButton = document.createElement("button");
    scrollTopButton.classList.add("scroll-to-top");
    scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopButton);
    window.addEventListener("scroll", (function() {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add("visible")
        } else {
            scrollTopButton.classList.remove("visible")
        }
    }
    ));
    scrollTopButton.addEventListener("click", (function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    ));
    // Unify work-card navigation mapping here; remove separate script
    document.querySelectorAll(".work-card").forEach((card => {
        let targetUrl = "#";
        const cardTitle = card.querySelector(".work-card__title").textContent.trim();
        if (cardTitle === "JapanAnimeMaps") {
            targetUrl = "apps.html";
        } else if (cardTitle === "地域活性化プロジェクト") {
            targetUrl = "loacl-activities.html";
        } else if (cardTitle === "受託開発事例") {
            targetUrl = "contract-development.html";
        }
        card.addEventListener("click", (function(e) {
            e.preventDefault();
            window.location.href = targetUrl;
        }));
        const viewButton = card.querySelector(".work-card__view");
        if (viewButton) {
            viewButton.addEventListener("click", (function(e) {
                e.stopPropagation();
                window.location.href = targetUrl;
            }));
        }
    }));
    const loader = document.querySelector(".loader");
    if (loader) {
        setTimeout((function() {
            loader.classList.add("hidden");
            setTimeout((function() {
                loader.style.display = "none"
            }
            ), 500)
        }
        ), 500)
    }
    
    // Setup decorative polygons for strength items
    setupStrengthItemDecorations();
    
    // Setup scroll-triggered animations for strength items on mobile
    setupStrengthItemScrollAnimation();
    
    // Setup letter-by-letter animation for hero__title
    setupHeroTitleLetterAnimation();
    
    // Setup infinite slider for work cards
    setupWorkCardSlider();
}
));

function setupStrengthItemScrollAnimation() {
    // On mobile, continuous animations are handled by CSS
    // This function ensures animations run smoothly and don't interfere
    const strengthItems = document.querySelectorAll(".strength-item");
    
    // Ensure animations are always running on mobile
    const ensureAnimations = () => {
        if (window.innerWidth <= 768) {
            strengthItems.forEach(item => {
                item.style.animationPlayState = 'running';
                item.style.opacity = '1';
            });
        } else {
            strengthItems.forEach(item => {
                item.style.animationPlayState = 'running';
                item.style.opacity = '1';
            });
        }
    };
    
    // Initial setup
    ensureAnimations();
    
    // Update on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(ensureAnimations, 100);
    });
}

function setupHeroTitleLetterAnimation() {
    const heroTitle = document.querySelector(".hero__title");
    if (!heroTitle) return;
    
    // Get only direct text nodes (not the subtitle span)
    const textNodes = [];
    for (let node of heroTitle.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            textNodes.push(node);
        }
    }
    
    // Wrap each letter in a span with delay index
    let letterIndex = 0;
    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const parent = textNode.parentNode;
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            
            if (char === ' ' || char === '\n' || char === '\r') {
                span.className = 'letter space';
                span.textContent = char === ' ' ? '\u00A0' : '';
            } else {
                span.className = 'letter';
                span.textContent = char;
                span.style.setProperty('--letter-delay', letterIndex);
                letterIndex++;
            }
            
            fragment.appendChild(span);
        }
        
        parent.replaceChild(fragment, textNode);
    });
}

function setupWorkCardSlider() {
    const worksGrid = document.querySelector(".works__grid");
    if (!worksGrid) return;
    
    let wrapper = worksGrid.querySelector(".works__grid-wrapper");
    
    // If wrapper doesn't exist, create it
    if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.className = "works__grid-wrapper";
        
        // Move all work cards into wrapper
        const cards = Array.from(worksGrid.querySelectorAll(".work-card"));
        cards.forEach(card => {
            wrapper.appendChild(card);
        });
        
        worksGrid.appendChild(wrapper);
    }
    
    // Clone all cards for seamless infinite loop (duplicate entire set)
    const cards = Array.from(wrapper.querySelectorAll(".work-card"));
    const originalCount = cards.length;
    
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        wrapper.appendChild(clone);
    });
    
    // Calculate animation duration based on content width
    const updateAnimation = () => {
        if (wrapper.children.length === 0) return;
        
        // Get the width of all original cards (first half)
        let totalWidth = 0;
        for (let i = 0; i < originalCount; i++) {
            const card = wrapper.children[i];
            if (card) {
                totalWidth += card.offsetWidth;
                if (i < originalCount - 1) {
                    totalWidth += 40; // gap
                }
            }
        }
        
        const speed = 200; // pixels per second
        const duration = totalWidth / speed;
        
        wrapper.style.animationDuration = duration + 's';
    };
    
    // Update on load and resize
    setTimeout(updateAnimation, 100);
    window.addEventListener('resize', () => {
        setTimeout(updateAnimation, 100);
    });
}

document.addEventListener("DOMContentLoaded", (function() {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (function(event) {
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll("[required]");
            requiredFields.forEach((function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add("input-error")
                } else {
                    field.classList.remove("input-error")
                }
            }
            ));
            const emailField = contactForm.querySelector("#email");
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add("input-error")
                }
            }
            if (!isValid) {
                event.preventDefault();
                alert("入力内容に不備があります。必須項目をすべて入力してください。")
            }
        }
        ))
    }
    
    // Setup voice card animations on scroll
    setupVoiceCardAnimations();
    
    // Setup work card slider
    setupWorkCardSlider();
}
));

function setupVoiceCardAnimations() {
    const voiceCard = document.querySelector('.voice-card');
    if (!voiceCard) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    observer.observe(voiceCard);
    
    // Add parallax effect to screenshots on scroll
    const screenshots = voiceCard.querySelector('.voice-card__screenshots');
    if (screenshots) {
        window.addEventListener('scroll', () => {
            const rect = voiceCard.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
                screenshots.style.transform = `translateY(${scrollProgress * 20}px)`;
                screenshots.style.opacity = 0.7 + scrollProgress * 0.3;
            }
        });
    }
}
