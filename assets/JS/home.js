document.addEventListener('DOMContentLoaded', () => {
    // SELECTORES  
    const loginLogOut = document.getElementById('logInLogOut')
    const registerProfile = document.getElementById('registerProfile')

    // VARIABLES
    const authentication = localStorage.getItem('isAuthenticated')

    
    
    if (authentication) {
      // Añadimos estilos a los botones
      loginLogOut.classList.add('nav__button--exit')
      registerProfile.classList.add('nav__button--exit')

      // Cambimos su contenido
      loginLogOut.textContent = 'Cerrar Sesión'
      registerProfile.textContent = 'Mi Cuenta'

      // Cambiamos la ruta del ancla
      loginLogOut.href = '#'
      registerProfile.href = '/pages/userDashboard.html'

      // EVENTOS
      loginLogOut.addEventListener('click', logOut)


    } else {
      // Cabiamos estilos
      // loginLogOut.classList.remove('nav__button--exit')
      // registerProfile.classList.remove('nav__button--exit')
      logOut()
    }

    // FUNCTIONS

    function logOut() {
      // Eliminamos elementos del localStorage
      localStorage.removeItem('id')
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')

      // Añadimos estilos a los botones
      loginLogOut.classList.remove('nav__button--exit')
      registerProfile.classList.remove('nav__button--exit')

      // Cambimos su contenido
      loginLogOut.textContent = 'Iniciar Sesión'
      registerProfile.textContent = 'Registrarse'

      // Cambiamos la ruta del ancla
      loginLogOut.href = '/pages/iniciarSesion.html'
      registerProfile.href = '/pages/registrarse.html'
    }
})
