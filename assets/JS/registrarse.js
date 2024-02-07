document.addEventListener('DOMContentLoaded', function () {
    // Guardamos los datos del usuario en un objeto
    const usuario = {
        name: '',
        lastName: '',
        dateOfBirth: '',
        identification: '',
        neighborhood: '',
        address: '',
        email: '',
        password: '',
        materiales: {
            papel: [],
            plastico: [],
            vidrio: [],
            carton: [],
            metales: [],
        },
    }

    // URL json-server
    const URLusers = 'http://localhost:3000/users'

    // Seleccionamos los elementos de la interfaz
    const formRegister = document.getElementById('registerForm')
    const btnRegister = document.getElementById('formSubmit')
    const registerName = document.getElementById('nombres')
    const registerLastName = document.getElementById('apellidos')
    const registerBirth = document.getElementById('fechaNacimiento')
    const registerDocument = document.getElementById('documento')
    const registerNeighborhood = document.getElementById('barrio')
    const registerAddress = document.getElementById('direccion')
    const registerEmail = document.getElementById('correo')
    const registerPassword = document.getElementById('password')
    const registerPasswordConfirm = document.getElementById('confirmPassword')

    // Agregar eventos a los input
    registerName.addEventListener('blur', validar)
    registerLastName.addEventListener('blur', validar)
    registerBirth.addEventListener('blur', validar)
    registerDocument.addEventListener('blur', validar)
    registerNeighborhood.addEventListener('blur', validar)
    registerAddress.addEventListener('blur', validar)
    registerEmail.addEventListener('blur', validar)
    registerPassword.addEventListener('blur', validar)

    // Evento para el envío del formulario
    formRegister.addEventListener('submit', registrarse)

    // Cuando carge el documento limpiar inputas
    limpiarInputs()

    // FUNCIONES

    function validar(e) {}

    async function registrarse(e) {
        e.preventDefault()
        usuario.name = registerName.value
        usuario.lastName = registerLastName.value
        usuario.dateOfBirth = registerBirth.value
        usuario.identification = registerDocument.value
        usuario.neighborhood = registerNeighborhood.value
        usuario.address = registerAddress.value
        usuario.email = registerEmail.value
        usuario.password = registerPassword.value

        try {
            const response = await fetch(URLusers, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            })

            if (!response.ok) {
                throw new Error(`${response.status}, ${response.statusText}`)
            } else {
                const data = await response.json()
                console.log(data)
                showSweetAlert('Cuenta creada exitosamente').then(() => {
                    window.location.href = 'iniciarSesion.html'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    function limpiarInputs() {
        formRegister.reset()
    }

    function showSweetAlert(msg) {
        return new Promise(resolve => {
            // eslint-disable-next-line no-undef
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: msg,
                showConfirmButton: false,
                timer: 10000,
                allowOutsideClick: false,
                allowEscapeKey: false,
                timerProgressBar: true,
            }).then(() => resolve())
        })
    }
})
