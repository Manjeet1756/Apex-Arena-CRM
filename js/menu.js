function openMenu() {

    document
        .getElementById("sidebar")
        .classList
        .remove("-translate-x-full");

    document
        .getElementById("overlay")
        .classList
        .remove("hidden");

}

function closeMenu() {

    document
        .getElementById("sidebar")
        .classList
        .add("-translate-x-full");

    document
        .getElementById("overlay")
        .classList
        .add("hidden");

}