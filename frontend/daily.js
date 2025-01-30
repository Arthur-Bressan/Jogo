// Seleciona todos os parágrafos com a classe 'hover-target' e as divs correspondentes
const hoverTargets = document.querySelectorAll(".hover-target");
const hoverInfos = document.querySelectorAll(".hover-info");

// Função para atualizar a posição da div de informações
function moveInfo(e, infoDiv) {
  const offsetX = 15; // Distância em pixels do mouse
  const offsetY = 15;

  // Obtém as dimensões da tela e da div de informações
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const infoWidth = infoDiv.offsetWidth;
  const infoHeight = infoDiv.offsetHeight;

  let newX = e.pageX + offsetX;
  let newY = e.pageY + offsetY;

  // Ajusta a posição para não ultrapassar os limites da tela
  if (newX + infoWidth > screenWidth) {
    newX = screenWidth - infoWidth - offsetX;
  }
  if (newY + infoHeight > screenHeight) {
    newY = screenHeight - infoHeight - offsetY;
  }

  infoDiv.style.left = `${newX}px`;
  infoDiv.style.top = `${newY}px`;
}

// Adiciona evento de 'mouseenter' e 'mousemove' nos parágrafos
hoverTargets.forEach((target, index) => {
  const infoDiv = hoverInfos[index];

  target.addEventListener("mouseenter", () => {
    infoDiv.style.display = "block";
    infoDiv.setAttribute("data-visible", "true"); // Marca como visível
  });

  target.addEventListener("mousemove", (e) => {
    moveInfo(e, infoDiv);
  });

  target.addEventListener("mouseleave", () => {
    infoDiv.style.display = "none";
    infoDiv.removeAttribute("data-visible"); // Remove a marcação de visibilidade
  });
});

// Esconde a div de informações ao clicar fora dela em dispositivos móveis
document.addEventListener("click", (e) => {
  hoverInfos.forEach((infoDiv) => {
    if (!infoDiv.contains(e.target) && !Array.from(hoverTargets).some(target => target.contains(e.target))) {
      if (infoDiv.getAttribute("data-visible") !== "true") {
        infoDiv.style.display = "none";
      }
    }
  });
});

///////

const translations = {};
let currentLang = "pt";

// Função para carregar as traduções
async function loadTranslations() {
  try {
    const response = await fetch("translations.json");
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
    }
    Object.assign(translations, await response.json());
    applyTranslations();
  } catch (error) {
    console.error("Erro ao carregar as traduções:", error);
  }
}

// Função para aplicar as traduções
function applyTranslations() {
  const langData = translations[currentLang];
  if (!langData) {
    console.error(`Tradução para "${currentLang}" não encontrada.`);
    return;
  }

  document.getElementById("how_to_play").innerText = langData.how_to_play;
  document.getElementById("game_objective").innerText = langData.tutorial.game_objective;

  document.getElementById("title").innerText = langData.title;
  document.getElementById("guess_athlete").innerText = langData.guess_athlete;
  document.getElementById("tentativas").innerText = langData.attempts;

  // Atualizando as legendas
  const legenda = langData.legenda;
  document.getElementById(
    "name"
  ).innerHTML = `<u>${legenda.name}<strong>?</strong></u>`;
  document.getElementById("name-info").innerText = legenda.name_info;
  document.getElementById(
    "gender"
  ).innerHTML = `<u>${legenda.gender}<strong>?</strong></u>`;
  document.getElementById("gender-info").innerText = legenda.gender_info;
  document.getElementById(
    "sport"
  ).innerHTML = `<u>${legenda.sport}<strong>?</strong></u>`;
  document.getElementById("sport-info").innerText = legenda.sport_info;
  document.getElementById(
    "country"
  ).innerHTML = `<u>${legenda.country}<strong>?</strong></u>`;
  document.getElementById("country-info").innerText = legenda.country_info;
  document.getElementById(
    "active"
  ).innerHTML = `<u>${legenda.active}<strong>?</strong></u>`;
  document.getElementById("active-info").innerText = legenda.active_info;
  document.getElementById(
    "age"
  ).innerHTML = `<u>${legenda.age}<strong>?</strong></u>`;
  document.getElementById("age-info").innerText = legenda.age_info;

  // Atualizando as instruções
  const instructions = document.getElementById("instructions");
  instructions.innerHTML = ""; // Limpar instruções antigas
  langData.instructions.forEach((text) => {
    const li = document.createElement("li");
    li.innerText = text;
    instructions.appendChild(li);
  });
}

// Função chamada quando a seleção de idioma muda
function changeLanguage() {
  const languageSelect = document.getElementById("language");
  currentLang = languageSelect.value; // Define o idioma selecionado
  applyTranslations();
}

// Carregar traduções quando a página for carregada
loadTranslations();

////////////////////////

let characters = [];
// Inicializar
initializeGame();

const images = [
  "imgs/bask.png",
  "imgs/foot.png",
  "imgs/surf.png",
  "imgs/tennis.png",
  "imgs/volei.png",
];
let currentIndex = 0;
const backgroundElement = document.querySelector(".background");

function changeBackground() {
  backgroundElement.classList.add("fade-out");
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length;
    backgroundElement.style.backgroundImage = `url(${images[currentIndex]})`;
    backgroundElement.classList.remove("fade-out");
  }, 500);
}

backgroundElement.style.backgroundImage = `url(${images[currentIndex]})`;
setInterval(changeBackground, 20000);

// Jogadores

async function fetchCharacters() {
  const response = await fetch("http://localhost:5000/characters");
  const characters = await response.json();
  return characters.map((character) => character.name);
}

async function initializeGame() {
  characters = await fetchCharacters();
}

// Verfica Chute

let tentativas = 0;
let clique = 0;
var dicas = false;

function gethints() {
  clique += 1;
  dicas = true;
  localStorage.setItem("usouDicas", dicas);
  fetch("http://127.0.0.1:5000/characters/get-hint")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((character) => {
        let hintText = document.getElementById("hint_text");
        if (clique === 1) {
          hintText.innerHTML = `Dica 1: ${character.hint1}`;
          console.log(dicas + "click1");
        } else if (clique === 2) {
          hintText.innerHTML = `Dica 2: ${character.hint2}`;
          console.log(dicas + "click2");
        } else if (clique === 3) {
          hintText.innerHTML = `Dica 3: ${character.hint3}`;
          console.log(dicas + "click3");
        } else if (clique === 4) {
          hintText.innerHTML = `Apelido: ${character.nickname}`;
          console.log(dicas + "click4");
        } else if (clique === 5) {
          clique = 1;
          hintText.innerHTML = `Dica 1: ${character.hint1}`;
          console.log(dicas + "click5");
        }
      });
    })
    .catch((error) => console.error("Erro:", error));
}

function clearCookies() {
  fetch("/clear_cookies")
    .then((response) => response.text())
    .then((script) => {
      let scriptElement = document.createElement("script");
      scriptElement.innerHTML = script;
      document.body.appendChild(scriptElement);
    });
}

function closePopup() {
  document.getElementById("myPopup").style.display = "none";
}

function openPopup(guess) {
  document.getElementById("myPopup").style.display = "block";
  let jogador_text = document.getElementById("jogador");
  let tentativas_text = document.getElementById("tentativas_popup");
  let hints_text = document.getElementById("hint_popup");

  jogador_text.textContent = guess;
  tentativas_text.textContent = `Acertou em: ${tentativas} Tentativas`;

  console.log(dicas);

  dicas = verificarDicas();

  if (dicas !== true) {
    hints_text.textContent = `Acertou sem usar Dicas`;
  } else {
    hints_text.textContent = `Acertou usando Dicas`;
  }
}

function verificarDicas() {
  const dicasSalvas = localStorage.getItem("usouDicas");
  return dicasSalvas === "true"; // Converte a string para boolean
}

function openTutorial() {
  document.getElementById("tutorial").style.display = "block";
}

function closePopupTutorial() {
  document.getElementById("tutorial").style.display = "none";
}

function setLocalStorage(name, value) {
  localStorage.setItem(name, value);
}

function setLocalStorageHints(hint, value) {
  localStorage.setItem(hint, value);
}

function clearLocalStorage() {
  localStorage.clear();
}

function saveDivContents() {
  setTimeout(() => {
    const divs = document.querySelectorAll(".tentativa");
    const today = new Date().getDate();

    divs.forEach((div, index) => {
      div.setAttribute("data-index", index);
      div.setAttribute("data-date", today);
      const divContent = div.outerHTML;
      setLocalStorage(`divContent${index}`, divContent);
    });

    setLocalStorage("divCount", divs.length);
  }, 100);
}

function getLocalStorage(name) {
  return localStorage.getItem(name);
}

function loadDivContents() {
  const divCount = getLocalStorage("divCount");

  const divsArray = [];

  for (let i = 0; i < divCount; i++) {
    const today = new Date().getDate();
    const divContentString = getLocalStorage(`divContent${i}`);

    if (!divContentString) continue;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = divContentString;
    const divContent = tempDiv.firstElementChild;

    let date = divContent.getAttribute("data-date");

    if (date != today.toString()) {
      console.log(date);
      localStorage.removeItem(`divContent${i}`);
      continue;
    }

    divsArray.push(divContent);
  }

  divsArray.forEach((tempDiv) => {
    const tries_localStorage = tempDiv.querySelector(
      ".tentativa .try-message"
    ).textContent;
    submitGuess(tries_localStorage);
  });
}

function deleteLocalStorageAfterTime() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  console.log(`Hora atual: ${currentHour}:${currentMinute}`);

  if (currentHour === 10 && currentMinute === 43) {
    console.log("Hora de deletar os dados do localStorage");
    localStorage.clear();
    console.log("Dados do localStorage deletados após as 00:00");
  } else {
    console.log("Ainda não é hora de deletar os dados do localStorage");
  }
}

deleteLocalStorageAfterTime();
loadDivContents();

function submitGuess(guess) {
  fetch("http://localhost:5000/characters/verifyGuess", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ guess: guess }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("guess").value = "";
      let templateId = "error-template";
      const template = document.getElementById(templateId);
      const clone = document.importNode(template.content, true);

      tentativas++;
      document.getElementById(
        "tentativas"
      ).textContent = `Tentativas: ${tentativas}`;

      clone.querySelector(".try-message").textContent = `${guess}`;

      const sexDiv = clone.querySelector("#sex");
      if (data.sex) {
        sexDiv.style.background = "#1AEB31";
        sexDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/${data.sex_content}/v1/24px.svg')`;
        sexDiv.style.backgroundSize = "contain"; // Ajusta o tamanho conforme necessário
        sexDiv.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
        sexDiv.style.backgroundPosition = "center"; // Centraliza a imagem na div
      } else {
        sexDiv.style.background = "#E21919";
        sexDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/${data.sex_content}/v1/24px.svg')`;
        sexDiv.style.backgroundSize = "contain"; // Ajusta o tamanho conforme necessário
        sexDiv.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
        sexDiv.style.backgroundPosition = "center"; // Centraliza a imagem na div
      }

      const sportDiv = clone.querySelector("#sport");
      if (data.sport) {
        sportDiv.style.background = "#1AEB31";
        if (data.sport_content == "Futebol") {
          sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_soccer/v1/24px.svg')`;
          sportDiv.style.backgroundSize = "contain"; // Ajusta o tamanho conforme necessário
          sportDiv.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
          sportDiv.style.backgroundPosition = "center"; // Centraliza a imagem na div
        } else if (data.sport_content == "Tênis") {
          sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_tennis/v1/24px.svg')`;
          sportDiv.style.backgroundSize = "contain"; // Ajusta o tamanho conforme necessário
          sportDiv.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
          sportDiv.style.backgroundPosition = "center"; // Centraliza a imagem na div
        } else if (data.sport_content == "Basquete") {
          sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_basketball/v1/24px.svg')`;
          sportDiv.style.backgroundSize = "contain"; // Ajusta o tamanho conforme necessário
          sportDiv.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
          sportDiv.style.backgroundPosition = "center"; // Centraliza a imagem na div
        } else if (data.sport_content == "Vôlei") {
          sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_volleyball/v1/24px.svg')`;
          sportDiv.style.backgroundSize = "contain"; // Ajusta o tamanho conforme necessário
          sportDiv.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
          sportDiv.style.backgroundPosition = "center"; // Centraliza a imagem na div
        } else if (data.sport_content == "Surf") {
          sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/surfing/v1/24px.svg')`;
          sportDiv.style.backgroundSize = "contain"; // Ajusta o tamanho conforme necessário
          sportDiv.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
          sportDiv.style.backgroundPosition = "center"; // Centraliza a imagem na div
        }
      } else {
        sportDiv.style.background = "#E21919";
        if (data.sport_content == "Futebol") {
          sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_soccer/v1/24px.svg')`;
          sportDiv.style.backgroundSize = "contain"; // Ajusta o tamanho conforme necessário
          sportDiv.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
          sportDiv.style.backgroundPosition = "center"; // Centraliza a imagem na div
        } else if (data.sport_content == "Tênis") {
          sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_tennis/v1/24px.svg')`;
          sportDiv.style.backgroundSize = "contain"; // Ajusta o tamanho conforme necessário
          sportDiv.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
          sportDiv.style.backgroundPosition = "center"; // Centraliza a imagem na div
        } else if (data.sport_content == "Basquete") {
          sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_basketball/v1/24px.svg')`;
          sportDiv.style.backgroundSize = "contain"; // Ajusta o tamanho conforme necessário
          sportDiv.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
          sportDiv.style.backgroundPosition = "center"; // Centraliza a imagem na div
        } else if (data.sport_content == "Vôlei") {
          sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/sports_volleyball/v1/24px.svg')`;
          sportDiv.style.backgroundSize = "contain"; // Ajusta o tamanho conforme necessário
          sportDiv.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
          sportDiv.style.backgroundPosition = "center"; // Centraliza a imagem na div
        } else if (data.sport_content == "Surf") {
          sportDiv.style.backgroundImage = `url('https://fonts.gstatic.com/s/i/materialiconsoutlined/surfing/v1/24px.svg')`;
          sportDiv.style.backgroundSize = "contain"; // Ajusta o tamanho conforme necessário
          sportDiv.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
          sportDiv.style.backgroundPosition = "center"; // Centraliza a imagem na div
        }
      }

      const countryDiv = clone.querySelector("#country");
      if (data.country) {
        countryDiv.style.backgroundImage = `url('https://raw.githubusercontent.com/HatScripts/circle-flags/gh-pages/flags/${data.country_content}.svg')`;
        countryDiv.style.borderColor = "#1AEB31";
      } else {
        countryDiv.style.backgroundImage = `url('https://raw.githubusercontent.com/HatScripts/circle-flags/gh-pages/flags/${data.country_content}.svg')`;
        countryDiv.style.borderColor = "#E21919";
      }

      const statusDiv = clone.querySelector("#status");
      if (data.status) {
        statusDiv.style.background = "#1AEB31";
        if (data.status_content == "S") {
          statusDiv.textContent = "Ativo";
        } else {
          statusDiv.textContent = "Inativo";
        }
      } else {
        statusDiv.style.background = "#E21919";
        if (data.status_content == "S") {
          statusDiv.textContent = "Ativo";
        } else {
          statusDiv.textContent = "Inativo";
        }
      }

      const ageDiv = clone.querySelector("#age");
      const arrow = document.createElement("div");
      arrow.style.width = "0";
      arrow.style.height = "0";
      arrow.style.borderLeft = "5px solid transparent";
      arrow.style.borderRight = "5px solid transparent";

      // Condicional para o "age"
      if (data.age == "higher") {
        ageDiv.style.background =
          "linear-gradient(to bottom, #1AEB31, #E21919)";
        ageDiv.textContent = data.age_content;

        // Seta para cima
        arrow.style.borderBottom = "10px solid #FFFFFF"; // Define a seta para cima
        arrow.style.marginLeft = "3px";
        arrow.style.marginBottom = "3px";
        ageDiv.appendChild(arrow); // Adiciona a seta à div
      } else if (data.age == "lower") {
        ageDiv.style.background =
          "linear-gradient(to bottom, #E21919, #1AEB31)";
        ageDiv.textContent = data.age_content;

        // Seta para baixo
        arrow.style.borderTop = "10px solid #FFFFFF"; // Define a seta para baixo
        arrow.style.marginLeft = "3px"; // Afasta a seta do texto
        ageDiv.appendChild(arrow); // Adiciona a seta à div
      } else {
        ageDiv.style.background = "#1AEB31";
        ageDiv.textContent = data.age_content;

        // Se não for "higher" nem "lower", não adiciona seta
      }

      if (data.result) {
        console.log(data.result);
        saveDivContents();
        characters.splice(0, characters.length);
        openPopup(guess);
      } else {
        saveDivContents();
        const index = characters.indexOf(guess);
        characters.splice(index, 1);
      }

      document.getElementById("tries").appendChild(clone);
    })
    .catch((error) => console.error("Error:", error));
}

// Sugestões

function showSuggestions() {
  const input = document.getElementById("guess").value.toLowerCase();
  const suggestionsContainer = document.getElementById("suggestions");
  suggestionsContainer.innerHTML = "";

  if (input) {
    const filteredCharacters = characters.filter((character) =>
      character.toLowerCase().includes(input)
    );

    filteredCharacters.forEach((character) => {
      const suggestionDiv = document.createElement("div");
      suggestionDiv.className = "suggestion";
      suggestionDiv.textContent = character;
      suggestionDiv.onmousedown = () => {
        document.getElementById("guess").value = character;
        submitGuess(character);
        suggestionsContainer.innerHTML = "";
      };
      suggestionsContainer.appendChild(suggestionDiv);
    });
  }
}

function showAllSuggestions() {
  const suggestionsContainer = document.getElementById("suggestions");
  suggestionsContainer.innerHTML = "";

  if ((input = " ")) {
    characters.forEach((character) => {
      const suggestionDiv = document.createElement("div");
      suggestionDiv.className = "suggestion";
      suggestionDiv.textContent = character;
      suggestionDiv.onmousedown = () => {
        document.getElementById("guess").value = character;
        submitGuess(character);
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
