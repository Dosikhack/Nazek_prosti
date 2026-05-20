/* ============================================================
   Назек кешіресіңбе? 🫶  —  interactions
   Pure vanilla JS. No frameworks.
============================================================ */
(() => {
  "use strict";

  const yesBtn   = document.getElementById("yesBtn");
  const noBtn    = document.getElementById("noBtn");
  const hint     = document.getElementById("hint");
  const finale   = document.getElementById("finale");
  const againBtn = document.getElementById("againBtn");
  const heartsEl = document.getElementById("hearts");
  const reduce   = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------------------------
     1. Floating hearts in the background
  ------------------------------------------------- */
  const HEART_CHARS = ["💖", "💕", "🩷", "💗", "🫶", "✨"];

  function spawnHeart() {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = HEART_CHARS[(Math.random() * HEART_CHARS.length) | 0];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = 0.9 + Math.random() * 1.8 + "rem";
    const dur = 7 + Math.random() * 8;
    h.style.animationDuration = dur + "s";
    h.style.opacity = "1";
    heartsEl.appendChild(h);
    setTimeout(() => h.remove(), dur * 1000 + 200);
  }

  if (!reduce) {
    for (let i = 0; i < 8; i++) setTimeout(spawnHeart, i * 600);
    setInterval(spawnHeart, 900);
  }

  /* -------------------------------------------------
     2. Runaway "Жоқ" button + growing "Иә" button
  ------------------------------------------------- */
  let dodgeCount = 0;
  let yesScale   = 1;

  const TAUNTS = [
    "* «Жоқ» батырмасын басып көрші 😉",
    "ұстай алмайсың 😄",
    "сондай ма? 🙃",
    "тырыса бер 💨",
    "болмайды-болмайды 🫣",
    "тек «Иә» 💖",
    "жетеді ғой 😭➡️💖",
  ];

  function moveNoButton() {
    // promote to fixed positioning on first dodge
    if (!noBtn.classList.contains("runaway")) {
      const r = noBtn.getBoundingClientRect();
      noBtn.classList.add("runaway");
      noBtn.style.width = r.width + "px";
      noBtn.style.height = r.height + "px";
      noBtn.style.left = r.left + "px";
      noBtn.style.top  = r.top + "px";
    }

    const pad = 16;
    const w = noBtn.offsetWidth;
    const h = noBtn.offsetHeight;
    const maxX = Math.max(pad, window.innerWidth  - w - pad);
    const maxY = Math.max(pad, window.innerHeight - h - pad);

    const x = pad + Math.random() * (maxX - pad);
    const y = pad + Math.random() * (maxY - pad);

    noBtn.style.left = x + "px";
    noBtn.style.top  = y + "px";
    noBtn.style.transform =
      "rotate(" + (Math.random() * 30 - 15) + "deg) scale(" +
      (0.82 + Math.random() * 0.12) + ")";

    // grow the Yes button each time
    dodgeCount++;
    yesScale = Math.min(yesScale + 0.18, 3.2);
    yesBtn.style.setProperty("--yes-scale", yesScale.toFixed(2));

    hint.textContent = TAUNTS[Math.min(dodgeCount, TAUNTS.length - 1)];

    // little pop on the Yes button
    yesBtn.animate(
      [{ filter: "brightness(1.4)" }, { filter: "brightness(1)" }],
      { duration: 350, easing: "ease-out" }
    );
  }

  // dodge on hover (desktop) and on touch/click (mobile)
  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("click", (e) => { e.preventDefault(); moveNoButton(); });
  noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveNoButton(); }, { passive: false });

  // keep it on-screen if the window resizes
  window.addEventListener("resize", () => {
    if (!noBtn.classList.contains("runaway")) return;
    const w = noBtn.offsetWidth, h = noBtn.offsetHeight, pad = 16;
    const left = Math.min(parseFloat(noBtn.style.left) || 0, window.innerWidth  - w - pad);
    const top  = Math.min(parseFloat(noBtn.style.top)  || 0, window.innerHeight - h - pad);
    noBtn.style.left = Math.max(pad, left) + "px";
    noBtn.style.top  = Math.max(pad, top) + "px";
  });

  /* -------------------------------------------------
     3. Confetti engine for the finale
  ------------------------------------------------- */
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  let confetti = [];
  let rafId = null;
  const COLORS = ["#ff5fa2", "#ff8fc4", "#a855f7", "#ffd166", "#ffffff", "#ff3d81"];

  function sizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function launchConfetti() {
    sizeCanvas();
    confetti = [];
    const count = reduce ? 40 : 180;
    for (let i = 0; i < count; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.5,
        r: 4 + Math.random() * 7,
        c: COLORS[(Math.random() * COLORS.length) | 0],
        vx: -2 + Math.random() * 4,
        vy: 2 + Math.random() * 4,
        rot: Math.random() * Math.PI,
        vr: -0.2 + Math.random() * 0.4,
        shape: Math.random() > 0.45 ? "rect" : "heart",
      });
    }
    if (rafId) cancelAnimationFrame(rafId);
    drawConfetti();
  }

  function heartPath(c, x, y, s) {
    c.beginPath();
    c.moveTo(x, y + s * 0.3);
    c.bezierCurveTo(x, y, x - s, y, x - s, y + s * 0.4);
    c.bezierCurveTo(x - s, y + s * 0.8, x, y + s, x, y + s * 1.2);
    c.bezierCurveTo(x, y + s, x + s, y + s * 0.8, x + s, y + s * 0.4);
    c.bezierCurveTo(x + s, y, x, y, x, y + s * 0.3);
    c.closePath();
    c.fill();
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of confetti) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.rot += p.vr;
      if (p.y < canvas.height + 40) alive = true;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      if (p.shape === "rect") {
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
      } else {
        heartPath(ctx, 0, -p.r / 2, p.r * 0.6);
      }
      ctx.restore();
    }
    if (alive) rafId = requestAnimationFrame(drawConfetti);
  }

  function burstHearts() {
    if (reduce) return;
    for (let i = 0; i < 24; i++) {
      setTimeout(() => {
        const h = document.createElement("span");
        h.className = "heart";
        h.textContent = HEART_CHARS[(Math.random() * 4) | 0];
        h.style.left = Math.random() * 100 + "vw";
        h.style.fontSize = 1.4 + Math.random() * 2 + "rem";
        const dur = 4 + Math.random() * 4;
        h.style.animationDuration = dur + "s";
        heartsEl.appendChild(h);
        setTimeout(() => h.remove(), dur * 1000 + 200);
      }, i * 90);
    }
  }

  /* -------------------------------------------------
     4. Show / hide the finale
  ------------------------------------------------- */
  function showFinale() {
    finale.classList.add("show");
    finale.setAttribute("aria-hidden", "false");
    launchConfetti();
    burstHearts();
  }

  function resetAll() {
    finale.classList.remove("show");
    finale.setAttribute("aria-hidden", "true");
    if (rafId) cancelAnimationFrame(rafId);

    // reset buttons
    yesScale = 1;
    dodgeCount = 0;
    yesBtn.style.setProperty("--yes-scale", "1");
    noBtn.classList.remove("runaway");
    noBtn.removeAttribute("style");
    hint.textContent = TAUNTS[0];
  }

  yesBtn.addEventListener("click", showFinale);
  againBtn.addEventListener("click", resetAll);
  window.addEventListener("resize", () => { if (finale.classList.contains("show")) sizeCanvas(); });
})();
