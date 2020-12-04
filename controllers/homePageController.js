const fs = require('fs');
const bd = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'));
//console.log(bd) //autos es un array de OL dentro de otro requerir array.autos

module.exports = {
    index: (req,res)=>{

        let listaSucursales = bd.map(sucursales => {
            return sucursales.sucursal;
        });

        let totalAutos = [];
        
        bd.forEach(autos=>{
            autos.autos.map(marcas=>{
                return totalAutos.push(marcas.marca);
            })
        })

        res.send(`Bienvenidos a nuestra Concesionaria, Nuestras Sucursales son: ${listaSucursales.join('/')}/////CANTIDAD DE AUTOS DISPONIBLES: ${totalAutos.length}`);
    }
}