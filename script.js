document.querySelectorAll(".card").forEach((card, index) => {
  card.style.animationDelay = `${index * 120}ms`;
  card.classList.add("reveal");
});
