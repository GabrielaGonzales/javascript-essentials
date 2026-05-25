const cacheManagement = obtain => remove => `${remove}`

const obtenerFromCache = () => {
    let cache = [];

    return (nombre) => {
        if( cache[nombre] != undefined ){
            return `Desde cache: ${cache[nombre]}`;
        }
        //Demora tiempo
        const user = `UsuarioId: ${Math.floor((Math.random()*100/10)) }`;
        cache[nombre] = user;
        return `Desde BD ${user}`;
    }
}

const leerDB = obtenerFromCache();

console.log(`Obtener id usuario Jhon: ${leerDB("Jhon")}`);
console.log(`Obtener id usuario Jhon: ${leerDB("Jhon")}`);
console.log(`Obtener id usuario Jhon: ${leerDB("Jhon")}`);
console.log(`Obtener id usuario Jhon: ${leerDB("Maria")}`);