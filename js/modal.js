class Modal {
    // Obtener elementos del DOM
    modal = document.getElementById('modal');
    yesBtn = document.getElementById('yesBtn');
    noBtn = document.getElementById('noBtn');
    modalMessage = document.getElementById('modalMessage');
    modalContent = document.querySelector('.modal-content');
    body = document.body;
    checkboxJugadoresDemora = document.getElementById("checkboxJugadorDemora");
    checkboxContent = document.getElementById("checkboxContent");

    constructor() {
        this.yesBtn.addEventListener('click', function() {
            document.body.classList.remove('no-click');
            document.querySelector('.modal-content').classList.remove('show');
            modal.checkboxJugadoresDemora.checked = false;
            modal.modal.style.display = 'none';

            roscoActivo.restablecerSegundosPorDelay();
        });

        this.noBtn.addEventListener('click', function() {
            document.body.classList.remove('no-click');
            document.querySelector('.modal-content').classList.remove('show');
            modal.checkboxJugadoresDemora.checked = false;
            modal.modal.style.display = 'none';
        });

        this.modalContent.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }

    show() {
        if(partida.porTiempo === 'false') return;

        if(roscoActivo.esPrimeraVuelta) {
            this.checkboxContent.style.display = "none";
        } else {
            this.checkboxContent.style.display = "block";
        }
        this.modalMessage.textContent = "¿" + roscoActivo.nombreJugador + " tiene delay?";
        if(reloj.tiempoCorre) return;

        this.body.classList.add('no-click');
        
        // Función para abrir el modal
        this.modal.style.display = 'flex';
        
        document.querySelector('.modal-content').classList.add('show');
    }
}
