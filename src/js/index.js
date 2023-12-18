import { getUser } from "./services/user.js";
import { getRepos } from "./services/repositories.js";
import { getEvents } from "./services/events.js";
import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

document.getElementById('btn-search').addEventListener('click', () => {
    let userName = document.getElementById('input-search').value;

    if (validateEmptyInput(userName)) return

    getUserData(userName)
});

document.getElementById('input-search').addEventListener('keydown', e => {
    let userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;

    if (isEnterKeyPressed) {
        if (validateEmptyInput(userName)) return

        getUserData(userName);
    }
});

async function getUserData(userName) {
    const userResponse = await getUser(userName);

    console.log(userResponse);

    if (userResponse.message === 'Not Found') {
        screen.renderNotFound();
        return
    }

    const repositoriesResponse = await getRepos(userName);

    console.log(repositoriesResponse);

    const eventsResponse = await getEvents(userName);

    console.log(eventsResponse);

    user.setInfo(userResponse);
    user.setRepos(repositoriesResponse);
    user.setEvents(eventsResponse);

    screen.renderUser(user);
};

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Por favor, informe o nome do usuário do GitHub que deseja consultar.')
        return true
    }
}