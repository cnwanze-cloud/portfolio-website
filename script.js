// GitHub Auto Project Loader
const username = "cnwanze-cloud";

async function fetchProjects() {
    const container = document.getElementById("project-grid");
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        container.innerHTML = "";

        // Filter: Only show non-forks that have a description
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
                <p>${repo.description}</p>
                <span style="margin-top: 15px; color: #00d4ff; font-size: 0.85rem; font-weight: bold;">
                    View Repository →
                </span>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = "<p>Unable to load projects at this time.</p>";
        console.error("GitHub Fetch Error:", error);
    }
}

// Format repo name: my-repo-name -> My Repo Name
function formatName(name) {
    return name
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// Initialize Fetch
fetchProjects();
