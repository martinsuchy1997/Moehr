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
const navOffset = 30; // Rezerva pro fixní menu
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

// Funkce pro bezpečné zavření modalu pomocí třídy
function closeModal(modalElement) {
    if (modalElement) {
        modalElement.classList.remove('is-open'); // Odstraní třídu pro viditelnost
        document.body.style.overflow = 'auto';    // Vrátí scrollbar
    }
}

// Otevírání modalů pomocí třídy
const modalButtons = document.querySelectorAll('.modal-btn');
modalButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('is-open');       // Přidá třídu pro zobrazení
            document.body.style.overflow = 'hidden'; // Zamkne scroll
        }
    });
});

// Zavírání modalů (kliknutí na křížek, pozadí nebo tlačítko)
window.addEventListener('click', function(e) {
    // 1. Kliknutí na křížek (třída .close)
    if (e.target.classList.contains('close')) {
        closeModal(e.target.closest('.modal'));
    }
    
    // 2. Kliknutí na pozadí modalu (nyní kontrolujeme modal-overlay nebo modal samotný)
    if (e.target.classList.contains('modal') || e.target.classList.contains('modal-overlay')) {
        closeModal(e.target.closest('.modal'));
    }

    // 3. Kliknutí na tlačítko "Mám zájem"
    if (e.target.classList.contains('btn-full')) {
        closeModal(e.target.closest('.modal'));
    }
});

// Podpora pro mobilní "tap" na křížek
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        closeModal(this.closest('.modal'));
    }, { passive: false });
});

// --- 4. ACCORDION (CHYTRÁ HARMONIKA) ---
document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        // Najdeme skupinu, ve které se nacházíme (konkrétní modal)
        const parent = this.closest('.accordion-group');
        const content = this.nextElementSibling;
        const icon = this.querySelector('.acc-icon');

        // 1. Zavřeme všechny ostatní otevřené sekce v tomto modalu
        parent.querySelectorAll('.accordion-content').forEach(otherContent => {
            if (otherContent !== content) {
                otherContent.style.display = "none";
                // Resetujeme ikonky u ostatních tlačítek
                const otherBtn = otherContent.previousElementSibling;
                otherBtn.querySelector('.acc-icon').textContent = '+';
                otherBtn.classList.remove("active");
            }
        });

        // 2. Přepneme (otevřeme/zavřeme) tu, na kterou jsme klikli
        this.classList.toggle("active");
        if (content.style.display === "block") {
            content.style.display = "none";
            icon.textContent = '+';
        } else {
            content.style.display = "block";
            icon.textContent = '−';
        }
    });
});

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

// --- OVLÁDÁNÍ MOBILNÍHO MENU ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Zavření menu po kliknutí na odkaz
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// --- LIGHTBOX PRO BANNER ---
function openLightbox() {
    document.getElementById('lightbox').classList.add('active');
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}