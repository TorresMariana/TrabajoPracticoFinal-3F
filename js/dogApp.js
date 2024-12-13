//ADOPTAR
fetch('https://dog.ceo/api/breeds/list/all')
    .then((response) => response.json())
    //PRIMERA PROMESA: obtener lista de razas de perros
    .then((data) => {
        //Lista de razas de perros
        const razas = Object.keys(data.message); 

        //Se selecciona 4 razas de perros aleatorias
        const seleccionRazas = [];
        while (seleccionRazas.length < 4 ){
            const razaAleatoria = razas[Math.floor(Math.random()*razas.length)];

            if(!seleccionRazas.includes(razaAleatoria)){
                seleccionRazas.push(razaAleatoria);
            }
        }

        // console.log(seleccionRazas)

        //SEGUNDA PROMESA: obtener una imagen de cada raza seleccionada
        const imagenPromise = seleccionRazas.map(raza =>
            fetch(`https://dog.ceo/api/breed/${raza}/images/random`)
                
                .then((response) => response.json())
                .then(imagenData => ({
                    raza: raza,
                    imagen: imagenData.message
                }))
        )

        //TERCERA PROMESA: obtener todas las imagenes
        Promise.all(imagenPromise)
        .then(imagenesPerros => {
            imagenesPerros.forEach((imagenPerro, index) => {
                // console.log(`cardImagen${index+1}`)
                //actualizar las variables
                document.getElementById(`cardImagen${index+1}`).src = imagenPerro.imagen;
                // document.getElementById(`cardRaza${index+1}`).innerHTML = imagenPerro.raza;
                // console.log(`ID: ${index}, Raza: ${imagenPerro.raza}, Imagen: ${imagenPerro.imagen}`);
                
                //BOTON ADOPTAR
                document.getElementById(`cardBoton${index+1}`).addEventListener('click',() =>{
                    //POPUP
                    document.getElementById('overlay').style.display = 'flex';
                    document.getElementById('popupImagen').src = imagenPerro.imagen;
                    // document.getElementById('popupNombre').innerText = imagenPerro.nombre;
                    document.getElementById('popupRaza').innerText = imagenPerro.raza;
                })
            }
            );
        })
        .catch(error =>
            console.error('Error al cargar las imágenes: ', error)
        );
    })
    .catch(error =>{
        console.error('Error al obtener la lista de razas ade perros: ', error);
    });


//NOMBRE DE PERROS
fetch('js/nombres.json')
    //PRIMERA PROMESA: extraemos los nombres  del archivo json
    .then((response) => response.json())
    .then((data) => {
        //Lista de nombres para perros
        const nombres = Object.keys(data);

        //Se selecciona 4 nombres aleatorios
        const seleccionNombres = [];
        while (seleccionNombres.length < 4 ){
            const nombreAleatoria = nombres[Math.floor(Math.random()*nombres.length)];

            if(!seleccionNombres.includes(nombreAleatoria)){
                seleccionNombres.push(nombreAleatoria);
            }
        }

        //SEGUNDA PROMESA: obtener los datos almacenados en seleecionNombres
        const promesa = seleccionNombres.map(nombre => data[nombre]);

        //Actualizar el HTML
        Promise.all(promesa)
        .then(nombresPerros => {
            // console.log('Nombres de perros:')
            nombresPerros.forEach((nombrePerro, index) => {
                //actualizar las variables
                document.getElementById(`cardNombre${index+1}`).innerHTML = nombrePerro;
                // console.log(nombrePerro)

                //BOTON ADOPTAR
                document.getElementById(`cardBoton${index+1}`).addEventListener('click',() =>{
                    //POPUP
                    document.getElementById('popupNombre').innerText = nombrePerro;
                })
                
                }
            );
            // console.log('-'.repeat(25));
        })
        .catch(error =>
            console.error('Error al cargar los nombres: ', error)
        );
    });



//Cerrar el popup
document.getElementById('cerrarPopup').addEventListener('click',() =>{
    document.getElementById('overlay').style.display = 'none';
})
document.getElementById('overlay').addEventListener('click',() =>{
    document.getElementById('overlay').style.display = 'none';
})












// const imagenDePortada = async()=>{
//     try{
//         //PRIMERA PROMESA: obtener una imagen aleatoria de un perro
//         const imagenMain1 = await fetch('https://dog.ceo/api/breed/australian/shepherd/images/random')
//         .then((response) => response.json())
//         .then((imagenData) =>( {
//             imagen: imagenData.message
//         }))

//         const imagenMain2 = await fetch('https://dog.ceo/api/breed/bulldog/images/random')
//         .then((response) => response.json())
//         .then((imagenData) =>( {
//             imagen: imagenData.message
//         }))
   
//         //SEGUNDA PROMESA: cargar la imagen obtenida
//         document.getElementById('perroMain1').src = imagenMain1.imagen;
//         console.log(`Imagen de portada: ${imagenMain1.imagen}`);
//         document.getElementById('perroMain2').src = imagenMain2.imagen;
//         console.log(`Imagen de portada: ${imagenMain2.imagen}`);

//     }
//     catch(error){
//         // console.log('Error al cargar las imagenes en la sección ¿Quienes somos?' + error);
//         console.error('Error al cargar las imagenes en la sección ¿Quienes somos?' + error);
//     }
// };
// // La función se disparará generando un perfil aleatorio cada vez que se recarga la página
// window.addEventListener('load', imagenDePortada);
