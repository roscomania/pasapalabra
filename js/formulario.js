function validarInputs() {
    const jugador1 = document.getElementById("jugador1");
    const jugador2 = document.getElementById("jugador2");
    const checkboxPorTiempo = document.getElementById("checkboxPorTiempo");
    const segundos = document.getElementById("segundos");
    const comodines = document.getElementById("comodines");

    if (!jugador1.value) {
        jugador1.setCustomValidity('Por favor, complete este campo.');
        return false;
    }
    
    if (!jugador2.value) {
        jugador2.setCustomValidity('Por favor, complete este campo.');
        return false;
    }

    if (jugador1.value.toUpperCase() === jugador2.value.toUpperCase()) {
        jugador2.setCustomValidity('Los nombres de los jugadores no pueden ser iguales.');
        return false;
    }

    localStorage.setItem('jugador1', jugador1.value);
    localStorage.setItem('jugador2', jugador2.value);
    localStorage.setItem('checkboxPorTiempo', checkboxPorTiempo.checked);
    localStorage.setItem('segundos', segundos.value);
    localStorage.setItem('comodines', comodines.value);
    return true;
}
