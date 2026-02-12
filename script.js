// Valentine donut page interactions

window.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("no-btn");
  const yesBtn = document.getElementById("yes-btn");
  const buttonsWrap = document.getElementById("buttons-wrap");

  if (!noBtn || !yesBtn || !buttonsWrap) return;

  // Messages for each "No" press (customize these)
  const noMessages = [
    "Wait... did my donut really just say no? 🍩🥺",
    "Shedda ath moshamaayi poyi nyan oru paavam alle 😔",
    "Ennod vella viroodham ondengil nammalk solve cheyyam 🥺",
    "Nyan nooru kanakki kilometre oodikkarollathalle ninnekk vendi 😭",
    "Ninte 🏹 alleda nyan? 🥺",
    "Aa pink shoes kollam ketto....",
    "Nee aa his._.donut account il poyi rand reel kandey. Appo utharam maarum 🥺",
    "Nyan penangi ketto 😔",
    "Appo athreyullu nammallokke alle 😓",
    "Hmmmmmm..... ninte shuttamani alleda. Depression aakalle 😔",
    "Nee ivide No kuthi kallicho ath orikyellum nilkilla. ILLA PENNE NYAN VIDILLA PONNEE..🎶😏",
  ];

  let noClickCount = 0;

  function showNoMessage() {
    const index = Math.min(noClickCount, noMessages.length - 1);
    const message = noMessages[index];
    // Simple prompt style (can be swapped to a custom modal later)
    alert(message);
  }

  // Ensure the "No" button starts near the right of the Yes button
  const initRect = buttonsWrap.getBoundingClientRect();
  noBtn.style.left = `${initRect.width * 0.65}px`;
  noBtn.style.top = `${initRect.height * 0.15}px`;

  function getRandomPositionForNo() {
    const wrapRect = buttonsWrap.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = wrapRect.width - btnRect.width - 8;
    const maxY = wrapRect.height - btnRect.height - 6;

    const minX = 8;
    const minY = 4;

    const randomX = minX + Math.random() * Math.max(maxX - minX, 10);
    const randomY = minY + Math.random() * Math.max(maxY - minY, 10);

    return { x: randomX, y: randomY };
  }

  function moveNoButton() {
    const { x, y } = getRandomPositionForNo();
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  }

  // Move "No" button on every click and show a message
  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveNoButton();
    showNoMessage();
    noClickCount += 1;
  });

  // Extra: also dodge on hover for desktop
  noBtn.addEventListener("pointerenter", () => {
    // Tiny delay so touch users aren't blocked
    if (window.matchMedia("(pointer: fine)").matches) {
      moveNoButton();
    }
  });

  // Confetti celebration when clicking "Yes"
  yesBtn.addEventListener("click", () => {
    if (typeof confetti !== "function") return;

    const duration = 2200;
    const animationEnd = Date.now() + duration;

    const defaults = {
      colors: ["#ff4b6a", "#ffb347", "#ffe1eb", "#ffffff"],
      ticks: 200,
      scalar: 1.1,
    };

    const frame = () => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) return;

      const particleCount = Math.round(80 * (timeLeft / duration) + 25);

      // Left burst
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0.1, y: 0.7 },
        spread: 70,
        angle: 60,
      });

      // Right burst
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0.9, y: 0.7 },
        spread: 70,
        angle: 120,
      });

      // Donut sprinkle burst from the center
      confetti({
        ...defaults,
        particleCount: Math.round(particleCount * 0.6),
        origin: { x: 0.5, y: 0.4 },
        spread: 360,
        scalar: 1.3,
        shapes: ["circle"],
      });

      requestAnimationFrame(frame);
    };

    frame();

    // Cute text change after "Yes"
    yesBtn.textContent = "You said yes! 🍩❤️";
    noBtn.textContent = "Too late 😉";
    noBtn.disabled = true;
  });
});
