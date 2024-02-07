import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

// ============ LOADER ==================
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

// ============ SLIDER ==================

// eslint-disable-next-line no-unused-vars
const swiperHeader = new Swiper('.swiperHeader', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
})

// eslint-disable-next-line no-unused-vars
const swiperComments = new Swiper('.swiperComments', {
    // Optional parameters
    slidesPerView: 3,
    spaceBetween: 10,
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
})

// ============ HAMBURGUER MENU ==================
const navMenu = document.getElementById('navMenu')
const navToggle = document.getElementById('navToggle')

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('nav__menu--visible')
})
