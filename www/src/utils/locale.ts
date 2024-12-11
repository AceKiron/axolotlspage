export type TranslateResult = {
    time: string;
    html: string;
}

export const translate = (payload: any, locale: string, timezone: string): TranslateResult => {
    const dateTimeFormatter = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    const time = dateTimeFormatter.format(new Date(payload.timestamp)).replace("a.m.", "AM").replace("p.m.", "PM");
    let html = "";

    if (locale == "nl-NL") {
        if (payload.kind == "SOURCE_RECVEIVED_REVIEW") html = `<a href="/source/${payload.source.id}/${payload.source.link}" class="highlight">${payload.source.link}</a> heeft een waardering ontvangen van ${payload.username}`;
        else if (payload.kind == "POST_EDITED") html = `Post <a href="/post/${payload.post.id}/${payload.post.urlName}" class="highlight">${payload.post.displayName}</a> is bewerkt door ${payload.username}`;
        else if (payload.kind == "POST_PUBLISHED") html = `Post <a href="/post/${payload.post.id}/${payload.post.urlName}" class="highlight">${payload.post.displayName}</a> is gepubliceerd door ${payload.username}`;
        else if (payload.kind == "USER_REGISTERED") html = `${payload.username} is geregistreerd`;
    }
    else if (locale == "en-GB") {
        if (payload.kind == "SOURCE_RECVEIVED_REVIEW") html = `<a href="/source/${payload.source.id}/${payload.source.link}" class="highlight">${payload.source.link}</a> received a review from ${payload.username}`;
        else if (payload.kind == "POST_EDITED") html = `Post <a href="/post/${payload.post.id}/${payload.post.urlName}" class="highlight">${payload.post.displayName}</a> was edited by ${payload.username}`;
        else if (payload.kind == "POST_PUBLISHED") html = `Post <a href="/post/${payload.post.id}/${payload.post.urlName}" class="highlight">${payload.post.displayName}</a> was published by ${payload.username}`;
        else if (payload.kind == "USER_REGISTERED") html = `${payload.username} has registered`;
    }
    
    return { time, html };
}