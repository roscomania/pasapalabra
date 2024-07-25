let dom, reloj, roscoActivo, roscoEnEspera, partida, modal;


function iniciarJuego() {
    var urlParams = new URLSearchParams(window.location.search);
    var esFormulario = urlParams.has('form');
    const jugador1 = localStorage.getItem('jugador1');
    const jugador2 = localStorage.getItem('jugador2');
    const checkboxPorTiempo = localStorage.getItem('porTiempo');
    const segundos = localStorage.getItem('segundos');
    const comodines = localStorage.getItem('comodines');

    if (!esFormulario) {
        const redirect = window.location.href.replace('rosco.html', 'index.html').replace(window.location.search, '')
        window.open(redirect, '_self');
    }

    history.replaceState(null, '', window.location.href.replace(window.location.search, '?form=1'));

    dom = new DOM();
    modal = new Modal();
    reloj = new Reloj();
    partida = new Partida(jugador1, jugador2, checkboxPorTiempo, segundos, comodines);
    
    if (partida.porTiempo === "true") {
        dom.DIV_CONTAINER_SEGUNDOS.style.display = 'block';
        dom.CONTAINER_PLAY_PAUSA.style.display = 'block';
        dom.NUMERO_VUELTA.style.display = 'none';
    } else if (partida.porTiempo === "false") {
        dom.DIV_CONTAINER_SEGUNDOS.style.display = 'none';
        dom.CONTAINER_PLAY_PAUSA.style.display = 'none';
        dom.NUMERO_VUELTA.style.display = 'block';
    }
    dom.refrescar();
}
