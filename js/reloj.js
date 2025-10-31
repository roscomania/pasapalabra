class Reloj {
    constructor() {
        this.tiempoCorre = false;
        this.interval = setInterval(correrTiempo, 100);
    }

    pausar() {
        if (roscoActivo.juegoTerminado) return;
        this.tiempoCorre = false;
        this.consumirTiempo();

        if(roscoActivo.debeCalcularDelay) {
            roscoActivo.restablecerSegundosPorDelay();
            roscoActivo.debeCalcularDelay = false;
        }
        dom.refrescarBotonPlayPausa();
    }

    pausarReanudar() {
        if (roscoActivo.juegoTerminado || partida.porTiempo === "false") return;

        this.tiempoCorre = !this.tiempoCorre;
        if (!this.tiempoCorre) this.consumirTiempo();

        if(roscoActivo.debeCalcularDelay) {
            roscoActivo.restablecerSegundosPorDelay();
            roscoActivo.debeCalcularDelay = false;
        }
        
        dom.refrescarBotonPlayPausa();
    }

    consumirTiempo() {
        if (roscoActivo.milisegundos == 0) return;
        let consumo = 200; // valor por defecto
        // Si queda menos de 1 segundo, reducimos la cantidad que se consume
        if (roscoActivo.milisegundos < 1000) {
            // por ejemplo, que consuma solo un 10% del tiempo restante
            consumo = 100;
        }

        const milisegundosMin = roscoActivo.milisegundos - consumo;
        const milisegundosMax = roscoActivo.segundos * 1000;

        roscoActivo.milisegundos = Math.max(milisegundosMin, milisegundosMax);    
        roscoActivo.segundos = Math.max(0, Math.floor(roscoActivo.milisegundos / 1000));

        dom.refrescar();
    };
}


function correrTiempo() {
    if (!reloj.tiempoCorre || partida.porTiempo === "false") return;

    roscoActivo.milisegundos -= 100;
    roscoActivo.segundos = Math.max(0, Math.floor(roscoActivo.milisegundos / 1000));

    if (roscoActivo.milisegundos == 0) { 
        if(roscoActivo.esPrimeraVuelta) {
            roscoActivo.restablecerSegundosPorDelay();
        } else {
            reloj.pausar();
            clearInterval(this.interval);
        }
    }
    dom.refrescarSegundos();
}
