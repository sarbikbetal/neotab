const getFavicon = (url) => {
    let siteUrl = url;
    try {
        siteUrl = new URL(url).origin;
    } catch (error) {
        siteUrl = "https://" + (url.split("/")[0] || url);
    }
    return siteUrl + "/favicon.ico";
}

const loadDefault = (e, url) => {
    e.target.src =
        "https://s2.googleusercontent.com/s2/favicons?domain_url=" + url;
}

export { getFavicon, loadDefault };