export const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `
        <div class="info">
            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
            <div class="data">
                <h1>${user.name ?? 'Este usuário não possui um nome cadastrado 😢'}</h1>
                <p>${user.bio ?? 'Este usuário não possui uma bio cadastrada 😢'}</p>
                <br>
                <span><b>Seguidores:</b> ${user.followers}</span>
                <br>
                <span><b>Seguindo:</b> ${user.following}</span>
            </div>
        </div>`

        let reposItens = "";
        user.repositories.forEach(repo => {
            reposItens += `
            <li>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                <span>🍴 ${repo.forks}&nbsp;</span>
                <span>⭐ ${repo.stargazers_count}&nbsp;</span>
                <span>👀 ${repo.watchers}&nbsp;</span>
                <span>🧑‍💻 ${repo.language}&nbsp;</span>
            </li>`
        });

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `
            <div class="repositories section">
                <h2>Repositórios de ${user.repositories[0].owner.login}</h2>
                <ul>${reposItens}</ul>
            </div>`;
        }

        let eventsItens = "";
        user.events.forEach(event => {
            eventsItens += `<li><p><strong>${event.repo.name}</strong> - <small>${event.type}</small></p></li>`
        });

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `
            <div class="events section">
                <h2>Eventos</h2>
                <ul>${eventsItens}</ul>
            </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = '<h3>Usuário não encontrado. 😢</h3>'
    }
}