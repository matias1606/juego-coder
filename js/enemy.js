let enemy;

function Enemigo(clase, salud, mana, fuerza , agilidad, velocidad){
    // Instanciacion del objeto enemigo para ser usado en la funcionalidad de pelea
    this.clase = clase;
    this.salud = salud;
    this.mana = mana;
    this.fuerza = fuerza;
    this.agilidad = agilidad;
    this.velocidad = velocidad;
}