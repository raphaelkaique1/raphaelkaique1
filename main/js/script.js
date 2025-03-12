// 'use strict';

const yearStart = 2020;
const currentYear = new Date().getFullYear();
const xp = currentYear - yearStart;

document.getElementById("year").textContent = currentYear;
document.getElementById("xp").textContent = xp;

// Dicionário de Tradução
const translations = {
    en: {
        index1: "Home",
        index2: "About",
        index3: "Projects",
        index4: "Contact",
        button: "🇺🇸"
    },
    pt: {
        index1: "Início",
        index2: "Sobre",
        index3: "Projetos",
        index4: "Contato",
        button: "🇧🇷"
    }
};

// Função para alterar o idioma
function changeLanguage(lang) {
    document.getElementById("index1").textContent = translations[lang].index1;
    document.getElementById("index2").textContent = translations[lang].index2;
    document.getElementById("index3").textContent = translations[lang].index3;
    document.getElementById("index4").textContent = translations[lang].index4;
    document.getElementById("toggle-lang").textContent = translations[lang].button;

    // Salva o idioma no localStorage
    localStorage.setItem("selectedLanguage", lang);
}

// Detecta a escolha do usuário ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "pt";
    changeLanguage(savedLanguage);
});

// Adiciona evento ao botão para alternar idiomas
document.getElementById("toggle-lang").addEventListener("click", () => {
    const currentLanguage = localStorage.getItem("selectedLanguage") || "pt";
    const newLanguage = currentLanguage === "pt" ? "en" : "pt";
    changeLanguage(newLanguage);
});