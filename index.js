const characterData = () => {
    // Cache DOM elements
    const characters = document.getElementById('data');
    const characterImage = document.getElementById('image');
    const characterName = document.getElementById('name');
    const characterVotes = document.getElementById('vote-count');
    const votesForm = document.getElementById('votes-form');
    const votes = document.getElementById('votes');

    characters.innerHTML = '';

    let baseURL = 'https://my-json-server.typicode.com/leon-kxng/flatcuties_code_challenge/characters';
    
    fetch(baseURL)
    .then(response => response.json())
    .then(data => renderCharacterList(data));

    function renderCharacterList(data) {
        data.forEach(candidate => {
            const characterList = document.createElement('li');
            characterList.textContent = candidate.name;
            characterList.addEventListener('click', () => displayCharacterDetails(candidate));
            characters.appendChild(characterList);
        });
    }

    function displayCharacterDetails(candidate) {
        characterImage.src = candidate.image;
        characterName.innerText = candidate.name;
        characterVotes.innerText = candidate.votes;

        let currentVote = parseInt(characterVotes.textContent, 10);

        votesForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let newVote = parseInt(votes.value, 10);
            currentVote = currentVote + newVote;
            characterVotes.textContent = currentVote;
        });
    }
}

document.addEventListener('DOMContentLoaded', characterData);