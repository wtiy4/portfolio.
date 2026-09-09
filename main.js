const projects = [
  {
    title: "Nova Store",
    desc: "Futuristic Visual Aesthetic: Designed with a clean, dark/light mode adaptable layout utilizing modern typography and subtle glassmorphism elements.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "./projects_imgs/nova.png",
    link: "https://novasmarket.netlify.app/",
  },
  {
    title: "Trip Agency Clone",
    desc: "A modern travel agency website designed to showcase destinations, services, and travel experiences with a clean and responsive interface.",
    tags: ["React", "TypeScript", "Tailwind"],
    image: "./projects_imgs/trip_agency.png",
    link: "https://tailwind-hw-8pl8.onrender.com/",
  },
  {
    title: "Currency Converter",
    desc: "A dynamic web application designed to provide users with instant, accurate currency exchange calculations. This project focuses on seamless API integration, efficient state management, and an intuitive, accessible user experience.",
    tags: ["React", "Tailwind"],
    image: "./projects_imgs/currency.png",
    link: "https://currency-conveerter.netlify.app/",
  },

  {
    title: "Rick and Morty Characters API",
    desc: "An interactive character explorer that uses the Rick and Morty API to fetch and display character information with a clean, responsive interface.",
    tags: ["React", "Tailwind", "REST API"],
    image: "./projects_imgs/rick.png",
    link: "https://rick-n-morty-lab.onrender.com/",
  },
  {
    title: "Space Interactive Timeline",
    desc: "An interactive space-themed timeline that presents information about space exploration through an engaging visual layout and smooth user experience.",
    tags: ["React", "Tailwind"],
    image: "./projects_imgs/space.png",
    link: "https://wtiy4.github.io/Space-project/",
  },
  {
    title: "YouTube Clone",
    desc: "A YouTube-inspired video platform that fetches content from an external API and presents videos, categories, and content in a familiar responsive interface.",
    tags: ["React", "Tailwind", "REST API"],
    image: "./projects_imgs/you.png",
    link: "https://youtube-ubgf.onrender.com/",
  },
  {
    title: "Employment Forum",
    desc: "A community-focused employment platform where users can explore and interact with job-related content through a simple and responsive interface.",
    tags: ["React", "Tailwind", "REST API"],
    image: "./projects_imgs/work.png",
    link: "https://usestate-hw.onrender.com/",
  },
  {
    title: "Captcha Check",
    desc: "A lightweight CAPTCHA verification interface designed to demonstrate user validation and interactive form handling with a clean, minimal UI.",
    tags: ["React", "Tailwind"],
    image: "./projects_imgs/captcha.png",
    link: "https://stunning-nougat-a126e9.netlify.app",
  },
  {
    title: "Hue Palette",
    desc: "An interactive color exploration app that generates and displays different shades of a selected hue, making it easy to discover and work with beautiful color variations.",
    tags: ["React", "Tailwind"],
    image: "./projects_imgs/hue.png",
    link: "https://snazzy-syrniki-93af3a.netlify.app/",
  },
  {
    title: "Call of Duty Website Clone",
    desc: "A responsive Call of Duty-inspired website featuring a bold gaming interface, immersive visuals, and interactive sections built for a modern gaming experience.",
    tags: ["React", "Tailwind"],
    image: "./projects_imgs/cod.png",
    link: "https://cod-weekend-project.onrender.com/",
  },
];

const roles = [
  "Software Developer",
  "React & Next.js Developer",
  "UI/UX-Minded Engineer",
];

const fallbackGradients = [
  "linear-gradient(140deg,#3a3f6b,#1b1d33)",
  "linear-gradient(140deg,#6b3a45,#331b22)",
  "linear-gradient(140deg,#3a6b52,#1b3327)",
  "linear-gradient(140deg,#6b5a3a,#33291b)",
];

// ---------- Render project cards from the array above ----------
function renderProjects() {
  const grid = document.getElementById("projGrid");
  if (!grid) {
    console.error("projGrid element not found — check the id in the HTML");
    return;
  }
  grid.innerHTML = projects
    .map((p, i) => {
      const bg = p.image
        ? `background-image:url('${p.image}')`
        : `background:${fallbackGradients[i % fallbackGradients.length]}`;
      return `
      <div class="proj-card reveal">
        <div class="proj-thumb" style="${bg}"></div>
        <div class="proj-body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="proj-tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
          <a class="proj-link" href="${p.link}" target="_blank" rel="noopener">View project
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M9 7h8v8"/></svg>
          </a>
        </div>
      </div>`;
    })
    .join("");
}

// ---------- Typewriter cycling roles ----------
const roleEl = document.getElementById("roleText");
let r = 0,
  c = 0,
  deleting = false;

function tick() {
  const word = roles[r];
  if (!deleting) {
    c++;
    roleEl.textContent = word.slice(0, c);
    if (c === word.length) {
      deleting = true;
      setTimeout(tick, 1500);
      return;
    }
  } else {
    c--;
    roleEl.textContent = word.slice(0, c);
    if (c === 0) {
      deleting = false;
      r = (r + 1) % roles.length;
      setTimeout(tick, 350);
      return;
    }
  }
  setTimeout(tick, deleting ? 35 : 62);
}
tick();

// ---------- Staggered entrance reveal ----------
function revealAll(selector, root, delayStep) {
  const els = (root || document).querySelectorAll(selector);
  els.forEach((el) => el.classList.remove("in"));
  requestAnimationFrame(() => {
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add("in"), i * delayStep);
    });
  });
}

revealAll(".reveal", document.getElementById("mainGrid"), 55);

// ---------- In-page project view (3D flip, no navigation) ----------
const mainGrid = document.getElementById("mainGrid");
const projectView = document.getElementById("projectView");
const flipInner = document.getElementById("flipInner");
const openBtn = document.getElementById("openProjects");
const closeBtn = document.getElementById("closeProjects");

function openProjects() {
  flipInner.classList.add("flipped");
  revealAll(".proj-card", projectView, 80);
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function closeProjects() {
  flipInner.classList.remove("flipped");
  revealAll(".reveal", mainGrid, 40);
}

openBtn.addEventListener("click", openProjects);
openBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openProjects();
  }
});
closeBtn.addEventListener("click", closeProjects);

// ---------- Playable tool icons ----------
document.querySelectorAll(".tool").forEach((tool) => {
  function play() {
    tool.classList.remove("playing");
    void tool.offsetWidth;
    tool.classList.add("playing");
  }
  tool.addEventListener("click", play);
  tool.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      play();
    }
  });
});

// ---------- Subtle cursor-reactive tilt (mouse only, never on touch) ----------
const wrapInner = document.querySelector(".wrap-inner");

function gridTilt(e) {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;
  wrapInner.style.transform = `rotateY(${x * 3.5}deg) rotateX(${-y * 3.5}deg)`;
}

if (
  wrapInner &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {
  window.addEventListener("mousemove", gridTilt);
  window.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget) {
      wrapInner.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
  });
}

// ---------- Keep the flip card's height locked to the front page ----------
function syncFlipHeight() {
  const h = mainGrid.offsetHeight;
  flipInner.style.height = h + "px";
  const backRow = projectView.querySelector(".back-row");
  const projGridEl = document.getElementById("projGrid");
  if (backRow && projGridEl) {
    const available = h - backRow.offsetHeight - 24;
    projGridEl.style.maxHeight = Math.max(available, 160) + "px";
  }
}

// ---------- Boot ----------
renderProjects();
syncFlipHeight();

const ro = new ResizeObserver(() => syncFlipHeight());
ro.observe(mainGrid);

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(syncFlipHeight);
}
window.addEventListener("resize", syncFlipHeight);
