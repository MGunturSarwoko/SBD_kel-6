const navToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.site-nav');
const yearNode = document.getElementById('year');
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalImage = document.getElementById('modal-image');
const modalCategory = document.getElementById('modal-category');
const modalTitle = document.getElementById('modal-title');
const modalMeta = document.getElementById('modal-meta');
const modalDescription = document.getElementById('modal-description');
const modalContribution = document.getElementById('modal-contribution');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    nav.classList.toggle('is-open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function openModal(projectData) {
  if (!modal || !projectData) return;

  modalCategory.textContent = projectData.category;
  modalTitle.textContent = projectData.title;
  modalImage.src = 'assets/project-placeholder.svg';
  modalImage.alt = `Placeholder proyek ${projectData.title}`;
  modalMeta.innerHTML = '';

  const items = [
    projectData.period,
    projectData.description,
    'Kontribusi: ' + projectData.contribution,
  ];

  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    modalMeta.appendChild(li);
  });

  modalDescription.textContent = projectData.description;
  modalContribution.textContent = 'Kontribusi: ' + projectData.contribution;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.project-button').forEach((button) => {
  button.addEventListener('click', () => {
    openModal({
      title: button.dataset.title,
      category: button.dataset.category,
      period: button.dataset.period,
      description: button.dataset.description,
      contribution: button.dataset.contribution,
    });
  });
});

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && modal.classList.contains('is-open')) {
    closeModal();
  }
});
