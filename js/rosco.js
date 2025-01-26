class Rosco {
    constructor(nombreJugador, activo, segundos, comodines) {
        this.nombreJugador = nombreJugador;
        this.activo = activo;
        this.segundos = parseInt(segundos);
        this.segundosIniciales = segundos;
        this.milisegundos = segundos * 1000;
        this.comodines = Array.from({ length: parseInt(comodines) }, (_, i) => i);
        this.comodinesHabilitados = false;
        this.juegoTerminado = false;
        this.esPrimeraVuelta = true;
        this.debeCalcularDelay = false;
        this.numeroVuelta = 1;

        this.aciertos = [];
        this.errores = [];
        this.pasadas = [];
        this.pendientes = Array.from(dom.DIV_LETRA);
        this.delayCorregido = false;
    }

    actualizarRespuestas() {
        const letras = Array.from(dom.DIV_LETRA);

        this.aciertos = letras.filter(letra => letra.style.background == COLOR_FONDO_ACIERTO);
        this.errores = letras.filter(letra => letra.style.background == COLOR_FONDO_ERROR);
        this.pendientes = letras.filter(letra => letra.style.background == COLOR_FONDO_PENDIENTE || !letra.style.background);
        this.pasadas = letras.filter(letra => letra.style.background == COLOR_FONDO_PASADA);
    }

    deshabilitarHabilitarComodin(boton) {
        const index = parseInt(boton.id);

        if (this.comodines.includes(index)) {
            this.comodines = this.comodines.filter(indexComodin => indexComodin !== index);
        } else {
            this.comodines.push(index);
        }

        dom.deshabilitarHabilitarComodin(boton)
    }

    establecerSegundos(segundos) {
        const segundosPrevios = this.segundos;

        this.segundos = segundos;
        this.milisegundos = this.segundos * 1000;

        if (this.milisegundos > 0 && segundosPrevios <= 0) {
            clearInterval(reloj.interval);
            reloj.interval = setInterval(correrTiempo, 100);
        }

        dom.refrescarSegundos(this.segundos);
    }

    sumarSegundos(segundos) {
        segundos = this.segundos + segundos;
        this.establecerSegundos(segundos);
    }

    restarSegundos(segundos) {
        segundos = Math.max(0, this.segundos - segundos);
        this.establecerSegundos(segundos);
    }

    restablecerSegundosPorDelay() {
        if (this.delayCorregido || partida.porTiempo === 'false' || reloj.tiempoCorre) return;

        const aciertos = this.aciertos.length;
        const errores = this.errores.length;
        const segundosFinalPrimeraVuelta = this.segundosFinalPrimeraVuelta;

        let segundosCorriendoSegundaVuelta = 0;
        if(segundosFinalPrimeraVuelta !== undefined) {
            segundosCorriendoSegundaVuelta =  segundosFinalPrimeraVuelta - this.segundos;
        }

        let segundosCorrespondientes = -1.5 * (aciertos + errores) + (45 + this.segundosIniciales - 145) - segundosCorriendoSegundaVuelta;
        if(this.esPrimeraVuelta) {
            const pendientes = this.pendientes.length;
            if (pendientes != 25) {
                const respuestasEsperadas = (aciertos + errores) * 25 / (25 - pendientes);
                const segundosCorrespondientesEsperados = -1.5 * respuestasEsperadas + 45;
                const segundosConsumidosEsperados = this.segundosIniciales - segundosCorrespondientesEsperados;
                const segundosConsumidos = segundosConsumidosEsperados * (25 - pendientes) / 25;
                segundosCorrespondientes = this.segundosIniciales - segundosConsumidos;
            } else {
                segundosCorrespondientes = this.segundosIniciales;
            }
        } else {
            this.delayCorregido = true;
            dom.refrescarBotonDelay();
        }

        segundosCorrespondientes = Math.round(segundosCorrespondientes);
        this.establecerSegundos(Math.max(segundosCorrespondientes, this.segundos));
    }

    sumarVuelta() {
        this.numeroVuelta++;
        dom.refrescarNumeroVuelta();
    }
}
