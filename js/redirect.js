$(document).ready(function () {
    // Funcion creada unicamente en caso de que ya haya un personaje creado
    // lo cual produce que se redirija a la hoja de mi personaje
    if(localStorage.getItem("clase")){
        window.location.assign("secciones/hojaPersonaje.html")
    }
});