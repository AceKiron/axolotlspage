const locale = getCookie("locale");

const translate = (key) => {
    if (locale == "nl-NL") {
        if (key == "NAV_HOMEPAGE") return "Homepagina";
        else if (key == "NAV_REVIEWS") return "Waarderingen";
        else if (key == "NAV_FORUM") return "Forum";
        else if (key == "NAV_SIGN_OUT") return "Uitloggen";
        else if (key == "NAV_SIGN_IN") return "Inloggen";
        else if (key == "NAV_REGISTER") return "Registreren";
    } else if (locale == "en-GB") {
        if (key == "NAV_HOMEPAGE") return "Homepage";
        else if (key == "NAV_REVIEWS") return "Reviews";
        else if (key == "NAV_FORUM") return "Forum";
        else if (key == "NAV_SIGN_OUT") return "Sign out";
        else if (key == "NAV_SIGN_IN") return "Sign in";
        else if (key == "NAV_REGISTER") return "Register";
    }
}

const translateElement = (item) => {
    item.innerText = translate(item.getAttribute("locale-key"));
}

document.querySelectorAll("[locale-key]").forEach(translateElement);