class APIRequest {
    constructor(path) {
        this.path = path;
    }

    setMethod(method) {
        this.method = method;
        return this;
    }

    setHost(host) {
        this.host = host;
        return this;
    }

    setExpectedStatus(expectedStatus) {
        this.expectedStatus = expectedStatus;
        return this;
    }

    setBody(body) {
        this.body = body;
        return this;
    }

    send() {
        const req = this;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(req.method || "GET", `${req.host || "http://localhost:3157"}${req.path || "/"}`, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    const parsed = JSON.parse(xhr.responseText);
                    if (parsed.accessToken) setCookie("accessToken", parsed.accessToken.value, parsed.accessToken.maxAge);
                    if (parsed.refreshToken) setCookie("refreshToken", parsed.refreshToken.value, parsed.refreshToken.maxAge);
                    resolve(parsed);
                }
            };

            xhr.send(JSON.stringify({
                accessToken: getCookie("accessToken"),
                refreshToken: getCookie("refreshToken"),
                ...(req.body || {})
            }));
        });
    }
}

(async () => {
    console.log(
        await new APIRequest("/auth/login")
            .setBody({
                "email": "test@email.com",
                "password": "testPass"
            })
            .setMethod("POST")
            .send()
    );
})();