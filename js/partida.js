class Partida {
    constructor(jugador1, jugador2, segundos, comodines) {
        segundos = parseInt(segundos);
        this.comodines = parseInt(comodines);

        const rosco1 = new Rosco(jugador1, true, segundos, comodines);
        const rosco2 = new Rosco(jugador2, false, segundos, comodines);

        this.roscos = [rosco1, rosco2];
        roscoActivo = this.roscos[0];
        roscoEnEspera = this.roscos[1];
    }

    cambiarRoscoActivo() {
        if (reloj.tiempoCorre) return;
        this.roscos[0].activo = !this.roscos[0].activo;
        this.roscos[1].activo = !this.roscos[1].activo;

        if (this.roscos[0].activo) {
            roscoActivo = this.roscos[0];
            roscoEnEspera = this.roscos[1];
        } else if (this.roscos[1].activo) {
            roscoActivo = this.roscos[1];
            roscoEnEspera = this.roscos[0];
        }

        dom.refrescar();
    }
}
