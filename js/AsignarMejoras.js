
// for (let i = 0; i < botoncitos.length; i++) {
//     console.log($(botoncitos[i]).children('.icono').text());

    
// }
let botonesMejora = $(".bmejora");
function AsignarBotonesMejora(botones) {
    // Esta funcion se encarga de introducir a cada boton la funcionalidad de mejorar
    // El atributo especifico si se cuentan con los recursos suficientes por parte del usuario
    botones.each(function(){
        $(this).click(function () {
            let personajeLocal = JSON.parse(localStorage.getItem(clave));
            let atributosLocal = JSON.parse(localStorage.getItem(jugador));
            let arreglo = $(this).attr("id").split("-")
            let att = arreglo[1]
            if(att == "mana" && atributosLocal.mana == 0){
                alert("Tu Personaje no puede mejorar su mana, ya que no lo utiliza.")
            }else{
            let hijo; 
            for (let i = 0; i < $(this).children().length; i++) {
                if($(this).children('.icono').hasClass("icon-pico")){
                    hijo = $(this).children('.icono')
                    if(personajeLocal.recursos.roca < Number(hijo.text())){
                        alert("No tenes recursos suficientes");
                        location.reload();
                    }
                    else{
                        personajeLocal.recursos.roca -= Number(hijo.text())
                        $("#roca").text(`${personajeLocal.recursos.roca}`);
                        atributosLocal.botonesDeMejora[$(hijo).attr("id")] += 10;
                        hijo.text(atributosLocal.botonesDeMejora[$(hijo).attr("id")])
                        atributosLocal[att] += 10
                        localStorage.setItem(clave,JSON.stringify(personajeLocal));
                        localStorage.setItem(jugador,JSON.stringify(atributosLocal));
                        ModificarAtributos(jugador)
                        AtributosDeMejoras(jugador,10)
                    }
                }
                else if($(this).children('.icono').hasClass("icon-dollar-coin")){
                    hijo = $(this).children('.icono')
                    if(personajeLocal.recursos.monedas < Number(hijo.text())){
                        alert("No tenes recursos suficientes");
                        location.reload();
                    }
                    else{
                        personajeLocal.recursos.monedas -= Number(hijo.text())
                        $("#monedas").text(`${personajeLocal.recursos.monedas}`);
                        atributosLocal.botonesDeMejora[$(hijo).attr("id")] += 10;
                        hijo.text(atributosLocal.botonesDeMejora[$(hijo).attr("id")])
                        atributosLocal[att] += 10;
                        localStorage.setItem(clave,JSON.stringify(personajeLocal));
                        localStorage.setItem(jugador,JSON.stringify(atributosLocal));
                        ModificarAtributos(jugador)
                        AtributosDeMejoras(jugador,10)
                    }
                }
                else{
                    hijo = $(this).children('.icono')
                    if(personajeLocal.recursos.comida < Number(hijo.text())){
                        alert("No tenes recursos suficientes");
                        
                        location.reload();
                    }
                    else{
                        personajeLocal.recursos.comida -= Number(hijo.text());
                        $("#comida").text(personajeLocal.recursos.comida);
                        atributosLocal.botonesDeMejora[$(hijo).attr("id")] += 10;
                        hijo.text(atributosLocal.botonesDeMejora[$(hijo).attr("id")])
                        atributosLocal[att] += 10;
                        localStorage.setItem(clave,JSON.stringify(personajeLocal));
                        localStorage.setItem(jugador,JSON.stringify(atributosLocal));
                        ModificarAtributos(jugador)
                        AtributosDeMejoras(jugador,10)
                    }
                }
            }
             }
        });
  });
}
