function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function getBooleanCookie(name) {
    const value = getCookie(name);
    return value === "true";
  }

  const text = document.querySelector(".info .tags span");
  const body = document.querySelector("body");
  const transitionTime = 750
  
  const darkName = "darkmode";
  let dark = getBooleanCookie(darkName);

  const textRotate = () => {
    const texts = [
      "Developer",
      "Gamer",
      "Ex. Skyblock Addict",
      "Pre-Highschooler",
    ];
    let index = 0;

    setInterval(() => {
      text.textContent = texts[index];
      index = (index + 1) % texts.length;
    }, 4000);
  };

  textRotate();

  const toggleDark = () => {
    if (dark) {
        body.classList.remove("dark");
        setDarkMode(false);
    } else {
      body.classList.add("dark");
      setDarkMode(true);
    }
  };

  function setDarkMode(boolean) {
    dark = boolean;
    setCookie(darkName, boolean, 14);
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (getBooleanCookie(darkName)) {
      body.classList.add("dark");
      dark = true;
    }

    setTimeout(() => {
        body.style.transition = transitionTime + "ms"
    }, 750)
  });

  document.getElementById("toggle").onclick = () => {
    toggleDark();
  };