document.addEventListener('DOMContentLoaded', function () {
    // Seleccionamos los elementos de la interfaz
    const loginForm = document.querySelector('#loginForm')
    const loginEmail = document.querySelector('#email')
    const loginPassword = document.querySelector('#contraseña')

    // Agregar eventos a los inputs
    loginEmail.addEventListener('blur', validar)
    loginPassword.addEventListener('blur', validar)

    function validar(e) {
        // Validar si el input está vacío
        if (e.target.value.trim() === '') {
            mostrarAlerta(
                `El campo ${e.target.id} está vacío`,
                e.target.parentElement
            )
            return
        }

        // Limpiar alerta de input vacío
        limpiarAlerta(e.target.parentElement)

        validarEmail(e.target.value)
    }

    function mostrarAlerta(mensaje, referencia) {
        // Comprobar si ya existe la alerta
        limpiarAlerta(referencia)

        // Creamos la alerta
        const error = document.createElement('p')
        error.textContent = mensaje
        error.classList.add('form__error')

        // Agregamos la alerta al formulario
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.form__error')
        if (alerta) {
            alerta.remove()
        }
    }


    function validarEmail(email) {
      console.log(email);
    }
})
