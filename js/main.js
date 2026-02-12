// Sami Portfolio - main.js
// Author: Sami
// Description: JS per interazioni e filtro progetti

// Dati card musicali centralizzati
const musicCards = [
  {
    title: 'Dio lodato',
    desc: 'Singolo emozionante tra sogno e realtà.',
    cover: '../assets/photos/cover/Dio_lodato.jpeg',
    audio: 'audio/dio_lodat_provin.mp3',
    type: 'singolo',
  },
  {
    title: 'Laggiù',
    desc: 'Album di sonorità profonde e testi intensi.',
    cover: '../assets/photos/cover/Laggiu.jpeg',
    audio: 'audio/laggiu_provin.mp3',
    type: 'singolo',
  },
  {
    title: 'Cruda freestyle 1',
    desc: 'Singolo delicato e luminoso.',
    cover: '../assets/photos/cover/Crack_freesstyle.jpeg',
    audio: 'audio/crack_freestyle.mp3',
    type: 'singolo',
  },
  {
    title: 'Cruda freestyle 2',
    desc: 'Album che illumina la scena musicale.',
    cover: '../assets/photos/cover/Cruda_freestyle_2.jpeg',
    audio: 'audio/cruda_freestyle_2.mp3',
    type: 'singolo',
  },
];

// Funzione per generare card HTML
function createMusicCard(card, highlight = false) {
  // Percorsi compatibili con GitHub Pages e Live Server
  const repo = 'Sami-Portfolio';
  const isGithubPages = window.location.hostname.endsWith('github.io');
  let audioSrc = card.audio;
  let coverSrc = card.cover;
  if (isGithubPages) {
    audioSrc = `/${repo}/${card.audio}`;
    coverSrc = `/${repo}/${card.cover.replace(/^\.\./, '')}`;
  } else if (window.location.pathname.includes('/html/')) {
    audioSrc = '../' + card.audio;
    coverSrc = card.cover;
  }
  return `
    <article class="card${highlight ? ' card--highlight' : ''}" data-type="${card.type}">
      <img src="${coverSrc}" alt="Copertina ${card.title}" class="card__cover" width="320" height="320">
      <div class="card__body">
        <h3 class="card__title">${card.title}</h3>
        <p class="card__desc">${card.desc}</p>
        <audio controls preload="none">
          <source src="${audioSrc}" type="audio/mpeg">
          Il tuo browser non supporta l'audio.
        </audio>
      </div>
    </article>
  `;
}

// Render card in homepage (index.html)

// Rileva pagina corrente
const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';
const isProjects = window.location.pathname.endsWith('projects.html');

const highlightsGrid = document.querySelector('.highlights__grid');
if ((isIndex || isProjects) && highlightsGrid) {
  highlightsGrid.innerHTML = musicCards.map(card => createMusicCard(card, true)).join('');
  enableAudioCardAnimation(highlightsGrid);
  enableTrackModal(highlightsGrid);
}

// Funzione: bordo animato su card in riproduzione audio
function enableAudioCardAnimation(container) {
  const allAudio = container.querySelectorAll('audio');
  allAudio.forEach(audio => {
    audio.addEventListener('play', () => {
      // Metti in pausa tutti gli altri audio
      allAudio.forEach(other => {
        if (other !== audio) other.pause();
      });
      container.querySelectorAll('.card').forEach(card => card.classList.remove('card--playing'));
      audio.closest('.card').classList.add('card--playing');
    });
    audio.addEventListener('pause', () => {
      audio.closest('.card').classList.remove('card--playing');
    });
    audio.addEventListener('ended', () => {
      audio.closest('.card').classList.remove('card--playing');
    });
  });
}

// Modal dettaglio brano (index.html e projects.html)
function enableTrackModal(container) {
  const modal = document.getElementById('track-modal');
  if (!modal) return;
  const modalBody = modal.querySelector('.track-modal__body');
  const closeBtn = modal.querySelector('.track-modal__close');
  // Apri modal su click card
  container.querySelectorAll('.card').forEach((card, idx) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', e => {
      // Evita apertura se click su audio o controlli
      if (e.target.tagName.toLowerCase() === 'audio' || e.target.closest('audio')) return;
      const cardData = musicCards[idx];
      modalBody.innerHTML = `
        <img src="${cardData.cover}" alt="Copertina ${cardData.title}" style="width:220px;max-width:90vw;border-radius:var(--radius);box-shadow:0 2px 8px var(--color-shadow);margin-bottom:1em;">
        <h2 style="margin:0 0 0.5em 0;font-size:1.5rem;">${cardData.title}</h2>
        <p style="margin:0 0 1em 0;">${cardData.desc}</p>
        <audio controls style="width:100%">
          <source src="${cardData.audio}" type="audio/mpeg">
          Il tuo browser non supporta l'audio.
        </audio>
      `;
      modal.style.display = 'flex';
      setTimeout(() => { modal.focus(); }, 10);
    });
  });
  // Chiudi modal
  function closeModal() { modal.style.display = 'none'; }
  closeBtn.addEventListener('click', closeModal);
  modal.querySelector('.track-modal__overlay').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (modal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) closeModal();
  });
}

// Attiva modal su index e projects (già gestito nella nuova logica)

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

