/**
 * MOEHR s.r.o. - Hlavní skript webu
 */

// --- 1. PARALLAX HERO EFEKT ---
window.addEventListener('scroll', function() {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        let offset = window.pageYOffset;
        // Rychlost posunu 0.5 pro jemný efekt
        heroBg.style.transform = 'translateY(' + offset * 0.5 + 'px)';
    }
});

// --- 2. PLYNULÉ POSOUVÁNÍ (SMOOTH SCROLL) ---
const navOffset = 100; // Rezerva pro fixní menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Ignorovat, pokud jde jen o prázdný odkaz nebo odkaz v modalu, který má jiný účel
        if (this.getAttribute('href') === '#') return;

        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
            window.scrollTo({ 
                top: targetPosition, 
                behavior: 'smooth' 
            });
        }
    });
});

// --- 3. MODAL SYSTÉM (PRO BALÍČKY SLUŽEB) ---

// Funkce pro bezpečné zavření modalu
function closeModal(modalElement) {
    if (modalElement) {
        modalElement.style.display = 'none';
        document.body.style.overflow = 'auto'; // Vrátí možnost scrollovat webem
    }
}

// Otevírání modalů
const modalButtons = document.querySelectorAll('.modal-btn');
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

// Zavírání modalů - vylepšeno pro mobilní zařízení
// Nasloucháme na křížek, pozadí modalu i tlačítka uvnitř
window.addEventListener('click', function(e) {
    // 1. Kliknutí na křížek (třída .close)
    if (e.target.classList.contains('close')) {
        closeModal(e.target.closest('.modal'));
    }
    
    // 2. Kliknutí na šedé pozadí modalu
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }

    // 3. Kliknutí na tlačítko "Mám zájem" uvnitř modalu
    if (e.target.classList.contains('btn-full') || e.target.closest('.btn-full')) {
        // Necháme odkaz pracovat (skok na kontakt), ale modal zavřeme
        closeModal(e.target.closest('.modal'));
    }
});

// Speciální podpora pro mobilní "tap" na křížek (odstraňuje prodlevu prohlížeče)
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('touchstart', function(e) {
        e.preventDefault(); // Zabrání zdvojenému kliknutí
        closeModal(this.closest('.modal'));
    }, { passive: false });
});


// --- 4. ACCORDION (HARMONIKA V MODALU) ---
document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        
        if (content) {
            // Přepínání viditelnosti
            if (content.style.display === "block") {
                content.style.display = "none";
                this.querySelector('.acc-icon').textContent = '+';
            } else {
                content.style.display = "block";
                this.querySelector('.acc-icon').textContent = '−';
            }
        }
    });
});


// --- 5. LIGHTBOX (ZVĚTŠOVÁNÍ FOTEK) ---
// Poznámka: Vyžaduje v HTML prvek <div id="lightbox"><img id="lightbox-img"></div>
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".modal-img").forEach(img => {
    img.addEventListener("click", () => {
        if (lightbox && lightboxImg) {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
            document.body.style.overflow = 'hidden';
        }
    });
});

if (lightbox) {
    lightbox.addEventListener('click', function(e) {
        // Zavřít při kliknutí kamkoliv mimo samotný obrázek
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
            if (!document.querySelector('.modal[style*="display: block"]')) {
                document.body.style.overflow = 'auto';
            }
        }
    });
}


// --- 6. KONTAKTNÍ FORMULÁŘ ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Zde by normálně proběhlo odeslání na server přes fetch/ajax
        alert('Děkujeme! Vaše poptávka byla úspěšně odeslána. Brzy se vám ozveme.');
        this.reset();
    });
}


// --- 7. ANIMACE CENOVÝCH KARET ---
// Jemné měřítko při najetí myší (pouze pro desktopy)
if (window.innerWidth > 1024) {
    document.querySelectorAll(".pricing-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            if (card.classList.contains("premium")) {
                card.style.transform = "scale(1.07) translateY(-10px)";
            } else {
                card.style.transform = "translateY(-12px) scale(1.02)";
            }
        });
        card.addEventListener("mouseleave", () => {
            if (card.classList.contains("premium")) {
                card.style.transform = "scale(1.05)";
            } else {
                card.style.transform = "translateY(0)";
            }
        });
    });
}