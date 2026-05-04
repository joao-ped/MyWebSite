/* ===========================
   Internacionalização (i18n)
   =========================== */
const translations = {
  pt: {
    nav_about: "Sobre Mim",
    nav_experience: "Experiência",
    nav_skills: "Competências",
    nav_work: "Meu Trabalho",
    nav_contact: "Contato",
    hero_greeting: "Olá, eu sou",
    hero_subtitle: "Desenvolvedor FullStack",
    hero_description:
      "Tenho 19 anos e sou estudante de Ciência da Computação no UNIS-MG. Atualmente trabalho como Desenvolvedor FullStack e Tradutor na Sourei, e possuo experiência anterior na Jaguara Coffee. Busco oportunidades para aplicar meus conhecimentos acadêmicos e contribuir de forma significativa para projetos de tecnologia. Tenho inglês avançado (B2 Cambridge).",
    hero_cta: "Entre em contato",
    hero_projects: "Ver projetos",
    exp_title: "Experiência",
    exp_subtitle: "Minha trajetória profissional",
    exp1_role: "Desenvolvedor FullStack & Tradutor",
    exp1_date: "2024 — Presente",
    exp1_desc:
      "Desenvolvimento de aplicações web fullstack, implementação de funcionalidades front-end e back-end, além de serviços de tradução técnica (PT/EN). Trabalho com React, TypeScript e Python no dia a dia.",
    exp2_role: "Experiência anterior",
    exp2_date: "Anterior a 2024",
    exp2_desc:
      "Atuação em atividades operacionais e administrativas que contribuíram para o desenvolvimento de habilidades de organização, comunicação e trabalho em equipe.",
    exp3_role: "Ciência da Computação",
    exp3_date: "Em andamento",
    exp3_desc:
      "Graduação em Ciência da Computação com foco em desenvolvimento de software, algoritmos e estruturas de dados. Certificado de inglês avançado B2 pela Cambridge.",
    tag_org: "Organização",
    tag_comm: "Comunicação",
    tag_team: "Trabalho em Equipe",
    tag_algo: "Algoritmos",
    tag_english: "Inglês B2",
    skills_title: "Competências",
    skills_subtitle: "Tecnologias que domino",
    work_title: "Meu Trabalho",
    work_subtitle: "Projetos em destaque do GitHub",
    work_loading: "Carregando projetos...",
    work_no_desc: "Sem descrição disponível.",
    work_view: "Ver repositório →",
    contact_title: "Contato",
    contact_subtitle: "Vamos conversar?",
    footer_rights: "Todos os direitos reservados.",
  },
  en: {
    nav_about: "About Me",
    nav_experience: "Experience",
    nav_skills: "Skills",
    nav_work: "My Work",
    nav_contact: "Contact",
    hero_greeting: "Hi, I'm",
    hero_subtitle: "FullStack Developer",
    hero_description:
      "I'm 19 years old and a Computer Science student at UNIS-MG. I currently work as a FullStack Developer and Translator at Sourei, and have previous experience at Jaguara Coffee. I'm looking for opportunities to apply my academic knowledge and contribute meaningfully to technology projects. I have advanced English (B2 Cambridge).",
    hero_cta: "Get in touch",
    hero_projects: "See projects",
    exp_title: "Experience",
    exp_subtitle: "My professional journey",
    exp1_role: "FullStack Developer & Translator",
    exp1_date: "2024 — Present",
    exp1_desc:
      "Fullstack web application development, front-end and back-end feature implementation, as well as technical translation services (PT/EN). Working daily with React, TypeScript, and Python.",
    exp2_role: "Previous experience",
    exp2_date: "Before 2024",
    exp2_desc:
      "Operational and administrative activities that contributed to developing organization, communication, and teamwork skills.",
    exp3_role: "Computer Science",
    exp3_date: "In progress",
    exp3_desc:
      "Computer Science degree focused on software development, algorithms, and data structures. Cambridge B2 advanced English certificate.",
    tag_org: "Organization",
    tag_comm: "Communication",
    tag_team: "Teamwork",
    tag_algo: "Algorithms",
    tag_english: "English B2",
    skills_title: "Skills",
    skills_subtitle: "Technologies I master",
    work_title: "My Work",
    work_subtitle: "Featured projects from GitHub",
    work_loading: "Loading projects...",
    work_no_desc: "No description available.",
    work_view: "View repository →",
    contact_title: "Contact",
    contact_subtitle: "Let's talk?",
    footer_rights: "All rights reserved.",
  },
};

let currentLang = "pt";

/**
 * Aplica as traduções em todos os elementos com data-i18n
 */
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
  document.getElementById("btn-lang").querySelector("span").textContent =
    currentLang === "pt" ? "EN" : "PT";
  document.documentElement.lang = currentLang === "pt" ? "pt-BR" : "en";
}

/* ===========================
   Mobile Menu
   =========================== */
function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

/* ===========================
   GitHub Projects Fetch
   =========================== */
async function fetchProjects() {
  const grid = document.getElementById("projects-grid");
  const loading = document.getElementById("projects-loading");

  try {
    const response = await fetch(
      "https://api.github.com/users/joao-ped/repos?sort=updated&per_page=6"
    );
    const repos = await response.json();

    const projects = repos.filter((repo) => !repo.fork).slice(0, 6);

    if (projects.length === 0) {
      loading.textContent = translations[currentLang].work_no_desc;
      return;
    }

    loading.style.display = "none";

    projects.forEach((repo) => {
      const card = document.createElement("article");
      card.className = "project-card";

      const noDesc = translations[currentLang].work_no_desc;
      const viewText = translations[currentLang].work_view;

      card.innerHTML = `
        <h3 class="project-card__name">${repo.name}</h3>
        <p class="project-card__desc">${repo.description || noDesc}</p>
        ${repo.language ? `<p class="project-card__lang">${repo.language}</p>` : ""}
        <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-card__link">
          ${viewText}
        </a>
      `;

      grid.appendChild(card);
    });
  } catch (error) {
    loading.textContent = "Erro ao carregar projetos.";
    console.error("Error fetching repos:", error);
  }
}

/* ===========================
   Event Listeners & Init
   =========================== */
document.addEventListener("DOMContentLoaded", () => {
  // Botão de idioma
  document.getElementById("btn-lang").addEventListener("click", () => {
    currentLang = currentLang === "pt" ? "en" : "pt";
    applyTranslations();
    // Re-renderiza projetos com novo idioma
    const grid = document.getElementById("projects-grid");
    grid.innerHTML = "";
    const loading = document.getElementById("projects-loading");
    loading.style.display = "block";
    fetchProjects();
  });

  // Menu mobile
  document.getElementById("btn-menu").addEventListener("click", toggleMenu);

  // Fecha menu ao clicar em link
  document.querySelectorAll(".header__nav-list a").forEach((link) => {
    link.addEventListener("click", () => {
      document.getElementById("nav").classList.remove("active");
    });
  });

  // Carrega projetos
  fetchProjects();
});
