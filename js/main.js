let dom, reloj, roscoActivo, partida;


function iniciarJuego() {
    var urlParams = new URLSearchParams(window.location.search);
    var esFormulario = urlParams.has('form');

    const jugador1 = localStorage.getItem('jugador1');
    const jugador2 = localStorage.getItem('jugador2');
    const segundos = localStorage.getItem('segundos');
    const comodines = localStorage.getItem('comodines');
    
    if (!esFormulario) {
        const redirect = window.location.href.replace('rosco.html', 'index.html').replace(window.location.search, '')
        window.open(redirect, '_self');
    }

    dom = new DOM();
    reloj = new Reloj();
    partida = new Partida(jugador1, jugador2, segundos, comodines);

    dom.refrescar();
}
