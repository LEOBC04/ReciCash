document.addEventListener('DOMContentLoaded', async () => {
    // SELECTORES
    // Inputs agendar
    const agendarForm = document.getElementById('agendarForm')
    const fecha = document.getElementById('fecha')
    const material = document.getElementById('material')
    const cantidad = document.getElementById('cantidad')
    // Tabla citas
    const tdDate = document.getElementById('tdDate')
    const tdTime = document.getElementById('tdTime')
    const tdMaterial = document.getElementById('tdMaterial')
    const tdAmount = document.getElementById('tdAmount')
    const deleteAppointment = document.getElementById('deleteAppointment')

    // VARIABLES
    const URLagendar = `http://localhost:3000/users/`
    const id = localStorage.getItem('id')

    // EVENTOS
    // agregar citas
    agendarForm.addEventListener('submit', async e => {
        e.preventDefault()

        const newAppointment = {
            citas: [
                {
                    fecha: fecha.value,
                    material: material.value,
                    cantidad: cantidad.value,
                },
            ],
        }

        try {
            const response = await fetch(URLagendar.concat(id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAppointment),
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
    })

    // eliminar citas
    deleteAppointment.addEventListener('click', async e => {
        e.preventDefault()

        const empty = {
            citas: [{}],
        }
        try {
            const response = await fetch(URLagendar.concat(id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empty),
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
    })

    // Agregando citas a la tabla
    try {
        const response = await fetch(URLagendar)

        if (!response.ok) {
            throw new Error(`${response.status}, ${response.statusText}`)
        } else {
            const data = await response.json()
            console.log(data)
            // Cargar las citas en la tabla
            tdDate.textContent = data[0].citas[0].fecha.substring(0, 10)
            tdTime.textContent = data[0].citas[0].fecha.substring(11)
            tdMaterial.textContent = data[0].citas[0].material
            tdAmount.textContent = data[0].citas[0].cantidad
        }
    } catch (error) {
        console.log(error)
    }
})
