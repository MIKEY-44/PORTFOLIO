/* =========================
   SAFE DOM READY
========================= */
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     PROJECT DATA
  ========================= */
const projectData = {
  blockchain: {
    title: "Blockchain Transaction System",
    description: "Secure wallet-based transaction simulation with authentication and tracking.",
    tags: ["Java", "Blockchain", "Security"],
    github: "https://github.com/MIKEY-44/Transaction-System",
    image: "assets/images/projects/project1.png",
    caseStudy: "assets/images/projects/blockchain.html"
  },

  pdf: {
    title: "Smart PDF Numbering Tool",
    description: "Automation tool for dynamic page numbering.",
    tags: ["Python", "Automation"],
    github: "https://github.com/MIKEY-44/add_PageNumbers-with-one-click",
    image: "assets/images/projects/project2.png",
    caseStudy: "assets/images/projects/pdf.html"
  },

  ai: {
    title: "AI Computer Vision System",
    description: "Deep learning-based classification system achieving 96%+ accuracy.",
    tags: ["AI/ML", "Computer Vision"],
    github: "#",
    image: "assets/images/projects/project3.png",
    caseStudy: "assets/images/projects/ai.html"
  }
};

  /* =========================
     MODAL LOGIC
  ========================= */
  const modal = document.getElementById("projectModal");
  const modalCase = document.getElementById("modalCase");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const modalTags = document.getElementById("modalTags");
  const modalGithub = document.getElementById("modalGithub");
  const modalImage = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close-btn");

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      const key = card.dataset.project;
      const data = projectData[key];

      if (!data) return;

      modalTitle.textContent = data.title;
      modalDesc.textContent = data.description;
      modalGithub.href = data.github;
      modalImage.src = data.image;

      modalCase.onclick = async (e) => {
  e.preventDefault();

  const res = await fetch(data.caseStudy);
  const html = await res.text();

  const container = document.getElementById("caseStudyContainer");

  container.innerHTML = `
    <div class="case-study-card">
      <button class="close-case-study" onclick="closeCaseStudy()">&times;</button>
      ${html}
    </div>
  `;
  
  container.classList.add("show");
  document.body.style.overflow = "hidden"; // Prevent scrolling behind card

  modal.style.display = "none";
};

      modalTags.innerHTML = data.tags
      .map(tag => `<span>${tag}</span>`)
      .join("");

      modal.style.display = "flex";
    });
  });

  window.closeCaseStudy = () => {
    const container = document.getElementById("caseStudyContainer");
    container.classList.remove("show");
    document.body.style.overflow = ""; // Restore background scrolling
  };

  /* CLOSE MODAL */
  if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  /* =========================
     CONTACT FORM VALIDATION
  ========================= */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        status.textContent = "Please fill all fields.";
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        status.textContent = "Invalid email format.";
        return;
      }

      status.textContent = "Sending message...";
      
      // Using Web3Forms API to bypass Render's SMTP block
      const BACKEND_URL = "https://api.web3forms.com/submit"; 

      try {
        const response = await fetch(BACKEND_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ 
            access_key: "df043ca9-2a3d-4a7d-b011-926e88283d10",
            name: name, 
            email: email, 
            message: message 
          })
        });

        if (response.ok) {
          status.textContent = "Message sent successfully!";
          form.reset();
        } else {
          status.textContent = "Failed to send message. Please try again later.";
        }
      } catch (error) {
        console.error("Error sending message:", error);
        status.textContent = "Error connecting to the server.";
      }
    });
  }

  /* =========================
     BLOG TOGGLE
  ========================= */
  document.querySelectorAll(".read-more").forEach(btn => {
    btn.addEventListener("click", () => {
      const full = btn.previousElementSibling;

      full.classList.toggle("hidden");

      btn.textContent = full.classList.contains("hidden")
        ? "Read More"
        : "Show Less";
    });
  });

  /* =========================
     CURSOR GLOW
  ========================= */
  const glow = document.querySelector(".cursor-glow");

  window.addEventListener("mousemove", (e) => {
    if (glow) {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }
  });

  /* =========================
     TYPING EFFECT
  ========================= */
  const text = "Omkar Kurdekar";
  let index = 0;

  function typeEffect() {
    const el = document.getElementById("typingText");
    if (!el) return;

    if (index < text.length) {
      el.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 80);
    }
  }

  typeEffect();

});

/* =========================
   COMMAND PALETTE
========================= */

const palette = document.getElementById("commandPalette");
const input = document.getElementById("paletteInput");
const list = document.getElementById("paletteList");

const commands = [
  { name: "Go to Home", action: () => location.hash = "#home" },
  { name: "Go to Resume", action: () => location.hash = "#resume" },
  { name: "Go to Projects", action: () => location.hash = "#projects" },
  { name: "Go to Blog", action: () => location.hash = "#blog" },
  { name: "Go to About", action: () => location.hash = "#about" },
  { name: "Go to Contact", action: () => location.hash = "#contact" },

  { name: "Open GitHub", action: () => window.open("https://github.com/MIKEY-44") },
  { name: "Open LinkedIn", action: () => window.open("https://www.linkedin.com/in/omkar-kurdekar-1020b5254/") }
];

let selectedIndex = 0;

/* OPEN / CLOSE */
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    palette.style.display = "flex";
    input.focus();
    renderList(commands);
  }

  if (e.key === "Escape") {
    palette.style.display = "none";
  }
});

/* FILTER */
input.addEventListener("input", () => {
  const value = input.value.toLowerCase();

  const filtered = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(value)
  );

  selectedIndex = 0;
  renderList(filtered);
});

/* RENDER */
function renderList(items) {
  list.innerHTML = "";

  items.forEach((cmd, index) => {
    const li = document.createElement("li");
    li.textContent = cmd.name;

    if (index === selectedIndex) {
      li.classList.add("active");
    }

    li.onclick = () => {
      cmd.action();
      palette.style.display = "none";
    };

    list.appendChild(li);
  });
}

/* KEY NAVIGATION */
document.addEventListener("keydown", (e) => {
  const items = list.querySelectorAll("li");
  if (!items.length) return;

  if (e.key === "ArrowDown") {
    selectedIndex = (selectedIndex + 1) % items.length;
  }

  if (e.key === "ArrowUp") {
    selectedIndex = (selectedIndex - 1 + items.length) % items.length;
  }

  if (e.key === "Enter") {
    items[selectedIndex].click();
  }

  items.forEach((el, i) => {
    el.classList.toggle("active", i === selectedIndex);
  });
});