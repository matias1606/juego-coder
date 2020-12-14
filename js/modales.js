let modalButton = $(".modal-btn");
let modalClose = $(".modal-close");


function darEventoABoton(botonAbre,botonCierra,modal){
    // Esta funcion le otorga los eventos necesarios al boton para poder usar el modal que utilizan las distintas secciones del juego
    botonAbre.click(function () { 

        $(".footer").css('cursor','not-allowed');
        $(".secciones").css('pointer-events','none')
        modal.addClass('bg-active');
    });
    
    botonCierra.click(function(){
        modal.removeClass("bg-active");
        $(".secciones").css('pointer-events','auto');
        $(".footer").css('cursor','pointer');
    })
}
darEventoABoton($(".modal-btn-mejoras"),$(".modal-close"),$(".modal-bg-mejoras"));
darEventoABoton($(".modal-btn-farmear"),$(".modal-close"),$(".modal-bg-farmear"));


