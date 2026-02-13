// --- PARALLAX HERO ---
window.addEventListener('scroll', function() {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        let offset = window.pageYOffset;
        heroBg.style.transform = 'translateY(' + offset * 0.5 + 'px)';
    }
});

// --- PLYNULÉ POSOUVÁNÍ PO MENU S OFFSETEM ---
const navOffset = 100; 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// --- FUNKCE PRO ZAVŘENÍ MODALU (Důležitá pro opravu scrollu) ---
function closeModal(modalElement) {
    if (modalElement) {
        modalElement.style.display = 'none';
        document.body.style.overflow = 'auto'; // Vrátí možnost scrollovat
    }
}

// --- MODAL SYSTÉM (Otevírání a Zavírání) ---
const modalButtons = document.querySelectorAll('.modal-btn');

// Otevření modalu
modalButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Zamezí scrollování pod modalem
        }
    });
});

// Univerzální poslouchač pro kliknutí v okně
window.addEventListener('click', function(e) {
    // 1. Zavření přes křížek
    if (e.target.classList.contains('close')) {
        closeModal(e.target.closest('.modal'));
    }
    
    // 2. Zavření kliknutím na pozadí (šedá plocha)
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }

    // 3. OPRAVA: Zavření při kliknutí na tlačítko "Mám zájem" uvnitř modalu
    if (e.target.classList.contains('btn') && e.target.closest('.modal')) {
        closeModal(e.target.closest('.modal'));
    }
});

// --- ACCORDION (Harmonika v modalu) ---
document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        
        if (content) {
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        }
    });
});

// --- LIGHTBOX (Zvětšování fotek v modalu) ---
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".modal-img").forEach(img => {
    img.addEventListener("click", () => {
        if (lightbox && lightboxImg) {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        }
    });
});

if (lightbox) {
    lightbox.addEventListener('click', function(e) {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });
}

// --- KONTAKTNÍ FORMULÁŘ ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Děkujeme! Vaše poptávka byla úspěšně odeslána. Brzy se vám ozveme.');
        this.reset();
    });
}

// --- ANIMACE CENOVÝCH KARET ---
document.querySelectorAll(".pricing-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = card.classList.contains("premium") 
            ? "scale(1.07) translateY(-10px)" 
            : "translateY(-12px) scale(1.02)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = card.classList.contains("premium") 
            ? "scale(1.05)" 
            : "translateY(0)";
    });
});