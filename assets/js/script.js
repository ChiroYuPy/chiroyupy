'use strict';

// ===== CONFIGURATION =====
const CONFIG = {
    dataPath: './assets/data/',
    animationDuration: 300,
    scrollBehavior: 'smooth'
};

// ===== UTILITIES =====
const Utils = {
    toggleClass(elem, className = 'active') {
        elem?.classList.toggle(className);
    },

    addClass(elem, className) {
        elem?.classList.add(className);
    },

    removeClass(elem, className) {
        elem?.classList.remove(className);
    },

    async fetchJSON(filename) {
        try {
            const response = await fetch(`${CONFIG.dataPath}${filename}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Erreur lors du chargement de ${filename}:`, error);
            return null;
        }
    },

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: CONFIG.scrollBehavior });
    },

    createElement(template) {
        return template.content.cloneNode(true);
    }
};

// ===== SIDEBAR MODULE =====
const Sidebar = {
    init() {
        const sidebar = document.querySelector('[data-sidebar]');
        const sidebarBtn = document.querySelector('[data-sidebar-btn]');

        sidebarBtn?.addEventListener('click', () => {
            Utils.toggleClass(sidebar);
            const isExpanded = sidebar?.classList.contains('active');
            sidebarBtn.setAttribute('aria-expanded', isExpanded);
        });
    }
};

// ===== NAVIGATION MODULE =====
const Navigation = {
    init() {
        const navLinks = document.querySelectorAll('[data-nav-link]');
        const pages = document.querySelectorAll('[data-page]');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const targetPage = link.dataset.navLink;
                this.switchPage(targetPage, navLinks, pages);
            });
        });
    },

    switchPage(targetPage, navLinks, pages) {
        pages.forEach(page => {
            const isActive = page.dataset.page === targetPage;
            Utils[isActive ? 'addClass' : 'removeClass'](page, 'active');
        });

        navLinks.forEach(link => {
            const isActive = link.dataset.navLink === targetPage;
            Utils[isActive ? 'addClass' : 'removeClass'](link, 'active');
        });

        Utils.scrollToTop();
    }
};

// ===== FILTER MODULE =====
const Filter = {
    currentFilter: 'tous',

    init() {
        this.initDesktopFilters();
        this.initMobileSelect();
    },

    initDesktopFilters() {
        const filterBtns = document.querySelectorAll('[data-filter-btn]');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterValue = btn.innerText.trim().toLowerCase();
                this.applyFilter(filterValue);
                this.updateActiveButton(filterBtns, btn);
            });
        });
    },

    initMobileSelect() {
        const select = document.querySelector('[data-select]');
        const selectItems = document.querySelectorAll('[data-select-item]');
        const selectValue = document.querySelector('[data-select-value]');

        select?.addEventListener('click', () => Utils.toggleClass(select));

        selectItems.forEach(item => {
            item.addEventListener('click', () => {
                const filterValue = item.innerText.trim().toLowerCase();
                selectValue.innerText = item.innerText;
                Utils.removeClass(select, 'active');
                this.applyFilter(filterValue);

                // Synchroniser avec les boutons desktop
                const filterBtns = document.querySelectorAll('[data-filter-btn]');
                const matchingBtn = Array.from(filterBtns).find(
                    btn => btn.innerText.trim().toLowerCase() === filterValue
                );
                if (matchingBtn) {
                    this.updateActiveButton(filterBtns, matchingBtn);
                }
            });
        });
    },

    applyFilter(filterValue) {
        this.currentFilter = filterValue;
        const items = document.querySelectorAll('[data-filter-item]');

        items.forEach(item => {
            const category = item.dataset.category?.trim().toLowerCase() || '';
            const shouldShow = filterValue === 'tous' || filterValue === category;

            if (shouldShow) {
                Utils.addClass(item, 'active');
                item.style.display = 'block';
            } else {
                Utils.removeClass(item, 'active');
                setTimeout(() => {
                    if (!item.classList.contains('active')) {
                        item.style.display = 'none';
                    }
                }, CONFIG.animationDuration);
            }
        });
    },

    updateActiveButton(buttons, activeBtn) {
        buttons.forEach(btn => Utils.removeClass(btn, 'active'));
        Utils.addClass(activeBtn, 'active');
    }
};

// ===== SKILLS MODULE =====
const Skills = {
    async init() {
        const skills = await Utils.fetchJSON('skills.json');
        if (!skills) return;

        this.render(skills);
        this.animate();
    },

    render(skills) {
        const skillsList = document.getElementById('skills-list');
        const template = document.getElementById('skill-template');
        if (!skillsList || !template) return;

        skills.forEach(skill => {
            const clone = Utils.createElement(template);
            const titleEl = clone.querySelector('h5');
            const dataEl = clone.querySelector('data');
            const progressFill = clone.querySelector('.skill-progress-fill');

            titleEl.textContent = skill.name;
            dataEl.value = skill.level;
            dataEl.textContent = `${skill.level}%`;
            progressFill.dataset.level = skill.level;

            skillsList.appendChild(clone);
        });
    },

    animate() {
        const progressBars = document.querySelectorAll('.skill-progress-fill');

        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const level = bar.dataset.level;
                bar.style.width = `${level}%`;
            }, index * 100);
        });
    }
};

// ===== TIMELINE MODULE =====
const Timeline = {
    async init() {
        const data = await Utils.fetchJSON('timeline.json');
        if (!data?.timeline) return;

        this.render(data.timeline);
    },

    render(timelineData) {
        const container = document.getElementById('timeline-container');
        const sectionTemplate = document.getElementById('timeline-section-template');
        const itemTemplate = document.getElementById('timeline-item-template');

        if (!container || !sectionTemplate || !itemTemplate) return;

        timelineData.forEach(section => {
            const sectionClone = Utils.createElement(sectionTemplate);
            const title = sectionClone.querySelector('h3');
            const list = sectionClone.querySelector('.timeline-list');

            title.textContent = section.title;

            section.items.forEach(item => {
                const itemClone = Utils.createElement(itemTemplate);
                itemClone.querySelector('.timeline-item-title').textContent = item.title;
                itemClone.querySelector('.timeline-period').textContent = item.period;
                itemClone.querySelector('.timeline-text').textContent = item.description;
                list.appendChild(itemClone);
            });

            container.appendChild(sectionClone);
        });
    }
};

// ===== PROJECTS MODULE =====
const Projects = {
    projectsData: [],

    async init() {
        const projects = await Utils.fetchJSON('projects.json');
        if (!projects) return;

        this.projectsData = projects;
        this.render(projects);
        ProjectModal.init();
    },

    render(projects) {
        const projectList = document.getElementById('project-list');
        const template = document.getElementById('project-template');
        if (!projectList || !template) return;

        projectList.innerHTML = '';

        projects.forEach((project, index) => {
            const clone = Utils.createElement(template);
            const li = clone.querySelector('li');
            const link = li.querySelector('a');
            const img = li.querySelector('img');
            const title = li.querySelector('.project-title');
            const category = li.querySelector('.project-category');
            const description = li.querySelector('.project-description');
            const tagsContainer = li.querySelector('.project-tags');

            li.dataset.category = project.category.toLowerCase();
            li.dataset.projectIndex = index;

            link.href = '#';
            link.addEventListener('click', (e) => {
                e.preventDefault();
                ProjectModal.open(project);
            });

            img.src = project.image;
            img.alt = project.title;
            title.textContent = project.title;
            category.textContent = project.category;
            description.textContent = project.description;

            tagsContainer.innerHTML = project.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join('');

            projectList.appendChild(clone);
        });

        // Appliquer le filtre actuel
        Filter.applyFilter(Filter.currentFilter);
    }
};

// ===== PROJECT MODAL MODULE =====
const ProjectModal = {
    modal: null,
    overlay: null,
    closeBtn: null,

    init() {
        this.modal = document.getElementById('project-modal');
        this.overlay = this.modal?.querySelector('[data-overlay]');
        this.closeBtn = this.modal?.querySelector('[data-modal-close]');

        this.bindEvents();
    },

    bindEvents() {
        this.closeBtn?.addEventListener('click', () => this.close());
        this.overlay?.addEventListener('click', () => this.close());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
                this.close();
            }
        });
    },

    open(project) {
        if (!this.modal) return;

        this.populateModal(project);
        Utils.addClass(this.modal, 'active');
        Utils.addClass(this.overlay, 'active');
        document.body.style.overflow = 'hidden';
    },

    close() {
        if (!this.modal) return;

        Utils.removeClass(this.modal, 'active');
        Utils.removeClass(this.overlay, 'active');
        document.body.style.overflow = '';
    },

    populateModal(project) {
        const modal = this.modal;

        modal.querySelector('.modal-project-img').src = project.image;
        modal.querySelector('.modal-project-img').alt = project.title;
        modal.querySelector('.modal-title').textContent = project.title;
        modal.querySelector('.modal-category').textContent = project.category;
        modal.querySelector('.modal-description').textContent = project.description;

        const tagsContainer = modal.querySelector('.modal-tags');
        tagsContainer.innerHTML = project.tags
            .map(tag => `<span class="tag">${tag}</span>`)
            .join('');

        const githubLink = modal.querySelector('.modal-btn');
        githubLink.href = project.link;

        // Charger le README si disponible
        this.loadReadme(project);
    },

    async loadReadme(project) {
        const readmeContainer = this.modal.querySelector('.modal-readme');
        readmeContainer.innerHTML = '<p class="loading">Chargement des détails...</p>';

        try {
            // Extraire le propriétaire et le repo depuis l'URL GitHub
            const match = project.link.match(/github\.com\/([^\/]+)\/([^\/]+)/);
            if (!match) {
                readmeContainer.innerHTML = '<p>README non disponible</p>';
                return;
            }

            const [, owner, repo] = match;
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw'
                }
            });

            if (!response.ok) throw new Error('README non trouvé');

            const readme = await response.text();
            // Limiter à un extrait
            const excerpt = readme.split('\n').slice(0, 15).join('\n');
            readmeContainer.innerHTML = `<pre>${this.escapeHtml(excerpt)}</pre>`;
        } catch (error) {
            readmeContainer.innerHTML = `
                <p>
                    <strong>Technologies:</strong> ${project.tags.join(', ')}<br><br>
                    ${project.description}<br><br>
                    Pour plus de détails, consultez le dépôt GitHub.
                </p>
            `;
        }
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// ===== APP INITIALIZATION =====
const App = {
    async init() {
        console.log('Initialisation du portfolio...');

        // Modules UI
        Sidebar.init();
        Navigation.init();
        Filter.init();

        // Modules de données
        await Promise.all([
            Skills.init(),
            Timeline.init(),
            Projects.init()
        ]);

        console.log('Portfolio initialisé avec succès!');
    }
};

// Démarrer l'application quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}