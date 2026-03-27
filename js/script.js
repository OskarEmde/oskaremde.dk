const links = document.querySelectorAll(".sidebar a");
const sections = document.querySelectorAll("section");

const startSection = document.querySelector(".startbillede");
const startForgrund = document.querySelector(".start-forgrund");

const profileBtn = document.getElementById("profileBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const themeToggle = document.getElementById("themeToggle");

/* Smooth scroll i sidebar */
links.forEach(link => {
    link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");

        /* Kun scroll hvis linket er en sektion på samme side */
        if (targetId && targetId.startsWith("#")) {
            e.preventDefault();

            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }

        /* Luk dropdown hvis man klikker på et link */
        if (dropdownMenu) {
            dropdownMenu.classList.remove("show");
        }
    });
});

/* Aktiv sidebar-knap + forgrundseffekt */
window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 120) {
            current = section.getAttribute("id");
        }
    });

    links.forEach(link => {
        link.classList.remove("active");

        const href = link.getAttribute("href");
        if (href === "#" + current) {
            link.classList.add("active");
        }
    });

    if (!startSection || !startForgrund) return;

    const sectionTop = startSection.offsetTop;
    const sectionHeight = startSection.offsetHeight;
    const scrollY = window.scrollY;

    const progress = Math.max(
        0,
        Math.min(1, (scrollY - sectionTop) / sectionHeight)
    );

    /* Kun forgrunden bevæger sig */
    startForgrund.style.transform = `translateY(${progress * -140}px)`;

    /* Fade */
    startForgrund.style.opacity = `${1 - progress * 1.2}`;
});

/* Dropdown menu */
if (profileBtn && dropdownMenu) {
    profileBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle("show");
    });

    document.addEventListener("click", function (e) {
        if (!dropdownMenu.contains(e.target) && !profileBtn.contains(e.target)) {
            dropdownMenu.classList.remove("show");
        }
    });
}

/* Dark mode */
if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}

/* Husk valgt theme når siden åbnes igen */
window.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
});