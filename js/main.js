let usuario1;
const monedasVisibles = $("#monedas");
const vidasVisibles = $("#vidas");
const comidaVisible = $("#comida");
const RocaVisible = $("#roca");
const nombreVisible = $("#nombrePersonaje");
const saludVisible = $("#salud");
const fuerzaVisible = $("#fuerza");
const manaVisible = $("#mana");
const agilidadVisible = $("#agilidad");
const velocidadVisible = $("#velocidad")
const botonFarmearRoca = ["#recRoca","#progresoRoca","#mejorarRoca","#rocaActual","#rocaProx","#mejorarRoca","#mejoraRocaActual"];
const botonFarmearComida = ["#recComida","#progresoComida","#mejorarComida","#comidaActual","#comidaProx","#mejorarComida","#mejoraComidaActual"];
const recursosBasicos = {"monedas":0,"vidas":1,"comida":0,"roca":0};
const atributosBasicos = {"salud":400,"ataque":10,"critico":5 ,"resistencia":10};
const indicadoresFarmeo = {"comida":20,"roca":30};
const indicadoresFarmeoProx = {"comida":20,"roca":30};
const clave = "personaje";
// Constantes que representan botones,indicadores que se encuentran en la pagina o que son preestablecidos para usar en el objeto usuario
const botones = [botonFarmearComida,botonFarmearRoca];

function asignarBotones(botones,intervalo,usuario){
    // Esta funcion asigna a los botones de farmeo la accion de farmear para que el personaje pueda recolectar recursos
    for(let i = 0; i<intervalo;i++){
        $(`${botones[i][0]}`).click(function(){usuario.farmear(botones[i])})   
    }
    $(`${botones[1][5]}`).click(function(){usuario.mejorarFarmRoca(botones[1])})
    $(`${botones[0][5]}`).click(function(){usuario.mejorarFarmComida(botones[0])})
}
function asignarAtributos(){
    //Esta funcion se encarga de asignarle al personaje sus atributos correspondientes accediendo al objeto jugador, que es el que contiene 
    //los atributos del personaje crear
    if(localStorage.getItem("jugador") == null){
        return false;
    }
    else{
        let objeto = JSON.parse(localStorage.getItem("jugador"));
        saludVisible.html(objeto.salud);
        fuerzaVisible.html(objeto.fuerza);
        manaVisible.html(objeto.mana);
        agilidadVisible.html(objeto.agilidad);
        velocidadVisible.html(objeto.velocidad)
    }
    
}


function usuario(nombre,recursos,farmeo){
    //Funcion que instancia el objeto usuario con sus respectivas propiedades
    this.nombre = nombre;
    this.recursos = recursos;
    this.farmeo = farmeo
    this.sumarRecursos = (elem) =>{
        // Esta funcion suma los recursos que se generan a partir del farmeo
        if(elem === "#recRoca"){
            this.recursos.roca += this.farmeo.roca;
            RocaVisible.text(`${this.recursos.roca}`)
        }
        else{
            this.recursos.comida += this.farmeo.comida
            comidaVisible.text(`${this.recursos.comida}`)
        }
    }
    this.guardarProgreso = () =>{
        //Esta funcion actualiza los datos en el localStorage que guarda la informacion del objeto usuario 
        localStorage.setItem(clave,JSON.stringify(this))
    }
    this.farmear = (arr) => {
        //Esta funcion se encarga de ejecutar el farmeo de manera que las barras de carga se activan
        var i = 0;
        let barraProgreso = $(arr[1]);
        barraProgreso.css("display","initial");
        let sumar = this.sumarRecursos;
        let guardar = this.guardarProgreso;
        if(i == 0){
            i = 1;
            var elem = $(`${arr[1]} .barra`);
            var width = 4;
            var intervalo = setInterval(franja,70);
            function franja(){
                $(`${arr[5]}`).css("pointer-events","none")
                if(width >= 100){
                    $(`${arr[5]}`).css("pointer-events","auto")
                    clearInterval(intervalo);
                    i = 0;
                }
                else{
                    width += 2;
                    elem.css("width",`${width}%`)
                    if(width == 100){
                        barraProgreso.css("display","none");
                        sumar(arr[0])
                        guardar()
                    }
                }
            }
        }
    }
    this.mejorarFarmRoca = (arr) => {
        //Esta funcion accede al boton de farmear roca y mejora la cantidad de recoleccion, como a su vez cambia el valor que se necesita
        // para hacer una nueva mejora
        if(arr[0] == botonFarmearRoca[0] && this.recursos.comida >= this.farmeo.roca * 2){
            this.recursos.comida -= this.farmeo.roca * 2;
            this.farmeo.roca += 5;
            $(`${arr[3]}`).text(`${this.farmeo.roca}`);
            $(`${arr[4]}`).text(`${this.farmeo.roca + 5}`);
            $(`${arr[6]}`).text(`${this.farmeo.roca * 2}`)
            comidaVisible.text(`${this.recursos.comida}`)
            this.guardarProgreso()
        }
        else{
            alert("No tenes recursos suficientes para mejorar")
        }
    }
    this.mejorarFarmComida = (arr) => {
        //Esta funcion accede al boton de farmear comida y mejora la cantidad de recoleccion, como a su vez cambia el valor que se necesita
        // para hacer una nueva mejora
        if(arr[0] == botonFarmearComida[0] && this.recursos.roca >= this.farmeo.comida * 2){
            this.recursos.roca -= this.farmeo.comida * 2;
            this.farmeo.comida += 5;
            $(`${arr[3]}`).text(`${this.farmeo.comida}`);
            $(`${arr[4]}`).text(`${this.farmeo.comida + 5}`);
            $(`${arr[6]}`).text(`${this.farmeo.comida * 2}`)
            RocaVisible.text(`${this.recursos.roca}`)
            this.guardarProgreso();
        }
        else{
            alert("No tenes recursos suficientes para mejorar")
        }
    }
}

function actualizarPropiedades(usuario){
    //Funcion encargada de modificar cualquiera de las propiedades visibles del personaje
    // (monedas,vidas,nombre,comida,roca) en caso de algun cambio
    nombreVisible.text(usuario.nombre);
    monedasVisibles.text(usuario.recursos.monedas);
    vidasVisibles.text(usuario.recursos.vidas);
    comidaVisible.text(usuario.recursos.comida);
    RocaVisible.text(usuario.recursos.roca);
}

function generarNombreUsuario(){
    //Esta funcion se encarga de pedirle un nombre al usuario para luego darselo al personaje
    while(true){
        var nombreUsuario1 = prompt("Elegi un nombre para tu personaje :");
        if(nombreUsuario1 == null || nombreUsuario1 == ""){
            alert("No ingresaste nada")
            continue;
        }
        else{
            localStorage.setItem("nombre",nombreUsuario1);
            nombreVisible.text(`${nombreUsuario1}`);
            break;
        }
    }
    return nombreUsuario1;
}
function iniciarUsuario(){
    // La funcion inicializa el usuario y verifica que aun no haya uno creado, en caso de que lo haya pedira que se
    // ingrese el nombre de este usuario para asi usarlo
    if (localStorage.getItem(clave) != null) {
        var usuario1 = JSON.parse(localStorage.getItem(clave));
        var usuario1ConFuncionalidades = new usuario(usuario1.nombre,usuario1.recursos,usuario1.farmeo);
        $(`${botonFarmearRoca[3]}`).text(`${usuario1ConFuncionalidades.farmeo.roca}`);
        $(`${botonFarmearRoca[4]}`).text(`${usuario1ConFuncionalidades.farmeo.roca + 5}`);
        $(`${botonFarmearRoca[6]}`).text(`${usuario1ConFuncionalidades.farmeo.roca * 2}`);
        $(`${botonFarmearComida[3]}`).text(`${usuario1ConFuncionalidades.farmeo.comida}`);
        $(`${botonFarmearComida[4]}`).text(`${usuario1ConFuncionalidades.farmeo.comida + 5}`);
        $(`${botonFarmearComida[6]}`).text(`${usuario1ConFuncionalidades.farmeo.comida * 2}`);
        asignarBotones(botones,2,usuario1ConFuncionalidades);
        actualizarPropiedades(usuario1ConFuncionalidades);
        return usuario1ConFuncionalidades;
    }
    else{
        var usuario1 = new usuario(generarNombreUsuario(),recursosBasicos,indicadoresFarmeo);
        asignarBotones(botones,2,usuario1);
        localStorage.setItem(clave,JSON.stringify(usuario1));
        var usuarioGuardado = localStorage.getItem(clave);
        usuarioGuardado = JSON.parse(usuarioGuardado);
        actualizarPropiedades(usuarioGuardado);
        return usuario1;
    }
}

$(document).ready(function () {
    //Una vez que el documento se encuentra completamente cargado esta funcion se encarga de ejecutar
    // todos los procesos necesarios para el correcto funcionamiento del juego ;)
        $(".interface a").each(function(){
            $(this).click(function () { 
                let lista = $(this).text().replace(/\n\s/g,'').split(" ");
                lista = lista.filter(function(value,index,arr){
                    return value != "";
                })
                localStorage.setItem("clase",lista[0]);
            });
        })
        if(localStorage.getItem("clase") != null){
            $(".hojaPersonaje img").attr("src",`../img/avatares/${localStorage.getItem("clase").toLowerCase()}.png`);
            asistente.setearComienzo(localStorage.getItem("clase"));
            asignarAtributos();
            ModificarAtributos(jugador);
            AtributosDeMejoras(jugador,10);
            CargarCostoMejora(jugador)
            AsignarBotonesMejora(botonesMejora);
        }
        

        
 });

usuario1 = iniciarUsuario();
