// Sami Portfolio - main.js
// Author: Sami
// Description: JS per interazioni e filtro progetti

// Dati card musicali centralizzati
const musicCards = [
  {
    title: 'Dio lodato',
    desc: 'Singolo emozionante tra sogno e realtà.',
    cover: 'assets/images/project1.jpg',
    audio: 'audio/dio lodat provin.mp3.mpeg',
    type: 'singolo',
  },
  {
    title: 'Laggiù',
    desc: 'Album di sonorità profonde e testi intensi.',
    cover: 'assets/images/project2.jpg',
    audio: 'audio/laggiu provin.mp3.mpeg',
    type: 'singolo',
  },
  {
    title: 'Cruda freestyle 1',
    desc: 'Singolo delicato e luminoso.',
    cover: 'assets/images/project4.jpg',
    audio: 'audio/crack freestyle .mp3.mpeg',
    type: 'singolo',
  },
  {
    title: 'Cruda freestyle 2',
    desc: 'Album che illumina la scena musicale.',
    cover: 'assets/images/project5.jpg',
    audio: 'audio/cruda freestyle 2.mp3.mpeg',
    type: 'singolo',
  },
];

// Funzione per generare card HTML
function createMusicCard(card, highlight = false) {
  return `
    <article class="card${highlight ? ' card--highlight' : ''}" data-type="${card.type}">
      <img src="${card.cover}" alt="Copertina ${card.title}" class="card__cover" width="320" height="320">
      <div class="card__body">
        <h3 class="card__title">${card.title}</h3>
        <p class="card__desc">${card.desc}</p>
        <audio controls preload="none">
          <source src="${card.audio}" type="audio/mpeg">
          Il tuo browser non supporta l'audio.
        </audio>
      </div>
    </article>
  `;
}

// Render card in homepage (index.html)
const highlightsGrid = document.querySelector('.highlights__grid');
if (highlightsGrid) {
  highlightsGrid.innerHTML = musicCards.map(card => createMusicCard(card, true)).join('');
}

// Render card in projects.html
const projectsGrid = document.querySelector('.projects-grid__container');
if (projectsGrid) {
  projectsGrid.innerHTML = musicCards.map(card => createMusicCard(card)).join('');
}

// Animazione fade-in al caricamento
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card, .hero__content, .about__container, .highlights__header, .projects-header__title, .projects-header__filter, .projects-grid__container').forEach(el => {
    el.classList.add('fade-in');
  });
});

// Filtro progetti (Projects page)
const filterBtns = document.querySelectorAll('.filter__btn');
function updateProjectFilter() {
  const projectCards = document.querySelectorAll('.projects-grid__container .card');
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('filter__btn--active'));
        btn.classList.add('filter__btn--active');
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-type') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
}
updateProjectFilter();

// Accessibilità: focus su bottoni
filterBtns.forEach(btn => {
  btn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      btn.click();
    }
  });
});

// Animazione fade-in (aggiunta classe)
// CSS gestisce l'animazione tramite la classe fade-in
