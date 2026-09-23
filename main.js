"use strict";

const App = {
    init() {
        this.navbar = document.querySelector(".navbar");
        this.navToggle = document.querySelector(".nav-toggle");
        this.navContent = document.querySelector(".nav-content");
        this.navLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];
        this.searchInput = document.querySelector("#searchInput");
        this.serviceCards = [...document.querySelectorAll(".service-card")];
        this.themeToggle = document.querySelector("#themeToggle");
        this.focusSearchButton = document.querySelector("#focusSearch");
        this.backToTopButton = document.querySelector("#btnTopo");

        this.bindNavigation();
        this.bindSearch();
        this.bindTheme();
        this.bindBackToTop();
        this.bindBookingButtons();
        this.updateOnScroll();
    },

    bindNavigation() {
        this.navToggle?.addEventListener("click", () => {
            const isOpen = this.navContent.classList.toggle("open");
            this.navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        this.navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                this.navContent?.classList.remove("open");
                this.navToggle?.setAttribute("aria-expanded", "false");
            });
        });

        const sections = this.navLinks
            .map((link) => document.querySelector(link.getAttribute("href")))
            .filter(Boolean);

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (!visible) return;

                this.navLinks.forEach((link) => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${visible.target.id}`
                    );
                });
            }, { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.25, 0.5] });

            sections.forEach((section) => observer.observe(section));
        }
    },

    bindSearch() {
        if (!this.searchInput) return;

        this.searchInput.addEventListener("input", (event) => {
            const term = event.target.value
                .trim()
                .toLocaleLowerCase("pt-BR")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            let visibleCards = 0;

            this.serviceCards.forEach((card) => {
                const searchableText = (card.dataset.search || card.textContent)
                    .toLocaleLowerCase("pt-BR")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

                const shouldShow = searchableText.includes(term);
                card.classList.toggle("is-hidden", !shouldShow);
                if (shouldShow) visibleCards += 1;
            });

            this.renderNoResults(visibleCards === 0);
        });

        this.focusSearchButton?.addEventListener("click", () => {
            document.querySelector("#servicos")?.scrollIntoView({ behavior: "smooth" });
            window.setTimeout(() => this.searchInput.focus(), 450);
        });
    },

    renderNoResults(show) {
        const cardsContainer = document.querySelector("#serviceCards");
        let message = cardsContainer?.querySelector(".no-results");

        if (show && !message) {
            message = document.createElement("p");
            message.className = "no-results";
            message.textContent = "Nenhum serviço encontrado.";
            cardsContainer.appendChild(message);
        }

        if (!show && message) message.remove();
    },

    bindTheme() {
        let storedTheme = null;

        try {
            storedTheme = window.localStorage.getItem("agendapro-theme");
        } catch (error) {
            console.info("Preferência de tema não pôde ser lida neste contexto.");
        }

        if (storedTheme === "dark") document.body.classList.add("dark");

        this.themeToggle?.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            try {
                window.localStorage.setItem(
                    "agendapro-theme",
                    document.body.classList.contains("dark") ? "dark" : "light"
                );
            } catch (error) {
                console.info("Preferência de tema aplicada apenas nesta página.");
            }
        });
    },

    bindBackToTop() {
        window.addEventListener("scroll", () => this.updateOnScroll(), { passive: true });
        this.backToTopButton?.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    },

    updateOnScroll() {
        const scrolled = window.scrollY > 24;
        this.navbar?.classList.toggle("is-scrolled", scrolled);
        this.backToTopButton?.classList.toggle("show", window.scrollY > 500);
    },

    bindBookingButtons() {
        document.querySelectorAll(".btn-small").forEach((button) => {
            button.addEventListener("click", () => {
                document.querySelector("#agendamento")?.scrollIntoView({ behavior: "smooth" });
            });
        });
    }
};

document.addEventListener("DOMContentLoaded", () => App.init());
