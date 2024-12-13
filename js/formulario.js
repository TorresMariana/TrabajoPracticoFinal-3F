//declarar las variables
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const telefono = document.getElementById('telefono');
const email = document.getElementById('email');
const mensaje = document.getElementById('mensaje');
const mensajeError = document.getElementById('mensajeError');

document.getElementById('formulario').addEventListener('submit', function(event){
    event.preventDefault();

    let warning = "";
    let erroresEncontrados = false;


    console.log('-'.repeat(20));
    console.log('Error al enviar el formulario:');

    //limpiar el mensaje de error anterior
    mensajeError.innerHTML = "";
    if(!/^[a-zA-ZÀ-ÿ]{2,50}(?: [a-zA-Z]{2,50})*$/.test(nombre.value)){
        warning+= '*nombre no válido<br>';
        console.log('Nombre no válido');
        erroresEncontrados = true;
    }
    if(!/^[a-zA-ZÀ-ÿ]{2,50}(?: [a-zA-Z]{2,50})*$/.test(apellido.value)){
        warning+= '*apellido no válido<br>';
        console.log('Apellido no válido');
        erroresEncontrados = true;
    }
    if(!/^[0-9]{6,12}$/.test(telefono.value)){
        warning+= '*teléfono no válido<br>';
        console.log('Teléfono no válido');
        erroresEncontrados = true;
    }
    if(!/^.+@.+\.com$/.test(email.value)){
        warning+= '*email no válido<br>';
        console.log('E-mail no válido');
        erroresEncontrados = true;
    }
    if(!mensaje.value){
        warning+= '*agregue un mensaje';
        console.log('Mensaje no válido');
        erroresEncontrados = true;
    }

    

    if(erroresEncontrados){
        mensajeError.innerHTML = warning;
        document.getElementById('contenedor_mensaje_error').style.display = 'block';
        console.log('-'.repeat(20));

    }
    else{
        console.clear();
        console.log('Formulario enviado exitosamente.');
        //resetear formulario
        document.getElementById('formulario').reset();
    };
});