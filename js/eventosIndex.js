document.addEventListener("keydown", function(e) {
    e = e || window.event;
    if (e.code === ENTER) {
        document.getElementById("botonComenzar").click();
    } else return;
});
