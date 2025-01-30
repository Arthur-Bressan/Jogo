const translations = {};
let currentLang = "pt";

// Função para carregar as traduções
async function loadTranslations() {
    try {
        const response = await fetch("translationsIndex.json");
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
        }
        Object.assign(translations, await response.json());

        // Aplicar traduções ao carregar
        applyTranslations();
    } catch (error) {
        console.error("Erro ao carregar as traduções:", error);
    }
}

// Função para aplicar as traduções
function applyTranslations() {
    if (!translations[currentLang]) {
        console.error(`Tradução para "${currentLang}" não encontrada.`);
        return;
    }

    const langData = translations[currentLang];

    // Verifica se os elementos existem antes de tentar alterá-los
    if (document.getElementById("title")) 
        document.getElementById("title").innerText = langData.title;

    if (document.getElementById("about-us-title")) 
        document.getElementById("about-us-title").innerText = langData.about_us.title;

    if (document.getElementById("about-us-subtitle")) 
        document.getElementById("about-us-subtitle").innerText = langData.about_us.subtitle;

    if (document.getElementById("about-us-content")) 
        document.getElementById("about-us-content").innerText = langData.about_us.content;

    if (document.getElementById("snct-title")) 
        document.getElementById("snct-title").innerText = langData.snct.title;

    if (document.getElementById("snct-subtitle")) 
        document.getElementById("snct-subtitle").innerText = langData.snct.subtitle;

    if (document.getElementById("snct-content")) 
        document.getElementById("snct-content").innerText = langData.snct.content;

    if (document.getElementById("game-title")) 
        document.getElementById("game-title").innerText = langData.game.title;

    if (document.getElementById("game-button")) 
        document.getElementById("game-button").innerText = langData.game.button_text;
}

// Função chamada quando o idioma muda
function changeLanguage() {
    currentLang = document.getElementById("language").value;
    applyTranslations();
}

// Carregar traduções ao iniciar
loadTranslations();
