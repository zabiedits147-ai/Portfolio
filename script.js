// ---------- Data ----------
const projects = [
  {
    title: "TradeHub PK",
    desc: "AI-integrated local wholesale ecosystem app — Final Year Project. Live bidding with escrow, digital khata, real-time chat, AI sales predictor, AI visual search, and collaborative pool buying.",
    stack: ["React Native", "Node.js", "MongoDB", "Socket.io", "Python/Flask"]
  },
  {
    title: "FinTech Manager",
    desc: "Personal finance manager app with SVG donut charts, biometric/PIN lock, and a custom animated login screen.",
    stack: ["React Native", "Context API", "AsyncStorage"]
  },
  {
    title: "Mini Shopping Cart App",
    desc: "7-screen shopping app with a floating tab bar, cart context, and full theming support.",
    stack: ["React Native", "Context API"]
  }
];

const skillGroups = [
  { title: "SEO & Web", items: ["On-Page SEO", "Meta Tags & Schema", "Google Search Console", "Sitemap/robots.txt"] },
  { title: "Mobile", items: ["React Native", "JSX", "AsyncStorage", "Push/Biometrics"] },
  { title: "Backend", items: ["Node.js", "Express", "Socket.io", "MongoDB"] },
  { title: "AI / Data", items: ["Python", "Flask", "Prophet", "OpenCV"] },
  { title: "Tools", items: ["Git", "Postman", "VS Code"] }
];

// ---------- Render projects (only if this page has the container) ----------
const projectList = document.getElementById("project-list");
if (projectList) {
  projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card tilt-el";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="stack-tags">${p.stack.map(s => `<span>${s}</span>`).join("")}</div>
    `;
    projectList.appendChild(card);
  });
}

// ---------- Render skills (only if this page has the container) ----------
const skillContainer = document.getElementById("skill-groups");
if (skillContainer) {
  skillGroups.forEach(g => {
    const group = document.createElement("div");
    group.className = "skill-group tilt-el";
    group.innerHTML = `
      <h4>${g.title}</h4>
      <ul>${g.items.map(i => `<li>${i}</li>`).join("")}</ul>
    `;
    skillContainer.appendChild(group);
  });
}

// ---------- Typing effect (hero status line — only on homepage) ----------
const statusText = document.getElementById("status-text");
if (statusText) {
  const statusMessage = "Currently building TradeHub PK";
  let charIndex = 0;
  function typeStatus() {
    if (charIndex <= statusMessage.length) {
      statusText.textContent = statusMessage.slice(0, charIndex);
      charIndex++;
      setTimeout(typeStatus, 40);
    }
  }
  typeStatus();
}

// ---------- 3D tilt on hover ----------
function applyTilt(el, maxTilt = 8) {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((y - midY) / midY) * -maxTilt;
    const rotateY = ((x - midX) / midX) * maxTilt;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
  });
}
document.querySelectorAll(".tilt-el, .hero-tilt").forEach(el => applyTilt(el));

// ---------- Theme toggle ----------
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) html.setAttribute("data-theme", savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", current);
    localStorage.setItem("theme", current);
  });
}

// ---------- 3D scroll reveal ----------
document.querySelectorAll("h2, .about-grid, .project-card, .skill-group, .contact-link")
  .forEach(el => el.classList.add("reveal-3d"));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal-3d").forEach(el => revealObserver.observe(el));