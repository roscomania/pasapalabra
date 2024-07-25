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
        this.modalContent.addEventListener('click', function(event) {
            event.stopPropagation();
        });

        this.noBtn.addEventListener('click', this.noBtnHandler);
    }

    noBtnHandler() {
        document.body.classList.remove('no-click');
        document.querySelector('.modal-content').classList.remove('show');
        modal.checkboxJugadoresDemora.checked = false;
        modal.modal.style.display = 'none';
    }
}


class ModalDelay extends Modal {
    yesBtnHandler() {
        document.body.classList.remove('no-click');
        document.querySelector('.modal-content').classList.remove('show');
        modal.modal.style.display = 'none';

        roscoActivo.restablecerSegundosPorDelay();
    }
    
    show() {
        this.yesBtn.removeEventListener('click', modalSegundaOportunidad.yesBtnHandler);    
        this.yesBtn.addEventListener('click', this.yesBtnHandler);

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


class ModalSegundaOportunidad extends Modal {    
    yesBtnHandler() {
        document.body.classList.remove('no-click');
        document.querySelector('.modal-content').classList.remove('show');
        modal.modal.style.display = 'none';

        if(partida.porTiempo === "false") {
            marcarRespuestaAutomatica(COLOR_FONDO_ACIERTO);
        }
    }
    
    show() {
        this.yesBtn.removeEventListener('click', modal.yesBtnHandler);
        this.yesBtn.addEventListener('click', this.yesBtnHandler);

        this.checkboxContent.style.display = "none";
        this.modalMessage.textContent = "2DA OPORTUNIDAD. Por favor, no digas nada acerca de la palabra. ¿Es correcta?";
        this.body.classList.add('no-click');
        // Función para abrir el modal
        this.modal.style.display = 'flex';
        document.querySelector('.modal-content').classList.add('show');
    }
}