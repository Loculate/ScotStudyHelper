document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add("fade-in");
});

window.addEventListener("beforeunload", function() {
    document.body.classList.remove("fade-in");
});