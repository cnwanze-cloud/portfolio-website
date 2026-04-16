// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


// GitHub Auto Project Loader
const username = "cnwanze-cloud";

fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    .then(res => res.json())
    .then(data => {

        const container = document.getElementById("project-grid");
        container.innerHTML = "";

        const repos = data
            .filter(repo => !repo.fork && repo.description)
            .slice(0, 6);

        repos.forEach(repo => {

            const card = document.createElement("a");
            card.className = "project-card";
            card.href = repo.html_url;
            card.target = "_blank";

            card.innerHTML = `
                <h3>${formatName(repo.name)}</h3>
            `;

            container.appendChild(card);
        });

    })
    .catch(() => {
        document.getElementById("project-grid").innerHTML =
            "<p>Unable to load projects.</p>";
    });


// Format repo name
function formatName(name) {
    return name
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
}


// Active nav highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (scrollY >= top) current = section.id;
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
