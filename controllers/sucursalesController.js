const fs = require('fs');
const bd = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'));

module.exports = {
    index: (req,res)=>{

        let listaSucursales = []//contiene las sucursales, su direccion y su telefono
        bd.map(sucursales=>{//recorremos con map el bd y pusheamos la sucursal, direccion y telefono
            return listaSucursales.push(`${sucursales.sucursal.toUpperCase()} ** ${sucursales.direccion} ** ${sucursales.telefono}`);
        })

        let totalAutos = [];//contiene el total de autos
        
        bd.map(autos=>{//recorremos el bd
            autos.autos.map(marcas=>{//volvemos a recorrer el bd para ingresar a la prop autos
                return totalAutos.push(marcas.marca);//pusheamos la prop marca 
            })
        })

        res.send(`${listaSucursales.join('///-----///')} /////CANTIDAD DE AUTOS DISPONIBLES: ${totalAutos.length}`);
        
    },
    sucursal: (req,res)=>{
        
        let sucursal = bd.filter(sucursales=>{
            return sucursales.sucursal == req.params.sucursal;
        });

        if(sucursal[0] == undefined){
            res.send('La sucursal ingresada es inexistente, por favor ingrese una sucursal valida');
        } else{
            
            let cars = [];//contiene los autos y su descripcion
            
            sucursal[0].autos.forEach(items=>{//recorremos sucursal[0].autos para obetener los datos
                return cars.push(`${items.marca.toUpperCase()} ** ${items.modelo} ** ${items.anio} ** ${items.color}`)//pusheamos a cars
            })
            
            res.send(`${sucursal[0].sucursal.toUpperCase()} ${sucursal[0].direccion} ** ${sucursal[0].telefono} ** ///---AUTOS---: ${cars.join('///')} ----- CANTIDAD TOTAL DE AUTOS: ${cars.length}`);//nos devuelve los datos completos
        }

    }
}