'use strict';

const yearStart = 2020;
const currentYear = new Date().getFullYear();
const xp = currentYear - yearStart;

document.getElementById("year").textContent = currentYear;
document.getElementById("xp").textContent = xp;