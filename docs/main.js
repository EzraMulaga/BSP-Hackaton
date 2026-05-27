const REVEAL_THRESHOLD = 0.16;
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: REVEAL_THRESHOLD }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
if (window.lucide) window.lucide.createIcons();
