let pantallaCompletaFueHabilitada = false;

document.addEventListener("click", function(e) {
    if(!pantallaCompletaFueHabilitada) {
        launchFullScreen(this.documentElement)
        pantallaCompletaFueHabilitada = true;
    }
});

function launchFullScreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
}
