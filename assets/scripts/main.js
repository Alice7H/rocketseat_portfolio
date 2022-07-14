(() => {
  "use strict";
  const repositories = [];
  const btnToggleDisplayGithubProjects = document.querySelector('.toggle');

  btnToggleDisplayGithubProjects.addEventListener('change', async () => {
    const label = document.querySelector('.toggle-label');
    if (btnToggleDisplayGithubProjects.checked) {
      if (repositories.length === 0) {
        const repos = await getGithubProjects();
        await filterProjects(repos);
        repositories.forEach(repository => createProject(repository));
      } else {
        handleDisplayProjects(repositories.length);
      }
      label.textContent = 'Esconder projetos';
    } else {
      handleDisplayProjects(repositories.length);
      label.textContent = 'Ver mais projetos aqui';
    }
  }, false)

  function filterProjects(repos) {
    repos.forEach(data => {
      if (data.name === 'alura-event-tracker' || data.name === 'nlw-return-impulse-web') {
        repositories.push(data);
      }
    });
  }

  function getGithubProjects() {
    return fetch('https://api.github.com/users/Alice7H/repos')
      .then(repos => repos.json())
      .then(data => data)
      .catch(error => {
        alert('Erro ao buscar os projetos do Github.');
        console.log(error);
      })
  }

  function createProject(project) {
    const projects = document.querySelector('.projects');
    const projectElement = `
    <a class="card project" href="${project.html_url}" target="_blank">
      <p class="title">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
        <span>${project.name}</span>
      </p>
      <p class="description">${project.description || 'Sem descrição no momento'}</p>
      <div class="footer">
        <div class="left">
          <span title="favoritaram o projeto">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            ${project.stargazers_count}
          </span>
          <span title="cópias do projeto">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-git-branch"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
            ${project.forks_count}
          </span>
        </div>
        <div class="right">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7.5" cy="7.5" r="6.5" fill="#E7DE79" stroke="#837E9F" stroke-width="2"/>                 
          </svg>                    
          <span title="linguagem do projeto">
            ${project.language}
          </span>
        </div>
      </div>
    </a>
    `
    const toggleElement = projects.lastElementChild;
    toggleElement.insertAdjacentHTML('beforebegin', projectElement);
  }

  function handleDisplayProjects(amount) {
    const projects = document.querySelectorAll('.project');
    const length = projects.length - 1;
    if (length > 0 && amount > 0) {
      for (let i = length; i >= amount; i--) {
        projects[i].classList.toggle('hidden');
      }
    }
  }
})()