///
const demoId = crypto.randomUUID();

const Data = {
    userId: demoId,
    deviceId: crypto.randomUUID(),
    expires: Date.now() + 86400000
};

const encoded = btoa(
    encodeURIComponent(JSON.stringify(Data))
);

localStorage.setItem("SLARDARsso_fe_web", encoded);
///
localStorage.setItem("__tea_cache_first_2227", "1");
///
const webData = {
    web_id: crypto.randomUUID().replace(/-/g, "").slice(0, 19),
    user_unique_id: crypto.randomUUID().replace(/-/g, "").slice(0, 19),
    timestamp: Date.now(),
    _type_: "default"
};

localStorage.setItem("__tea_cache_tokens_2227", JSON.stringify(webData));
///
localStorage.setItem("i18nextLng", "en-US");
///
const bytes = new Uint8Array(96);
crypto.getRandomValues(bytes);

const msTokenValue = btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

localStorage.setItem("msToken", msTokenValue);
///
const bytes2 = new Uint8Array(48);
crypto.getRandomValues(bytes2);

const tt_scidValue = btoa(String.fromCharCode(...bytes2))
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 64);

localStorage.setItem("tt_scid", tt_scidValue);
///
const bytes3 = new Uint8Array(17);
crypto.getRandomValues(bytes3);

const ttcidValue = Array.from(bytes3, byte => 
    byte.toString(16).padStart(2, "0")
).join("");

localStorage.setItem("ttcid", ttcidValue);
///
const number = Math.floor(100 + Math.random() * 900);

localStorage.setItem("xmsi", number.toString());
///
const bytes4 = new Uint8Array(112);
crypto.getRandomValues(bytes4);

const xmstValue = btoa(String.fromCharCode(...bytes4))
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

localStorage.setItem("xmst", xmstValue);
///
const data = {
    sTm: Date.now(),
    acc: Math.floor(Math.random() * 1000)
};

localStorage.setItem("xmstr", JSON.stringify(data));
///
