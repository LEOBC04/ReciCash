// SELECTORES

const navItems = document.querySelectorAll('.nav-item')
const sections = document.querySelectorAll('section')
// nav items
const navDatos = document.getElementById('datos')
const navAgendar = document.getElementById('agendar')
const navCitas = document.getElementById('citas')
const navRecompensas = document.getElementById('recompensas')
// Sections
const sectionDatos = document.querySelector('.datos')
const sectionAgendar = document.querySelector('.agendar')
const sectionCitas = document.querySelector('.citas')
const sectionRecompensas = document.querySelector('.recompensas')

document.addEventListener('DOMContentLoaded', () => {
    // Identificar la pestaña de la nav activa
    navItems.forEach((navItem, i) => {
        // Añado un event a cada nav item
        navItem.addEventListener('click', () => {
            navItems.forEach((item, j) => {
                item.className = 'nav-item'
            })
            navItem.className = 'nav-item active'
        })
    })

    navDatos.addEventListener('click', validarSection)
    navAgendar.addEventListener('click', validarSection)
    navCitas.addEventListener('click', validarSection)
    navRecompensas.addEventListener('click', validarSection)

    function validarSection(e) {
        const parentElement = e.target.parentElement.parentElement

        if (parentElement.id === 'datos') {
            
          if (sectionDatos.classList.contains('hidden')) {
            sectionDatos.classList.remove('hidden')
            sectionAgendar.classList.add('hidden')
            sectionCitas.classList.add('hidden')
            sectionRecompensas.classList.add('hidden')
          }
        }

        if (parentElement.id === 'agendar') {
            
          if (sectionAgendar.classList.contains('hidden')) {
            sectionAgendar.classList.remove('hidden')
            sectionCitas.classList.add('hidden')
            sectionDatos.classList.add('hidden')
            sectionRecompensas.classList.add('hidden')
          }
        }

        if (parentElement.id === 'citas') {
            
          if (sectionCitas.classList.contains('hidden')) {
            sectionCitas.classList.remove('hidden')
            sectionAgendar.classList.add('hidden')
            sectionDatos.classList.add('hidden')
            sectionRecompensas.classList.add('hidden')
          }
        }

        if (parentElement.id === 'recompensas') {
            
          if (sectionRecompensas.classList.contains('hidden')) {
            sectionRecompensas.classList.remove('hidden')
            sectionAgendar.classList.add('hidden')
            sectionDatos.classList.add('hidden')
            sectionCitas.classList.add('hidden')
          }
        }
    }
})
