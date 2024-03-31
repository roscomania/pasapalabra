document.addEventListener("keydown", function(e) {
    e = e || window.event;
    if (e.code === ENTER) {
        document.getElementById("botonComenzar").click();
    } else return;
});


function onLoad() {
    var checkbox = document.getElementById("checkboxPorTiempo");
    var input = document.getElementById("segundos");

    checkbox.checked = true;
    input.disabled = !checkbox.checked;
}


function toggleSegundosIniciales() {
    var checkbox = document.getElementById("checkboxPorTiempo");
    var input = document.getElementById("segundos");

    input.disabled = !checkbox.checked;

}
