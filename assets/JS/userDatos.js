document.addEventListener('DOMContentLoaded', async () => {
    // SELECTORES
    // Tarjetas de materiales
    const cardPaper = document.getElementById('cardPaper')
    const cardGlass = document.getElementById('cardGlass')
    const cardPlastic = document.getElementById('cardPlastic')
    const cardMetal = document.getElementById('cardMetal')

    // Inputs de información personal
    const userForm = document.querySelectorAll('.info__input')
    const userNombre = document.getElementById('nombre')
    const userApellidos = document.getElementById('apellidos')
    const userNacimiento = document.getElementById('nacimiento')
    const userDocumento = document.getElementById('identification')
    const userBarrio = document.getElementById('barrio')
    const userDireccion = document.getElementById('direccion')
    const userCorreo = document.getElementById('correo')

    // Botones de edición y guardar
    const infoEdit = document.getElementById('infoEdit')
    const infoSave = document.getElementById('infoSubmit')

    // Elemento para el gráfico
    const ctx = document.getElementById('myChart')

    // Correo del usuario en sesión
    const userEmail = localStorage.getItem('user')

    // id del usuario en sesión
    let idUser = ''

    // URL para obtener el user con el correo
    const URLuser = `http://localhost:3000/users?email=${userEmail}`

    // URL para actualzar el usuario
    const URLputUser = `http://localhost:3000/users/`

    // =================== EVENTOS ===========================
    infoEdit.addEventListener('click', editInfo)
    infoSave.addEventListener('click', updateInfo)

    // Obtenemos el usuario de json server
    try {
        const response = await fetch(URLuser)

        if (!response.ok) {
            throw new Error(`${response.status}, ${response.statusText}`)
        } else {
            const data = await response.json()
            localStorage.setItem('id', data[0].id)
            idUser = localStorage.getItem('id')
            showCardsAndChart(data)
            showPersonalInfo(data)
        }
    } catch (error) {
        console.log(error)
    }

    // Desabilitamos el form cada vez que se cargue el documento
    userForm.forEach(input => {
        input.setAttribute('disabled', 'disabled')
    })

    // Mostrar los datos en las cards
    function showCardsAndChart(user) {
        // Variables que alamcenan los valores de las cards
        let paper = 0
        let glass = 0
        let plastic = 0
        let metal = 0
        // Variables que alamcenan los valores apra el grafico
        const paperArray = []
        const glassArray = []
        const plasticArray = []
        const metalArray = []

        // Extraemos los datos para cada material
        user[0].materiales.papel.forEach(item => {
            paper += item.cantidad
            paperArray.push(item.cantidad)
        })

        user[0].materiales.vidrio.forEach(item => {
            glass += item.cantidad
            glassArray.push(item.cantidad)
        })

        user[0].materiales.plastico.forEach(item => {
            plastic += item.cantidad
            plasticArray.push(item.cantidad)
        })

        user[0].materiales.metales.forEach(item => {
            metal += item.cantidad
            metalArray.push(item.cantidad)
        })

        // Asignamos los valores a las cards
        cardGlass.textContent = `${glass} Kg`
        cardMetal.textContent = `${metal} Kg`
        cardPaper.textContent = `${paper} Kg`
        cardPlastic.textContent = `${plastic} Kg`

        // Mostrando el gráfico

        // eslint-disable-next-line no-new, no-undef
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    '01-01-2023',
                    '01-02-2023',
                    '01-03-2023',
                    '01-04-2023',
                    '01-05-2023',
                    '01-06-2023',
                ],
                datasets: [
                    {
                        label: 'Papel/Cartón',
                        data: paperArray,
                        borderWidth: 5,
                        backgroundColor: '#83c5be',
                        borderColor: '#83c5be',
                    },
                    {
                        label: 'Vidrio',
                        data: glassArray,
                        borderWidth: 5,
                        backgroundColor: '#a2d2ff',
                        borderColor: '#a2d2ff',
                    },
                    {
                        label: 'Plástico',
                        data: plasticArray,
                        borderWidth: 5,
                        backgroundColor: '#cdb4db',
                        borderColor: '#cdb4db',
                    },
                    {
                        label: 'Metales',
                        data: metalArray,
                        borderWidth: 5,
                        backgroundColor: '#fcbf49',
                        borderColor: '#fcbf49',
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        })
    }

    // Cargar datos de usuario en el form
    function showPersonalInfo(user) {
        userNombre.value = user[0].name
        userApellidos.value = user[0].lastName
        userNacimiento.value = user[0].dateOfBirth
        userDocumento.value = user[0].identification
        userBarrio.value = user[0].neighborhood
        userDireccion.value = user[0].address
        userCorreo.value = user[0].email
    }

    function editInfo(e) {
        e.preventDefault()

        // Primero se habilita el boton de guardado
        infoSave.classList.remove('info__submit--hidden')

        // Se habilitan los inputs
        userForm.forEach(input => {
            input.removeAttribute('disabled')
        })
    }

    async function updateInfo(e) {
        e.preventDefault()

        const updateUser = {
            name: userNombre.value,
            lastName: userApellidos.value,
            dateOfBirth: userNacimiento.value,
            identification: userDocumento.value,
            neighborhood: userBarrio.value,
            address: userDireccion.value,
            email: userCorreo.value,
        }

        console.log(URLputUser.concat(idUser))
        try {
            const response = await fetch(URLputUser.concat(idUser), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateUser),
            })

            if (!response.ok) {
                throw new Error(`${response.status}, ${response.statusText}`)
            } else {
                const data = await response.json()
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
})
