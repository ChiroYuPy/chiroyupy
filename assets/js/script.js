'use strict';

// ----- UTILITIES -----
const elementToggleFunc = (elem) => elem?.classList.toggle("active");

// ----- SIDEBAR -----
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn?.addEventListener("click", () => elementToggleFunc(sidebar));

// ----- CUSTOM SELECT -----
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
let lastClickedBtn = filterBtn[0]; // bouton actif par défaut

select?.addEventListener("click", () => elementToggleFunc(select));

// ----- FILTER FUNCTION -----
function filterFunc(selectedValue) {
    const value = selectedValue.trim().toLowerCase();
    const items = document.querySelectorAll("[data-filter-item]");
    items.forEach(item => {
        const category = item.dataset.category?.trim().toLowerCase() || "";
        item.classList.toggle("active", value === "tous" || value === category);
    });
}

// ----- BUTTON FILTER EVENTS -----
filterBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        const selectedValue = btn.innerText.trim().toLowerCase();
        if (selectValue) selectValue.innerText = btn.innerText;
        filterFunc(selectedValue);

        lastClickedBtn?.classList.remove("active");
        btn.classList.add("active");
        lastClickedBtn = btn;
    });
});

// ----- SELECT MOBILE EVENTS -----
selectItems.forEach(item => {
    item.addEventListener("click", () => {
        const selectedValue = item.innerText.trim().toLowerCase();
        if (selectValue) selectValue.innerText = item.innerText;
        select?.classList.remove("active");
        filterFunc(selectedValue);

        filterBtn.forEach(btn => {
            if (btn.innerText.trim().toLowerCase() === selectedValue) {
                lastClickedBtn?.classList.remove("active");
                btn.classList.add("active");
                lastClickedBtn = btn;
            }
        });
    });
});

// ----- PAGE NAVIGATION -----
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link, linkIndex) => {
    link.addEventListener("click", () => {
        const linkText = link.innerText.trim().toLowerCase();
        pages.forEach((page, pageIndex) => {
            const isActive = linkText === page.dataset.page;
            page.classList.toggle("active", isActive);
            navigationLinks[pageIndex].classList.toggle("active", isActive);
        });
        window.scrollTo(0, 0);
    });
});

// ----- SKILLS -----
const skillsList = document.getElementById('skills-list');
const skillTemplate = document.getElementById('skill-template');

if (skillsList && skillTemplate) {
    fetch('assets/data/skills.json')
        .then(res => res.json())
        .then(skills => {
            skills.forEach(skill => {
                const clone = skillTemplate.content.cloneNode(true);
                clone.querySelector('h5').innerText = skill.name;
                const dataEl = clone.querySelector('data');
                dataEl.value = skill.level;
                dataEl.innerText = skill.level + "%";
                clone.querySelector('.skill-progress-fill').dataset.level = skill.level + "%";
                skillsList.appendChild(clone);
            });
            animateSkills();
        })
        .catch(err => console.error("Erreur en chargeant les compétences :", err));
}

function animateSkills() {
    document.querySelectorAll('.skill-progress-fill').forEach(fill => {
        const level = fill.dataset.level;
        if (level) fill.style.width = level;
    });
}

// ----- PROJECTS -----
const projectList = document.querySelector('.project-list');
const projectTemplate = document.getElementById('project-template');

if (projectList && projectTemplate) {
    fetch('assets/data/projects.json')
        .then(res => res.json())
        .then(projects => {
            projects.forEach(project => {
                const clone = projectTemplate.content.cloneNode(true);
                const li = clone.querySelector('li');
                li.dataset.category = project.category.toLowerCase();

                const a = li.querySelector('a');
                a.href = project.link;
                a.target = "_blank";
                a.rel = "noopener noreferrer";

                const img = li.querySelector('img');
                img.src = project.image;
                img.alt = project.title;

                li.querySelector('.project-title').innerText = project.title;
                li.querySelector('.project-category').innerText = project.category;
                li.querySelector('.project-description').innerText = project.description;

                const tagsDiv = li.querySelector('.project-tags');
                tagsDiv.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

                projectList.appendChild(clone);
            });
            filterFunc("tous");
        })
        .catch(err => console.error("Erreur en chargeant les projets :", err));
}

// ----- TIMELINE -----
fetch('assets/data/timeline.json')
    .then(res => res.json())
    .then(data => {
        const resumeArticle = document.querySelector("article.resume");
        const sectionTemplate = document.getElementById("timeline-section-template");
        const itemTemplate = document.getElementById("timeline-item-template");

        if (!resumeArticle || !sectionTemplate || !itemTemplate) return;

        data.timeline.forEach(sectionData => {
            const sectionClone = sectionTemplate.content.cloneNode(true);
            sectionClone.querySelector("h3").innerText = sectionData.title;

            const ol = sectionClone.querySelector(".timeline-list");
            sectionData.items.forEach(itemData => {
                const itemClone = itemTemplate.content.cloneNode(true);
                itemClone.querySelector(".timeline-item-title").innerText = itemData.title;
                itemClone.querySelector("span").innerText = itemData.period;
                itemClone.querySelector(".timeline-text").innerText = itemData.description;
                ol.appendChild(itemClone);
            });

            const skillsSection = resumeArticle.querySelector("section.skill");
            resumeArticle.insertBefore(sectionClone, skillsSection);
        });
    })
    .catch(err => console.error("Erreur en chargeant le résumé :", err));
