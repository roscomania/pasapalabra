document.addEventListener("keydown", function(e) {
    e = e || window.event;
    if (e.code === ENTER) {
        document.getElementById("botonComenzar").click();
    } else return;
});


function cargarEstado() {
    var checkbox = document.getElementById("checkboxPorTiempo");
    var input = document.getElementById("segundos");
    
    // Verifica si el checkbox está marcado
    if (localStorage.getItem("porTiempo") === "true") {
        checkbox.checked = true;
        // Habilitar o deshabilitar el input dependiendo del estado del checkbox
        input.disabled = false;
    } else {
        checkbox.checked = false;
        input.disabled = true;
    }
    
    // Recuperar el valor del input number si está disponible
    if (localStorage.getItem("segundos")) {
        input.value = localStorage.getItem("segundos");
    }
}


function guardarEstado() {
    var checkbox = document.getElementById("checkboxPorTiempo");
    var input = document.getElementById("segundos");
    
    // Guardar el estado del checkbox
    localStorage.setItem("porTiempo", checkbox.checked);
    
    // Guardar el valor del input number si está habilitado
    if (!input.disabled) {
        localStorage.setItem("segundos", input.value);
    }
}


function toggleSegundosIniciales() {
    var checkbox = document.getElementById("checkboxPorTiempo");
    var input = document.getElementById("segundos");

    input.disabled = !checkbox.checked;
}


window.onload = cargarEstado;
window.onbeforeunload = guardarEstado;
