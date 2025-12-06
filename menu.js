const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
const navLinks = nav.querySelectorAll('a');
const menuIcon = menuToggle.querySelector('i'); // pega o ícone

// Abre/fecha menu
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    
    // Alterna ícone entre hamburguer e X
    if(nav.classList.contains('open')) {
        menuIcon.classList.remove('bi-list');
        menuIcon.classList.add('bi-x');
    } else {
        menuIcon.classList.remove('bi-x');
        menuIcon.classList.add('bi-list');
    }
});

// Fecha menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuIcon.classList.remove('bi-x');
        menuIcon.classList.add('bi-list');
    });
});

// Fecha menu ao clicar fora
document.addEventListener('click', (e) => {
    if(!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('open');
        menuIcon.classList.remove('bi-x');
        menuIcon.classList.add('bi-list');
    }
});
