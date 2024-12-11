function setCookie(name, value, exp) {
    document.cookie = `${name}=${value};expires=${new Date(Date.now() + exp)};path=/`;
}

const decodedCookieArray = decodeURIComponent(document.cookie).split(";").map((cookie) => cookie.trim());

function getCookie(name) {
    for (const cookie of decodedCookieArray) {
        if (cookie.indexOf(name + "=") == 0) {
            return cookie.substring(name.length + 1);
        } 
    }
}