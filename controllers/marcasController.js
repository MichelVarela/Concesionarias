const fs = require('fs');
const bd = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'));

module.exports = {
    index: (req,res)=>{
    
        let totalAutos = [];//contiene el total de autos
        
        bd.forEach(autos=>{//recorremos el bd
            autos.autos.map(marcas=>{//volvemos a recorrer el bd para ingresar a la prop autos
                return totalAutos.push(marcas.marca);//pusheamos la prop marca 
            })
        })

        let marcasFiltradas = totalAutos.filter((item,index)=>{//item nos devuelve la lista de autos, index contiene el indice en el que se encuentra cada auto
            return totalAutos.indexOf(item) === index;//utilizamos indexOf que nos devuelve el indice en el que se encuentra?
        })

        res.send(`Nuestras marcas de autos son: ${marcasFiltradas.join('/')} ///CANTIDAD DISPONIBLE DE AUTOS: ${totalAutos.length}`);
    },
    marcas: (req,res)=>{

        let marcasAutos = [];//contiene la lista de metodos total de autos

        bd.forEach(item=>{//aplicamos forEach para recorrer el array de autos
            item.autos.forEach(element=>{//aplicamos forEach para recorrer el array de array de autos y que nos devuelva sus metodos
                return marcasAutos.push(element);//pusheamos la lista de metodos
            })
        })

        let cars = marcasAutos.filter(items=>{//recorre el array de metodos de autos
                return items.marca == req.params.marca;//me devuelve un array de autos que concidan con el req.params.marca, si no coincide me devuelve un array vacio
            })

        if(cars[0] == undefined){//si cars[0] es igual a undefined que devuelva un msj de error
            res.send('Por favor ingerse un parametro valido');
        }else{
            
            let resultados = [];//contiene los resultados de la iteracion

            cars.forEach(items=>{
                return resultados.push(`${items.marca.toUpperCase()} ** ${items.modelo} ** ${items.anio} ** ${items.color}`);
            })//iteramos cars y guardamos los valores de sus prop en la var resultados;

            res.send(resultados.join('///'));//devolvemos la var resultados con todos los valores
        }

    }
}