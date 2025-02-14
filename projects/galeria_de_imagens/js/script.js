'use strict';

const theme = document.getElementById("theme");
theme.addEventListener("click", function() {
    document.body.classList.toggle("dark-theme");
    let className = document.body.className;
    className == "light-theme" ? this.textContent = "switch dark theme" : this.textContent = "switch light theme";
});