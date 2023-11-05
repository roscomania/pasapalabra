class Reloj {
    constructor() {
        this.tiempoCorre = false;
        this.interval = setInterval(correrTiempo, 100);
    }

    pausar() {
        if (roscoActivo.juegoTerminado) return;
        this.tiempoCorre = false;
        this.consumirTiempo();
        dom.refrescarBotonPlayPausa();
    }

    pausarReanudar() {
        if (roscoActivo.juegoTerminado) return;

        this.tiempoCorre = !this.tiempoCorre;
        if (!this.tiempoCorre) this.consumirTiempo();
        
        dom.refrescarBotonPlayPausa();
    }

    consumirTiempo() {
        if (roscoActivo.milisegundos == 0) return;

        const milisegundosMin = roscoActivo.milisegundos - 500;
        const milisegundosMax = roscoActivo.segundos * 1000;

        roscoActivo.milisegundos = Math.max(milisegundosMin, milisegundosMax);    
        roscoActivo.segundos = Math.max(0, Math.floor(roscoActivo.milisegundos / 1000));
    };
}


function correrTiempo() {
    if (!reloj.tiempoCorre) return;
    
    roscoActivo.milisegundos -= 100;
    roscoActivo.segundos = Math.max(0, Math.floor(roscoActivo.milisegundos / 1000));
    
    if (roscoActivo.milisegundos == 0) {
        reloj.pausar();
        const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_2.mp3").toDestination();
        Tone.loaded().then(() => {
            player.start();
        });
        clearInterval(this.interval);
    }
    dom.refrescarSegundos();
}
