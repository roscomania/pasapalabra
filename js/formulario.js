function validarInputs() {
    const jugador1 = document.getElementById("jugador1");
    const jugador2 = document.getElementById("jugador2");

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

    return true;
}
