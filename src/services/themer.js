const themes = {
    "Light": {
        "--header-bg-color": "#fff",
        "--primary": " #edf2f7",
        "--primary-light": " #e2e8f0",
        "--secondary": "#38b2ac",
        "--board": "#f7fafc",
        "--accent": "#f6e05e",
        "--accent-light": "#faf089",
        "--link": "#2c7a7b",
        "--text-strong": "#4a5568",
        "--text": "#718096",
        "--text-light": "#a0aec0",
    },
    "Dark": {
        "--header-bg-color": "#212121",
        "--primary": " #323232",
        "--primary-light": " #353535",
        "--secondary": "#f687b3",
        "--board": "#121212",
        "--accent": "#81e6d9",
        "--accent-light": "#b2f5ea",
        "--link": "#b2f5ea",
        "--text-strong": "#d6d6d6",
        "--text": "#c4c4c4",
        "--text-light": "#838383",
    }
}

const setTheme = (name) => {
    let root = document.documentElement;
    const themeData = themes[name];
    if (!themeData)
        return;

    for (const key in themeData) {
        if (themeData.hasOwnProperty(key)) {
            const color = themeData[key];
            root.style.setProperty(key, color);
        }
    }
}

export { setTheme }