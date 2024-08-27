
// Inicializar

initializeGame();

let characters = [];

// Jogadores

async function fetchCharacters() {
    const response = await fetch('http://localhost:5000/characters');
    const characters = await response.json();
    return characters.map(character => character.name);
}

async function initializeGame() {
    characters = await fetchCharacters();
}

// Verfica Chute

let tentativas = 0

function openPopup(guess) {
    document.getElementById("myPopup").style.display = "block";
    let jogador_text = document.getElementById("jogador")
    let tentativas_text = document.getElementById("tentativas_popup")
    jogador_text.textContent = guess
    tentativas_text.textContent = `Acertou em: ${tentativas} Tentativas`
}

function closePopup() {
    document.getElementById("myPopup").style.display = "none";
}

function openTutorial() {
    document.getElementById("tutorial").style.display = "block";
}

function closePopupTutorial() {
    document.getElementById("tutorial").style.display = "none";
}

function submitGuess(guess) {
    fetch('http://127.0.0.1:5000/characters/verifyGuess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guess: guess })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('guess').value = '';
        let templateId = data.result ? 'correct-template' : 'error-template';
        const template = document.getElementById(templateId);
        const clone = document.importNode(template.content, true);

        tentativas++
        document.getElementById("tentativas").textContent = `Tentativas: ${tentativas}`
        
        clone.querySelector('.try-message').textContent = `${guess}`;
        
        const sexDiv = clone.querySelector('#sex');
        if (data.sex) {
            sexDiv.style.background = "#1AEB31";
            sexDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/${data.sex_content}/v1/24px.svg')`;
            sexDiv.style.backgroundSize = 'contain'; // Ajusta o tamanho conforme necessário
            sexDiv.style.backgroundRepeat = 'no-repeat'; // Evita que a imagem se repita
            sexDiv.style.backgroundPosition = 'center'; // Centraliza a imagem na div

        } else {
            sexDiv.style.background = "#E21919";
            sexDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/${data.sex_content}/v1/24px.svg')`;
            sexDiv.style.backgroundSize = 'contain'; // Ajusta o tamanho conforme necessário
            sexDiv.style.backgroundRepeat = 'no-repeat'; // Evita que a imagem se repita
            sexDiv.style.backgroundPosition = 'center'; // Centraliza a imagem na div

        }

        const sportDiv = clone.querySelector('#sport');
        if (data.sport) {
            sportDiv.style.background = "#1AEB31";
            if (data.sport_content == "Futebol") {
                sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_soccer/v1/24px.svg')`;
                sportDiv.style.backgroundSize = 'contain'; // Ajusta o tamanho conforme necessário
                sportDiv.style.backgroundRepeat = 'no-repeat'; // Evita que a imagem se repita
                sportDiv.style.backgroundPosition = 'center'; // Centraliza a imagem na div
            }
            else if (data.sport_content == "Tênis"){
                sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_tennis/v1/24px.svg')`;
                sportDiv.style.backgroundSize = 'contain'; // Ajusta o tamanho conforme necessário
                sportDiv.style.backgroundRepeat = 'no-repeat'; // Evita que a imagem se repita
                sportDiv.style.backgroundPosition = 'center'; // Centraliza a imagem na div
            }
            else if (data.sport_content == "Basquete"){
                sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_basketball/v1/24px.svg')`;
                sportDiv.style.backgroundSize = 'contain'; // Ajusta o tamanho conforme necessário
                sportDiv.style.backgroundRepeat = 'no-repeat'; // Evita que a imagem se repita
                sportDiv.style.backgroundPosition = 'center'; // Centraliza a imagem na div
            }
            else if (data.sport_content == "Vôlei"){
                sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_volleyball/v1/24px.svg')`;
                sportDiv.style.backgroundSize = 'contain'; // Ajusta o tamanho conforme necessário
                sportDiv.style.backgroundRepeat = 'no-repeat'; // Evita que a imagem se repita
                sportDiv.style.backgroundPosition = 'center'; // Centraliza a imagem na div
            }
            else if (data.sport_content == "Surf"){
                sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/surfing/v1/24px.svg')`;
                sportDiv.style.backgroundSize = 'contain'; // Ajusta o tamanho conforme necessário
                sportDiv.style.backgroundRepeat = 'no-repeat'; // Evita que a imagem se repita
                sportDiv.style.backgroundPosition = 'center'; // Centraliza a imagem na div
            }

        } else {
            sportDiv.style.background = "#E21919";
            if (data.sport_content == "Futebol") {
                sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_soccer/v1/24px.svg')`;
                sportDiv.style.backgroundSize = 'contain'; // Ajusta o tamanho conforme necessário
                sportDiv.style.backgroundRepeat = 'no-repeat'; // Evita que a imagem se repita
                sportDiv.style.backgroundPosition = 'center'; // Centraliza a imagem na div
            }
            else if (data.sport_content == "Tênis"){
                sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_tennis/v1/24px.svg')`;
                sportDiv.style.backgroundSize = 'contain'; // Ajusta o tamanho conforme necessário
                sportDiv.style.backgroundRepeat = 'no-repeat'; // Evita que a imagem se repita
                sportDiv.style.backgroundPosition = 'center'; // Centraliza a imagem na div
            }
            else if (data.sport_content == "Basquete"){
                sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_basketball/v1/24px.svg')`;
                sportDiv.style.backgroundSize = 'contain'; // Ajusta o tamanho conforme necessário
                sportDiv.style.backgroundRepeat = 'no-repeat'; // Evita que a imagem se repita
                sportDiv.style.backgroundPosition = 'center'; // Centraliza a imagem na div
            }
            else if (data.sport_content == "Vôlei"){
                sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_volleyball/v1/24px.svg')`;
                sportDiv.style.backgroundSize = 'contain'; // Ajusta o tamanho conforme necessário
                sportDiv.style.backgroundRepeat = 'no-repeat'; // Evita que a imagem se repita
                sportDiv.style.backgroundPosition = 'center'; // Centraliza a imagem na div
            }
            else if (data.sport_content == "Surf"){
                sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/surfing/v1/24px.svg')`;
                sportDiv.style.backgroundSize = 'contain'; // Ajusta o tamanho conforme necessário
                sportDiv.style.backgroundRepeat = 'no-repeat'; // Evita que a imagem se repita
                sportDiv.style.backgroundPosition = 'center'; // Centraliza a imagem na div
            }

        }

        const countryDiv = clone.querySelector('#country');
        if (data.country) {
            countryDiv.style.backgroundImage = `url('https://raw.githubusercontent.com/HatScripts/circle-flags/gh-pages/flags/${data.country_content}.svg')`;
            countryDiv.style.borderColor = "green";
        } else {
            countryDiv.style.backgroundImage = `url('https://raw.githubusercontent.com/HatScripts/circle-flags/gh-pages/flags/${data.country_content}.svg')`;
            countryDiv.style.borderColor = "red";

        }

        const statusDiv = clone.querySelector('#status');
        if (data.status) {
            statusDiv.style.background = "#1AEB31";
            if (data.status_content == "S") {
                statusDiv.textContent = "Ativo"
            }
            else {
                statusDiv.textContent = "Inativo"
            }

        } else {
            statusDiv.style.background = "#E21919";
            if (data.status_content == "S") {
                statusDiv.textContent = "Ativo"
            }
            else {
                statusDiv.textContent = "Inativo"
            }
        }

        const ageDiv = clone.querySelector("#age");
        if (data.age == "higher") { 
            ageDiv.style.background = "linear-gradient(to bottom, #1AEB31, #E21919)";
            ageDiv.textContent = data.age_content
        } else if (data.age == "lower") { 
            ageDiv.style.background = "linear-gradient(to bottom, #E21919, #1AEB31)";
            ageDiv.textContent = data.age_content
        } else {
            ageDiv.style.background = "#1AEB31";
            ageDiv.textContent = data.age_content
        }

        if (data.result) {
            characters.splice(0, characters.length);
            openPopup(guess)
        } else {
            const index = characters.indexOf(guess);
            characters.splice(index, 1);
        }
        
        document.getElementById('tries').appendChild(clone);
    })
    .catch(error => console.error('Error:', error));
}

// Sugestões

function showSuggestions() {
    const input = document.getElementById("guess").value.toLowerCase();
    const suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.innerHTML = "";

    if (input) {
        const filteredCharacters = characters.filter(character =>
            character.toLowerCase().includes(input)
        );

        filteredCharacters.forEach(character => {
            const suggestionDiv = document.createElement("div");
            suggestionDiv.className = "suggestion";
            suggestionDiv.textContent = character;
            suggestionDiv.onmousedown = () => {
                document.getElementById("guess").value = character;
                submitGuess(character)
                suggestionsContainer.innerHTML = "";
            };
            suggestionsContainer.appendChild(suggestionDiv);
        });
    }
}

function showAllSuggestions() {
    const suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.innerHTML = "";

    if (input = ' ') {
        characters.forEach(character => {
            const suggestionDiv = document.createElement("div");
            suggestionDiv.className = "suggestion";
            suggestionDiv.textContent = character;
            suggestionDiv.onmousedown = () => {
                document.getElementById("guess").value = character;
                submitGuess(character)
                suggestionsContainer.innerHTML = "";
            };
            suggestionsContainer.appendChild(suggestionDiv);
        });
    }
}

function hideAllSuggestions() {
    const suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.innerHTML = "";
}
