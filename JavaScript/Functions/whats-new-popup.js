window.onload = function() {
    var popup = document.getElementById("popup");
    var close = document.getElementsByClassName("close")[0];

    if (!sessionStorage.getItem('popupShown')) {
        popup.style.display = "block";
        sessionStorage.setItem('popupShown', 'true');
    }

    close.onclick = function() {
        popup.style.display = "none";
    }
}
