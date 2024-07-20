class Reloj {
    constructor() {
        this.tiempoCorre = false;
        this.interval = setInterval(correrTiempo, 100);
    }

    pausar() {
        if (roscoActivo.juegoTerminado) return;
        this.tiempoCorre = false;
        this.consumirTiempo();

        if(roscoActivo.debeMostrarModal) {
            modal.show();
            roscoActivo.debeMostrarModal = false;
        }
        dom.refrescarBotonPlayPausa();
    }

    pausarReanudar() {
        if (roscoActivo.juegoTerminado || partida.porTiempo === "false") return;

        this.tiempoCorre = !this.tiempoCorre;
        if (!this.tiempoCorre) this.consumirTiempo();

        if(roscoActivo.debeMostrarModal) {
            modal.show();
            roscoActivo.debeMostrarModal = false;
        }
        
        dom.refrescarBotonPlayPausa();
    }

    consumirTiempo() {
        if (roscoActivo.milisegundos == 0) return;

        const milisegundosMin = roscoActivo.milisegundos - 200;
        const milisegundosMax = roscoActivo.segundos * 1000;

        roscoActivo.milisegundos = Math.max(milisegundosMin, milisegundosMax);    
        roscoActivo.segundos = Math.max(0, Math.floor(roscoActivo.milisegundos / 1000));
    };
}


function correrTiempo() {
    if (!reloj.tiempoCorre || partida.porTiempo === "false") return;
    
    roscoActivo.milisegundos -= 100;
    roscoActivo.segundos = Math.max(0, Math.floor(roscoActivo.milisegundos / 1000));

    if (roscoActivo.milisegundos == 0) {
        reloj.pausar();
        clearInterval(this.interval);

        if(roscoActivo.esPrimeraVuelta) {
            modal.show();
        }
    }
    dom.refrescarSegundos();
}
