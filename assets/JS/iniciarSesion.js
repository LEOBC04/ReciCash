document.addEventListener('DOMContentLoaded', function () {
    // Guardamos los datos del usuario en un objeto
    const usuario = {
        correo: '',
        contraseña: '',
    }

    // URL´s JSON-SERVER
    const URLuser = 'http://localhost:3000/users'

    // Seleccionamos los elementos de la interfaz
    const loginForm = document.querySelector('#loginForm')
    const loginEmail = document.querySelector('#correo')
    const loginPassword = document.querySelector('#contraseña')
    const loginSubmit = document.querySelector('#loginSubmit')
    const spinner = document.querySelector('#logInSpinner')

    // Agregar eventos a los inputs
    loginEmail.addEventListener('blur', validar)
    loginPassword.addEventListener('blur', validar)

    // Evento para el envío del formulario
    loginForm.addEventListener('submit', iniciarSesión)

    // Cuando cargue el documento quiero que se limpien los inputs
    limpiarInputs()

    function validar(e) {
        // Validar si el input está vacío
        if (e.target.value.trim() === '') {
            mostrarAlerta(
                `El campo ${e.target.id} está vacío`,
                e.target.parentElement
            )
            usuario[e.target.id] = ''
            comprobarUsuario()
            return
        }

        // Validar e-mail
        if (e.target.id === 'correo' && !validarEmail(e.target.value)) {
            mostrarAlerta(
                'El correo ingresado no es valido',
                e.target.parentElement
            )
            usuario[e.target.id] = ''
            comprobarUsuario()
            return
        }

        // Validar contraseña
        if (e.target.id === 'contraseña' && !validarPassword(e.target.value)) {
            mostrarAlerta('Contraseña no valida', e.target.parentElement)
            usuario[e.target.id] = ''
            comprobarUsuario()
            return
        }

        limpiarAlerta(e.target.parentElement)

        // En este punto se pasaron todas las valdiaciones
        // Agregamos los datos del usuario en el objeto usuario
        usuario[e.target.id] = e.target.value.trim().toLowerCase()

        // Comprobar el objeto de usuario
        comprobarUsuario()
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
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)

        return resultado
    }

    function validarPassword(password) {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
        const resultado = regex.test(password)

        return resultado
    }

    function comprobarUsuario() {
        if (Object.values(usuario).includes('')) {
            loginSubmit.disabled = true
            loginSubmit.classList.add('form__submit--disabled')
            return
        }
        loginSubmit.disabled = false
        loginSubmit.classList.remove('form__submit--disabled')
    }

    async function iniciarSesión(e) {
        e.preventDefault()

        try {
            // Hacemos la petición para obtener el usuario
            const response = await fetch(`${URLuser}?email=${loginEmail.value}`)

            // Si hay un error
            if (!response.ok) {
                // Capturamos el error
                throw new Error(`${response.status}, ${response.statusText}`)
            } else {
                const data = await response.json()

                // Si la respuesta es un arreglo vacío, no se encontró el usuario
                if (!data.length) {
                    // Mostramos alerta al usuario
                    mostrarAlerta(
                        'No existe un usuario con los datos suministrados',
                        e.target
                    )

                    // Desabilitamos el botón de iniciar sesion
                    loginSubmit.disabled = true
                    loginSubmit.classList.add('form__submit--disabled')

                    // Limpiamos el objeto usuario
                    usuario.correo = ''
                    usuario.contraseña = ''

                    // Limpiamos los input
                    limpiarInputs()

                    // Limpiamos la alerta después de 3 segundos
                    setTimeout(() => {
                        limpiarAlerta(e.target)
                    }, 4000)
                }

                // Ahora validamos la contraseña
                if (data[0].password === loginPassword.value) {
                    // Si la contraseña es correcta
                    // Se muestra el spinner 
                    spinner.classList.remove('spinner__disabled')

                    // Se realiza autenticación
                    localStorage.setItem('user', loginEmail.value)
                    localStorage.setItem("isAuthenticated","true")

                    // Finalmente redireccionamos
                    setTimeout(() => {
                        spinner.classList.add('spinner__disabled')
                        window.location.href = 'userDashboard.html'
                    }, 3000);
                } else {
                    // Si la contraseña es incorrecta
                    // Mostrar alerta con el mensaje
                    mostrarAlerta(
                        'Contraseña incorrecta',
                        loginPassword.parentElement
                    )

                    // Resetear la contraseña del input y del objeto password
                    loginPassword.value = ''
                    usuario.contraseña = ''

                    // Desabilitamos el botón de iniciar sesion
                    loginSubmit.disabled = true
                    loginSubmit.classList.add('form__submit--disabled')
                }
            }
        } catch (error) {
            console.log(error)
        }

    }

    function limpiarInputs() {
        loginForm.reset()
    }

    
})
