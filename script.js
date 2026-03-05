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


const MODALS = {
  priprava: {
    tag: 'Řízení projektu',
    title: 'Příprava stavby',
    subtitle: 'Plánování, dokumentace a zajištění povolení před zahájením prací',
    body: `<p>Každá úspěšná stavba začíná precizní přípravou. Náš tým zajišťuje veškerou předprojektovou dokumentaci, technické studie a komunikaci se státní správou, aby byl zahajovací den co nejhladší.</p>
      <ul class="panel-list">
        <li>Zpracování projektové dokumentace (DUR, DSP, DPS)</li>
        <li>Vyřízení stavebního povolení a veškerých potřebných vyjádření</li>
        <li>Koordinace geodetického zaměření a průzkumů staveniště</li>
        <li>Sestavení podrobného harmonogramu a rozpočtu stavby</li>
        <li>Výběr a smluvní zajištění subdodavatelů</li>
      </ul>
      <p>Díky systematické přípravě minimalizujeme rizika prodlení a vícenákladů ještě před tím, než první bagr najede na staveniště.</p>`
  },
  realizace: {
    tag: 'Řízení projektu',
    title: 'Realizace',
    subtitle: 'Stavební práce vedené zkušeným stavbyvedoucím dle schváleného harmonogramu',
    body: `<p>Ve fázi realizace přebíráme plnou odpovědnost za průběh stavebních prací. Každý den na staveništi je řízen jasnou strukturou velení, pravidelným reportingem a proaktivním řešením odchylek.</p>
      <ul class="panel-list">
        <li>Řízení staveniště certifikovaným stavbyvedoucím</li>
        <li>Denní záznamy o postupu prací a plnění harmonogramu</li>
        <li>Koordinace všech profesí — ZTI, elektro, VZT, statika</li>
        <li>Pravidelné kontrolní dny s investorem</li>
        <li>Přístup investora do online stavebního deníku v reálném čase</li>
      </ul>
      <p>Transparentní komunikace s investorem je pro nás samozřejmostí — žádná překvapení, pouze včasné informace a řešení.</p>`
  },
  kvalita: {
    tag: 'Řízení projektu',
    title: 'Kontrola kvality',
    subtitle: 'Nezávislý technický dozor, inspekce a přejímky hotových prací',
    body: `<p>Kvalita není náhoda — je výsledkem systematické kontroly v každé fázi výstavby. Uplatňujeme třístupňový kontrolní systém, který zachycuje odchylky dříve, než se stanou nákladnými problémy.</p>
      <ul class="panel-list">
        <li>Technický dozor investora (TDI) nezávislý na zhotoviteli</li>
        <li>Vstupní kontrola materiálů a atestů před zabudováním</li>
        <li>Mezioperační zkoušky zakrývaných konstrukcí</li>
        <li>Zátěžové a funkční zkoušky technologií a instalací</li>
        <li>Závěrečná přejímka a předání kompletní dokladové dokumentace</li>
      </ul>
      <p>Výsledkem je stavba, která odpovídá projektové dokumentaci, platným normám a přání investora — bez skrytých vad.</p>`
  },
  bozp: {
    tag: 'Bezpečnost & Compliance',
    title: 'Koordinátor BOZP',
    subtitle: 'Odborný dohled nad bezpečností a ochranou zdraví na staveništi',
    body: `<p>Bezpečnost pracovníků na staveništi je naší nejvyšší prioritou. Náš koordinátor BOZP je přítomen od první projektové porady až po předání stavby a dohlíží na dodržování všech předpisů.</p>
      <ul class="panel-list">
        <li>Zpracování Plánu BOZP dle zákona č. 309/2006 Sb.</li>
        <li>Pravidelné bezpečnostní prohlídky staveniště</li>
        <li>Vstupní školení pracovníků a vedení evidencí</li>
        <li>Šetření mimořádných událostí a nastavení nápravných opatření</li>
        <li>Komunikace s Inspektorátem bezpečnosti práce (IBP)</li>
      </ul>
      <p>Za dobu naší existence jsme dosáhli výrazně nižší úrazovosti, než je průměr oboru — na čem si zakládáme a co neustále zlepšujeme.</p>`
  },
  legal: {
    tag: 'Bezpečnost & Compliance',
    title: 'Právní & Compliance',
    subtitle: 'Smluvní zajištění, normové požadavky a certifikace procesů',
    body: `<p>Stavebnictví je silně regulované odvětví. Náš compliance tým zajišťuje, že každý projekt splňuje aktuální legislativní požadavky, a chrání tak zájmy investora i zhotovitele.</p>
      <ul class="panel-list">
        <li>Příprava a revize smluv o dílo (SoD) a podmínek FIDIC</li>
        <li>Průběžné sledování změn legislativy — stavební zákon, NV, vyhlášky</li>
        <li>Správa certifikací ISO 9001, ISO 14001, ISO 45001</li>
        <li>Due diligence subdodavatelů a správa smluvních závazků</li>
        <li>Řešení sporů, reklamací a záručních vad</li>
      </ul>
      <p>Proaktivní přístup k compliance snižuje riziko pokut, sporů a reputačních škod — investice do právní jistoty se vždy vyplatí.</p>`
  }
};

const overlay = document.getElementById('overlay');
const panelContent = document.getElementById('panelContent');
const panel = document.getElementById('panel');

function openModal(key) {
  const d = MODALS[key];
  if (!d) return;
  panelContent.innerHTML = `
    <div class="panel-tag">${d.tag}</div>
    <div class="panel-title" id="panelTitle">${d.title}</div>
    <div class="panel-subtitle">${d.subtitle}</div>
    <div class="panel-body">${d.body}</div>
  `;
  panel.scrollTop = 0;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.box-clickable').forEach(b =>
  b.addEventListener('click', () => openModal(b.dataset.modal))
);
document.getElementById('btnClose').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });