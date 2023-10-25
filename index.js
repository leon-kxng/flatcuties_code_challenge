const characterData = () => {
    // Cache DOM elements
    const characters = document.getElementById('data');
    const characterImage = document.getElementById('image');
    const characterName = document.getElementById('name');
    const characterVotes = document.getElementById('vote-count');
    const votesForm = document.getElementById('votes-form');
    const votes = document.getElementById('votes');
    const submitVoteButton = document.querySelector('.btn-submit');
    const resetVoteButton = document.querySelector('.btn-reset');

    let selectedCandidate = null; // Store the currently selected candidate
    let baseURL = 'https://my-json-server.typicode.com/leon-kxng/flatcuties_code_challenge/characters';

    fetch(baseURL)
        .then(response => response.json())
        .then(data => {
            renderCharacterList(data);
        });

    function renderCharacterList(data) {
        data.forEach(candidate => {
            const characterList = document.createElement('li');
            characterList.textContent = candidate.name;
            characterList.addEventListener('click', () => displayCharacterDetails(candidate));
            characters.appendChild(characterList);
        });
    }

    function displayCharacterDetails(candidate) {
        selectedCandidate = candidate; // Update the selected candidate

        characterImage.src = candidate.image;
        characterName.innerText = candidate.name;
        characterVotes.innerText = candidate.votes;
        votes.value = ''; // Clear the input field

        submitVoteButton.addEventListener('click', () => {
            if (selectedCandidate) {
                let newVote = parseInt(votes.value, 10);
                selectedCandidate.votes += newVote;
                characterVotes.innerText = selectedCandidate.votes;
            }
        });

        resetVoteButton.addEventListener('click', () => {
            if (selectedCandidate) {
                selectedCandidate.votes = 0;
                characterVotes.innerText = '0';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', characterData);
