const jugador = "jugador";
asistente = {
    setearComienzo: function (clase) {
        this.resetearJugador(clase);
        this.setearPrePelea();  
    },
     resetearJugador: (clase) => {
        // Esta funcion crea un nuevo jugador segun la clase que luego se seleccionara y lo almacena en el localStorage 
        if(localStorage.getItem(jugador)){
            player = JSON.parse(localStorage.getItem(jugador));
            localStorage.setItem(jugador,JSON.stringify(player))
        }
        else{
            switch (clase) {
                case "Picaro":
                    player = new Jugador(clase, 100, 0, 100,150,200);
                    localStorage.setItem(jugador,JSON.stringify(player));
                    break;
                case "Guerrero":
                    player = new Jugador(clase, 200, 0, 150,100,50);
                    localStorage.setItem(jugador,JSON.stringify(player));
                    break;
                case "Mago":
                    player = new Jugador(clase,120,50,80,100,80);
                    localStorage.setItem(jugador,JSON.stringify(player));
                    break;
                case "Cazador":
                    player = new Jugador(clase,150,0,170,100,100);
                    localStorage.setItem(jugador,JSON.stringify(player));
                    break;
            }
        }
        
        $(".interface div").css('height','160px');
        let interfaz = $(".interface");
        interfaz.html('<img src="../img/avatares/'+ clase.toLowerCase()+'.png" class="img-avatar"><div class="masAlto"><h3>'+
        clase + '</h3><p class="health-player"> Salud:' + player.salud
        + '</p><p> Mana:' + player.mana 
        + '</p><p> Fuerza:'+ player.fuerza
        + '</p><p> Agilidad:' + player.agilidad
        + '</p><p> Velocidad:' + player.velocidad + '</p>');
     },
     setearPrePelea: function(){
        //Esta funcion crea la interfaz grafica de la seccion de pelea
        let header = $(".header")
        let acciones = $(".actions")
        let arena = $(".arena")
        acciones.html('<a href="#" class="btn-prefight" onclick="asistente.setearPelea()">Busca un enemigo</a>')
        arena.css('visibility','visible')
        header.html("<h2>Pelea!</h2>")
     },
     setearPelea: function(){
         //Esta funcion crea la interfaz grafica de la seccion de pelea para los enemigos
        let header = $(".header")
        let acciones = $(".actions")
        let tomarEnemigo = $(".enemy")

        // creando enemigo
        let enemy00 = new Enemigo("Dinosaurio-desertico",100,0,50,100,100);
        let enemy01 = new Enemigo("Antlion",200,0,150,80,100);
        let enemy02 = new Enemigo("Soldado-celestial",300,0,100,150,100)
        let enemigos = [enemy00,enemy01,enemy02]
        enemy = enemigos[Math.floor(Math.random()*Math.floor(3))]

        header.html('<p>Elige tu movimiento </p>')
        acciones.html('<a href="#" onclick="MovimientosDelJugador.calcularAtaque()">Atacar</a><a href="hojaPersonaje.html">Volver</a>')
        tomarEnemigo.html('<img src="../img/enemigos/'+ enemy.clase.toLowerCase()+'.png" class="img-avatar"><div><h3>'+
        enemy.clase + '</h3><p class="health-enemy"> Salud:' + enemy.salud
        + '</p><p> Mana:' + enemy.mana
        + '</p><p> Fuerza:'+ enemy.fuerza
        + '</p><p> Agilidad:' + enemy.agilidad
        + '</p><p> Velocidad:' + enemy.velocidad + '</p>')
       }
}
