const bytes = new Uint8Array(96);
crypto.getRandomValues(bytes);

const msTokenValue = btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

localStorage.setItem("msToken", msTokenValue);
