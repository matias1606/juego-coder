let player;
const atributosVisibles = $(".atributo")
const atributosMejoras = $(".mejoraAtt")
function Jugador(clase, salud, mana, fuerza , agilidad, velocidad){
    // Instanciacion del objeto jugador, el cual se usa para pelear y mostrar atributos de mi personaje
    this.clase = clase;
    this.salud = salud;
    this.mana = mana;
    this.fuerza = fuerza;
    this.agilidad = agilidad;
    this.velocidad = velocidad;
    this.botonesDeMejora = {
        boton1: 10,
        boton2: 20,
        boton3: 20,
        boton4: 30,
        boton5: 40
    }
    this.guardarProgreso = () =>{
        //Esta funcion actualiza los datos en el localStorage que guarda la informacion del objeto usuario 
        localStorage.setItem(jugador,JSON.stringify(this))
    }
}
function CargarCostoMejora(jugador){
    let jug = localStorage.getItem(jugador);
    jug = JSON.parse(jug)
    for(let i = 0;i< Object.keys(jug.botonesDeMejora).length;i++){
        $(`#boton${i}`).text(jug.botonesDeMejora[`boton${i}`]);
    }
}
function ModificarCosto(boton){
    boton.text(Number(boton.text) + 10);
}
function ModificarAtributos(jugador){
    //Esta funcion modifica los rasgos visuales de los atributos del personaje basandose en lo ultimo que se almacena localmente
    let jug = localStorage.getItem(jugador)
    jug = JSON.parse(jug)
    for(i = 0;i<atributosVisibles.length;i++){
        $(atributosVisibles[i]).text(jug[$(atributosVisibles[i]).attr("id")])
    }
}
function AtributosDeMejoras(jugador,cantidad) {
    //Esta funcion modifica los rasgos visuales de los atributos de las mejoras del personaje
    let lista = [];
    let jug = localStorage.getItem(jugador)
    jug = JSON.parse(jug)
    for(i = 0;i<atributosMejoras.length;i++){
        lista = $(atributosMejoras[i]).attr("id").split("-");
        $(atributosMejoras[i]).html(jug[lista[0]] + '->'+ '<span class="verde"> ' + (jug[lista[0]] + cantidad)  + '</span>')
    }
    
  }
function darRecompensa(recompensa){
    // Esta funcion se activa en caso de que el jugador gane una pelea y le otorga una cantidad de oro
    // especificada
    let personaje = JSON.parse(localStorage.getItem(clave));
    personaje.recursos.monedas += recompensa;
    localStorage.setItem(clave,JSON.stringify(personaje))
    alert(`Obtenés ${recompensa} de oro`)
}

let MovimientosDelJugador = {
    // Este objeto actua en la pelea que realiza el jugador contra su contrincante 
    // y contiene las funcionalidades que se aplicaran
    calcularAtaque: function(){
        //Quien ataca primero(Depende la velocidad ataco yo o ataca mi contrincante primero)
        let VelocidadDelJugador = player.velocidad;
        let VelocidadDelEnemigo = enemy.velocidad;
        let SaludInicial = player.salud;
        let SaludInicialEnemigo = enemy.salud
        // Ataca el jugador
        let AtaqueJugador = function(){
            let calcularDaño;
            if(player.mana > 0){
                calcularDaño = player.fuerza * player.mana / 1000;
            }else{
                calcularDaño = player.fuerza * player.agilidad / 1000;
            }
            let dañoPorDefecto = Math.floor(Math.random() * Math.floor(10));
            let dañoTotal = calcularDaño + dañoPorDefecto;
            // Numero de hits
            let cantidadDeGolpes = Math.floor(Math.random() * Math.floor(player.agilidad / 10) / 2) + 1;
            let valoresDeAtaque = [dañoTotal,cantidadDeGolpes];
            return valoresDeAtaque;
        }
        let AtaqueEnemigo = function(){
            let calcularDaño;
            if(enemy.mana > 0){
                calcularDaño = enemy.fuerza * enemy.mana / 1000;
            }else{
                calcularDaño = enemy.fuerza * enemy.agilidad / 1000;
            }
            let dañoPorDefecto = Math.floor(Math.random() * Math.floor(10));
            let dañoTotal = calcularDaño + dañoPorDefecto;
            // Numero de hits
            let cantidadDeGolpes = Math.floor(Math.random() * Math.floor(enemy.agilidad / 10) / 2) + 1;
            let valoresDeAtaque = [dañoTotal,cantidadDeGolpes];
            return valoresDeAtaque;
        }
        let ObtenerSaludPersonaje = $(".health-player");
        let ObtenerSaludEnemigo = $(".health-enemy");
        // iniciar ataques
        if(VelocidadDelJugador >= VelocidadDelEnemigo){
            //Comprueba si mi jugador tiene mas velocidad 
            let ValoresDeAtaque = AtaqueJugador();
            let dañoTotal = ValoresDeAtaque[0] * ValoresDeAtaque[1];
            enemy.salud = enemy.salud - dañoTotal;
            console.log(ValoresDeAtaque[1])
            alert(`Inflingiste ${ValoresDeAtaque[0]} de daño ${ValoresDeAtaque[1]} veces.`);
            if(enemy.salud <= 0){
                // EN caso de ganar la pelea el jugador recibe 10 de oro
                alert("Ganaste!");
                darRecompensa(10);
                ObtenerSaludPersonaje.html('Vida:' + SaludInicial);
                ObtenerSaludEnemigo.html('Vida: 0');
                location.reload()
            }
            else{
                ObtenerSaludEnemigo.html('Vida: ' + enemy.salud);
                let ataquesDelEnemigo = AtaqueEnemigo();
                let dañoTotal = ataquesDelEnemigo[0] * ataquesDelEnemigo[1];
                player.salud = player.salud - dañoTotal;
                alert(`El enemigo te inflingio ${ataquesDelEnemigo[0]} de daño ${ataquesDelEnemigo[1]} veces.`);
                if(player.salud <= 0){
                    alert("Perdiste!");
                    ObtenerSaludEnemigo.html('Vida:' + SaludInicialEnemigo);
                    ObtenerSaludPersonaje.html('Vida: 0');
                    location.reload()
                }else{
                    ObtenerSaludPersonaje.html('Vida: ' + player.salud)
                }
            }
        }
        else if(VelocidadDelEnemigo >= VelocidadDelJugador){
            // comparo si el enemigo tiene mayor velocidad
            let ataquesDelEnemigo = AtaqueEnemigo();
            let dañoTotal = ataquesDelEnemigo[0] * ataquesDelEnemigo[1];
            player.salud = player.salud - dañoTotal;
            console.log(ataquesDelEnemigo[1])
            alert(`El enemigo te inflingio ${ataquesDelEnemigo[0]} de daño ${ataquesDelEnemigo[1]} veces.`);
            if(player.salud <= 0){
                alert("Perdiste!");
                ObtenerSaludEnemigo.html('Vida:' + player.salud);
                ObtenerSaludPersonaje.html('Vida: 0');
                location.reload()
            }
            else{
                ObtenerSaludPersonaje.html('Vida: ' + player.salud);
                let ValoresDeAtaque = AtaqueJugador();
                let dañoTotal = ValoresDeAtaque[0] * ValoresDeAtaque[1];
                enemy.salud = enemy.salud - dañoTotal;
                alert(`Inflingiste ${ValoresDeAtaque[0]} de daño ${ValoresDeAtaque[1]} veces.`);
                if(enemy.salud <= 0){
                    // EN caso de ganar la pelea el jugador recibe 10 de oro
                    alert("Ganaste!");
                    darRecompensa(10);
                    ObtenerSaludEnemigo.html('Vida: 0');
                    ObtenerSaludPersonaje.html('Vida:' + SaludInicial);
                    location.reload()
                }else{
                    ObtenerSaludEnemigo.html('Vida: ' + SaludInicialEnemigo)
                }
            }
        }
    }
}
