const username = "cnwanze-cloud";
const imgName = "Architecture.png"; 

async function fetchProjects() {
    const container = document.getElementById("project-grid");
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
        if (!response.ok) throw new Error("API Fetch Failed");
        
        const data = await response.json();
        container.innerHTML = "";

        // Show all original work with descriptions
        const repos = data.filter(repo => !repo.fork && repo.description);

        repos.forEach(repo => {
            const card = document.createElement("a");
            card.className = "project-card";
            card.href = repo.html_url;
            card.target = "_blank";

            const imageUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/main/${imgName}`;
            const fallbackUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/master/${imgName}`;

            // Create badges for GitHub topics/skills
            const tags = repo.topics.map(topic => `<span class="tag">${topic}</span>`).join("");

            card.innerHTML = `
                <div class="repo-image-container">
                    <img src="${imageUrl}" 
                         alt="${repo.name} Architecture" 
                         onerror="handleImageError(this, '${fallbackUrl}')">
                </div>
                <h3>${formatName(repo.name)}</h3>
                <p>${repo.description}</p>
                <div class="card-tags">
                    ${repo.language ? `<span class="tag lang">${repo.language}</span>` : ""}
                    ${tags}
                </div>
                <span class="view-link">View Repo →</span>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = "<p>Network error: Unable to load projects. View them on GitHub.</p>";
        console.error(error);
    }
}

function handleImageError(img, fallback) {
    if (img.src.includes('/main/')) {
        img.src = fallback;
    } else {
        img.src = 'https://img.icons8.com/ios-filled/100/1f2937/cloud-lighting.png';
        img.style.width = '50px';
        img.style.opacity = '0.5';
    }
}

function formatName(name) {
    return name.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

// Nav Highlight logic
const navLinks = document.querySelectorAll("nav ul li a");
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

fetchProjects();
