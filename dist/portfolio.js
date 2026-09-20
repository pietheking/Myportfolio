'use strict';

const destinations = window.portfolioProjects || {};
document.querySelectorAll('[data-project]').forEach((link) => {
  const destination = destinations[link.dataset.project];
  if (!destination) return;
  // Only explicit HTTP destinations may turn a project preview into an external link.
  let url;
  try { url = new URL(destination); } catch { return; }
  if (!['http:', 'https:'].includes(url.protocol)) return;
  link.href = url.href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.removeAttribute('aria-disabled');
  if (link.dataset.project === 'language') {
    link.setAttribute('aria-label', 'Open the language app in a new tab');
    if (link.hasAttribute('data-language-cta')) link.innerHTML = 'Open language app <span aria-hidden="true">↗</span>';
    const previewLabel = link.querySelector('[data-language-label]');
    if (previewLabel) previewLabel.innerHTML = 'Explore the language app <span>↗</span>';
  }
});

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle = document.getElementById('motion-toggle');
let paused = motionPreference.matches;
try { paused = paused || localStorage.getItem('portfolio-motion') === 'paused'; } catch { /* Storage may be unavailable in private browsing; the control still works for this visit. */ }
function updateMotion() {
  document.documentElement.dataset.motion = paused ? 'paused' : 'running';
  motionToggle.setAttribute('aria-pressed', String(paused));
  motionToggle.innerHTML = paused ? 'Resume motion <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
}
motionToggle.hidden = motionPreference.matches;
updateMotion();
motionToggle.addEventListener('click', () => {
  paused = !paused;
  updateMotion();
  try { localStorage.setItem('portfolio-motion', paused ? 'paused' : 'running'); } catch { /* Persistence is optional; never prevent the animation control from responding. */ }
});
motionPreference.addEventListener('change', (event) => {
  paused = event.matches;
  motionToggle.hidden = event.matches;
  updateMotion();
});

// Animate each project once when it enters view; unsupported browsers simply show it.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (!paused) entry.target.classList.add('is-entering');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.project').forEach((project) => observer.observe(project));
}
