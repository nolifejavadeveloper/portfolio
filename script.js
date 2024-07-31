function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function getCookie(cname) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let c of ca) {
        c = c.trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getBooleanCookie(name) {
    return getCookie(name) === "true";
}

const textElement = document.querySelector(".info .tags span");
const body = document.querySelector("body");
const transitionTime = 750;
const darkName = "darkmode";
let dark = getBooleanCookie(darkName);
let typingIndex = 1;
let textIndex = 0;
let hasSet = false;

const texts = [
    "Developer",
    "Gamer",
    "Ex. Skyblock Addict",
    "Pre-Highschooler",
];

const typeText = (text) => {
    textElement.textContent = text.slice(0, typingIndex);
    typingIndex++;
    if (typingIndex <= text.length) {
        setTimeout(() => typeText(text), 50 + (Math.random() * 100));
    } else {
        setTimeout(() => deleteText(text), 2000 + (Math.random() * 500));
    }
};

const deleteText = (text) => {
    textElement.textContent = text.slice(0, typingIndex);
    typingIndex--;
    if (typingIndex >= 0) {
        setTimeout(() => deleteText(text), 75);
    } else {
        typingIndex = 1;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(() => typeText(texts[textIndex]), 1500);
    }
};

const startRotating = () => {
    typeText(texts[textIndex]);
};

startRotating();

const toggleDark = () => {
    dark ? body.classList.remove("dark") : body.classList.add("dark");
    setDarkMode(!dark);
};

function setDarkMode(boolean) {
    dark = boolean;
    setCookie(darkName, boolean, 14);
}

document.addEventListener("DOMContentLoaded", () => {
    if (getBooleanCookie(darkName)) {
        body.classList.add("dark");
        dark = true;
        setTimeout(() => {
            body.style.transition = `${transitionTime}ms`;
            hasSet = true;
        }, transitionTime);
    } else {
        body.style.transition = `${transitionTime}ms`;
        hasSet = true;
    }
});

document.getElementById("toggle").onclick = () => {
    if (!hasSet) {
        hasSet = true;
        body.style.transition = `${transitionTime}ms`;
    }
    toggleDark();
};
