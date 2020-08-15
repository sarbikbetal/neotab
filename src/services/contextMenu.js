function showMenu(e, focusedCard, selectedText) {
    e.preventDefault();
    const origin = {
        left: e.pageX,
        top: e.pageY,
    };

    let levels = 3;
    let target = e.target;
    focusedCard = undefined;
    while (levels--) {
        if (target.hasAttribute("card")) {
            focusedCard = parseInt(target.getAttribute("card"));
            break;
        } else target = target.parentElement;
    }

    setPosition(origin);
    selectedText = copyText();
}

function setPosition({ top, left }) {
    const menu = document.querySelector(".menu");
    // menu.style.left = `${left}px`;
    // menu.style.top = `${top}px`;

    let menuWidth = menu.offsetWidth + 4;
    let menuHeight = menu.offsetHeight + 4;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    if (windowWidth - left < menuWidth) {
        menu.style.left = windowWidth - menuWidth + "px";
    } else {
        menu.style.left = left + "px";
    }

    if (windowHeight - top < menuHeight) {
        menu.style.top = windowHeight - menuHeight + "px";
    } else {
        menu.style.top = top + "px";
    }

    this.menuVisible = true;
}
function hideMenu() {
    this.menuVisible = false;
}

function copyText() {
    let text = "";
    let activeEl = document.activeElement;
    let activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
        activeElTagName == "textarea" ||
        (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
            typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(
            activeEl.selectionStart,
            activeEl.selectionEnd
        );
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}