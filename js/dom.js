class DOM {
    constructor() {
        this.ICONO_PLAY = document.getElementById("iconoPlay");
        this.DIV_LETRA = document.getElementsByClassName("letra");
        this.DIV_ACIERTOS = document.getElementById("aciertos");
        this.DIV_ERRORES = document.getElementById("errores");
        this.DIV_CONTAINER_SEGUNDOS = document.getElementById("containerSegundos");
        this.DIV_SEGUNDOS = document.getElementById("segundos");
        this.CONTAINER_PLAY_PAUSA = document.getElementById("containerPlayPausa");
        this.LETRA_CENTRAL = document.getElementById("letraCentral");
        this.NOMBRE_JUGADOR = document.getElementById("nombreJugador");
        this.NOMBRE_RIVAL = document.getElementById("nombreRival");
        this.ACIERTOS_RIVAL = document.getElementById("aciertosRival");
        this.ERRORES_RIVAL = document.getElementById("erroresRival");
        this.CONTENEDOR_SEGUNDOS_RIVAL = document.getElementById("contenedorSegundosRival");
        this.SEGUNDOS_RIVAL = document.getElementById("segundosRival");
        this.COMODINES = document.getElementById("comodines");
    }

    _marcarJuegoTerminado() {
        this.LETRA_CENTRAL.style.fontSize = "7vh";
        this.LETRA_CENTRAL.style.webkitTextStroke = "0.15vh cyan";
        this.LETRA_CENTRAL.innerHTML = "Juego terminado";
        reloj.pausar();
        roscoActivo.juegoTerminado = true;
    }

    _marcarJuegoContinua() {
        this.LETRA_CENTRAL.style.fontSize = "35vh";
        this.LETRA_CENTRAL.style.webkitTextStroke = "0.75vh cyan";
        this.LETRA_CENTRAL.innerHTML = roscoActivo.pendientes[0].innerText;
        roscoActivo.juegoTerminado = false;
    }

    _refrescarAciertosErrores() {
        this.DIV_ACIERTOS.innerHTML = roscoActivo.aciertos.length;
        this.DIV_ERRORES.innerHTML = roscoActivo.errores.length;
    }

    _refrescarTextoCentral() {
        if (roscoActivo.milisegundos > 0 && roscoActivo.pendientes.length > 0) {
            this._marcarJuegoContinua();
        } else {
            this._marcarJuegoTerminado();
        }
    }

    deshabilitarHabilitarComodin(boton) {
        boton.classList.toggle("disabled");
    }

    marcarPasadasComoPendientes() {
        for (const letra of roscoActivo.pasadas) {
            letra.style.background = COLOR_FONDO_PENDIENTE;
        }
    }

    refrescarSegundos() {
        this.DIV_SEGUNDOS.innerHTML = roscoActivo.segundos;
        
        this._refrescarTextoCentral();
    }

    refrescarRespuesta(letra) {
        if (roscoActivo.aciertos.includes(letra)) {
            letra.style.background = COLOR_FONDO_ACIERTO;
        } else if (roscoActivo.errores.includes(letra)) {
            letra.style.background = COLOR_FONDO_ERROR;
        } else if (roscoActivo.pasadas.includes(letra)) {
            letra.style.background = COLOR_FONDO_PASADA;
        } else if (roscoActivo.pendientes.includes(letra)) {
            letra.style.background = COLOR_FONDO_PENDIENTE;
        }

        this._refrescarTextoCentral();
        this._refrescarAciertosErrores();
    }

    refrescarBotonPlayPausa() {
        if (reloj.tiempoCorre) {
            this.ICONO_PLAY.classList.remove("fa-play");
            this.ICONO_PLAY.classList.add("fa-pause");
        } else {
            this.ICONO_PLAY.classList.remove("fa-pause");
            this.ICONO_PLAY.classList.add("fa-play");
        }
    }

    refrescar() {
        for (const letra of this.DIV_LETRA) {
            if (roscoActivo.aciertos.includes(letra)) {
                letra.style.background = COLOR_FONDO_ACIERTO;
            } else if (roscoActivo.errores.includes(letra)) {
                letra.style.background = COLOR_FONDO_ERROR;
            } else if (roscoActivo.pasadas.includes(letra)) {
                letra.style.background = COLOR_FONDO_PASADA;
            } else if (roscoActivo.pendientes.includes(letra)) {
                letra.style.background = COLOR_FONDO_PENDIENTE;
            }
        }

        this.NOMBRE_JUGADOR.innerHTML = roscoActivo.nombreJugador;
        this.NOMBRE_RIVAL.innerHTML = roscoEnEspera.nombreJugador;

        this.DIV_ACIERTOS.innerHTML = roscoActivo.aciertos.length;
        this.ACIERTOS_RIVAL.innerHTML = roscoEnEspera.aciertos.length;

        this.DIV_ERRORES.innerHTML = roscoActivo.errores.length;
        this.ERRORES_RIVAL.innerHTML = roscoEnEspera.errores.length;
        
        this.DIV_SEGUNDOS.innerHTML = roscoActivo.segundos;
        if (partida.porTiempo === "true") {
            this.CONTENEDOR_SEGUNDOS_RIVAL.style.display = "block";
        } else if (partida.porTiempo === "false") {
            this.CONTENEDOR_SEGUNDOS_RIVAL.style.display = "none";
        }
        this.SEGUNDOS_RIVAL.innerHTML = roscoEnEspera.segundos;
        
        this._refrescarTextoCentral();
        this.refrescarBotonPlayPausa();
        this.refrescarComodines();
    }

    refrescarComodines() {
        if (!roscoActivo.comodinesHabilitados) {
            this.COMODINES.style.display = 'none';
        } else {
            let comodinesHTML = '';
            let iconosComodines = [null, 'book', 'exchange']
            let textosComodines = ['x2', null, null]
            for (let i = 0; i < partida.comodines; i++) {
                let disabled = roscoActivo.comodines.includes(i) ? 'enabled' : 'disabled';
                let icono = iconosComodines[i] ? `<i class="fa fa-${iconosComodines[i]}" aria-hidden="true"></i>` : `<b>${textosComodines[i]}</b>`
                comodinesHTML += `
                    <div id="${i}" onclick="roscoActivo.deshabilitarHabilitarComodin(this);"
                    class="${disabled} circulo botonCircular comodin comodin${i}">
                        ${icono}
                    </div>
                `;
            }
            
            this.COMODINES.innerHTML = comodinesHTML;
            this.COMODINES.style.display = 'block';
        };
    }
}
