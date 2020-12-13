const fs = require('fs');
const bd = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'));

module.exports = {
    index: (req,res)=>{
        
        let listaAutos = [];

        bd.forEach(element => {
            element.autos.forEach(items=>{
                return listaAutos.push(`${items.marca.toUpperCase()} ** ${items.modelo} ///`);
            })
        });

        res.send(`${listaAutos.join(' ')} CANTIDAD TOTAL DE AUTOS: ${listaAutos.length}`);

    },
    marca: (req,res)=>{

        let listado = [];//contiene el metodo de todos los autos

        bd.forEach(element=>{
            element.autos.forEach(items=>{
                return listado.push(items);
            })
        })

        //PARAMETROS URL
        let marca = req.params.marcas;
        let dato = req.params.dato;

        let cars = listado.filter(items=>{//filtramos las marcas que coincidan con el parametro ingresado en la url
            return items.marca.toLowerCase() == marca.toLowerCase();
        })

        if(cars[0] == undefined){//si cars[0] es == undefined retorna el error
            res.send('Por favor ingrese una marca valida');
        }else{

            let datoAgregado = cars.filter(items=>{//filtramos el resultado del primer cars.filter para que nos devuelva el resultado del parametro ingresado en la url
                return items.anio == dato || items.color == dato;
            })

            /* if(datoAgregado[0] == null){//si lo ingresado en la url es incorrecto devuelve el error
                res.send(cars);
            }else if(datoAgregado[0] == undefined){
                res.send('Por favor ingrese un año/color validos');
            }else{
                res.send(datoAgregado);//si no devuelve el resultado del ultimo filtro
            } */
            
            if(datoAgregado[0] == null || datoAgregado[0] == undefined){//condicion si el datoAgregado(color/año) no es ingresado o no se encuentra en la lista
                
                let resultados = [];//contiene el resultado de la iteracion de cars

                cars.forEach(items=>{//iteramos cars
                    return resultados.push(`${items.marca.toUpperCase()} ** ${items.modelo} ** ${items.anio} ** ${items.color} ///`);//pusheamos a resultados
                })
                res.send(`No disponemos de un modelo con su color/año ingresado /// DISPONIBLES: ${resultados.join(' ')}`)// con join quitamos las comas del array(estilos)
            }else{
                
                let resultados = [];//contiene el resultado de la iteracion de datoAgregado

                datoAgregado.forEach(items=>{//iteramos datoAgregado
                    return resultados.push(`${items.marca.toUpperCase()} ** ${items.modelo} ** ${items.anio} ** ${items.color} ///`)//pusheamos a resultados
                })
                res.send(resultados.join(' '));// con join quitamos las comas del array(estilos)
            }
            
        }
        
    }
}
