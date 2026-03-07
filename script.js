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

// --- 3. OVLÁDÁNÍ MOBILNÍHO MENU ---
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

       function toggleSubButtons(id) {
            const container = document.getElementById(id);
            container.classList.toggle('active');
        }

        function openModal(modalName) {
            const modal = document.getElementById('modal-' + modalName);
            modal.style.display = 'block';
        }

        function closeModal(modalName) {
            const modal = document.getElementById('modal-' + modalName);
            modal.style.display = 'none';
        }

        // Zavřít modal při kliknutí mimo něj
        window.onclick = function(event) {
            const modals = document.getElementsByClassName('modal');
            for (let modal of modals) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            }
        }