const loader = document.getElementById('loader')

// Se ejecuta mientras carga la página
window.addEventListener('DOMContentLoaded', () => {
    loader.classList.remove('hideLoader')
})

// Se ejctua cuando carga la pagina
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hideLoader')
    }, 2000)
})