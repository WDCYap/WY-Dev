function loadSection(url, sectionId, contentId, renderCallback) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data && Object.keys(data).length > 0) {
        const section = document.getElementById(sectionId);
        const content = document.getElementById(contentId);
        renderCallback(data, content);
        section.style.display = "block";
      }
    })
    .catch((error) => console.error(`Error loading ${sectionId}:`, error));
}

const renderAbout = (data, content) => {
  content.innerHTML = `<p>${data.about}</p>`;
};

const renderEducation = (data, content) => {
  data.education.forEach((item) => {
    content.innerHTML += `<h4>${item.institution}</h4><p>${item.degree} | ${item.years}</p>`;
  });
};

const renderExperience = (data, content) => {
  data.experience.forEach((job) => {
    content.innerHTML += `<h4>${job.position}</h4><p>${job.company} | ${
      job.dates
    }</p><ul>${job.tasks.map((task) => `<li>${task}</li>`).join("")}</ul>`;
  });
};

const renderSkills = (data, content) => {
  data.skills.forEach((skill) => {
    content.innerHTML += `<div class="col-md-3"><div class="skill"><h4>${skill}</h4></div></div>`;
  });
};

const renderContact = (data, content) => {
  content.innerHTML = `
    <p>Email: <a href="mailto:${data.email}">${data.email}</a></p>
    <p>Phone: ${data.phone}</p>
    <p>LinkedIn: <a href="${data.linkedin}">${data.linkedin}</a></p>
  `;
};

document.addEventListener("DOMContentLoaded", () => {
  loadSection("assets/about.json", "about", "about-content", renderAbout);
  loadSection(
    "assets/education.json",
    "education",
    "education-content",
    renderEducation
  );
  loadSection(
    "assets/experience.json",
    "experience",
    "experience-content",
    renderExperience
  );
  loadSection("assets/skills.json", "skills", "skills-content", renderSkills);
  loadSection(
    "assets/contact.json",
    "contact",
    "contact-content",
    renderContact
  );
});
