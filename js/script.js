/* ========== MENU MOBILE ========== */

const header = document.querySelector('header');
const nav = document.querySelector('nav');

const btnMenu = document.createElement('button');
btnMenu.classList.add('menu-toggle');
btnMenu.innerHTML = '&#9776;';
btnMenu.setAttribute('aria-label', 'Abrir menu');

header.querySelector('.container').insertBefore(btnMenu, nav);

btnMenu.addEventListener('click', function() {
    nav.classList.toggle('ativo');
    
    if (nav.classList.contains('ativo')) {
        btnMenu.innerHTML = '&times;';
        btnMenu.setAttribute('aria-label', 'Fechar menu');
    } else {
        btnMenu.innerHTML = '&#9776;';
        btnMenu.setAttribute('aria-label', 'Abrir menu');
    }
});

const linksMenu = document.querySelectorAll('nav a');
linksMenu.forEach(function(link) {
    link.addEventListener('click', function() {
        nav.classList.remove('ativo');
        btnMenu.innerHTML = '&#9776;';
        btnMenu.setAttribute('aria-label', 'Abrir menu');
    });
});

/* ========== LIGHTBOX ========== */

// 1. Criar o overlay do lightbox
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
lightbox.innerHTML = `
    <span class="lightbox-fechar">&times;</span>
    <img class="lightbox-img" src="" alt="">
`;
document.body.appendChild(lightbox);

// 2. Selecionar elementos do lightbox
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxFechar = document.querySelector('.lightbox-fechar');

// 3. Abrir lightbox ao clicar na foto
const fotos = document.querySelectorAll('.foto img');
fotos.forEach(function(foto) {
    foto.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        lightbox.classList.add('ativo');
    });
});

// 4. Fechar lightbox
lightboxFechar.addEventListener('click', function() {
    lightbox.classList.remove('ativo');
});

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.classList.remove('ativo');
    }
});

// 5. Fechar com tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('ativo')) {
        lightbox.classList.remove('ativo');
    }
});

/* ========== VALIDAÇÃO DO FORMULÁRIO ========== */

const formulario = document.querySelector('.formulario');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    
    if (nome === '' || email === '' || mensagem === '') {
        mostrarMensagem('Por favor, preencha todos os campos obrigatórios.', 'erro');
        return;
    }
    
    if (!validarEmail(email)) {
        mostrarMensagem('Por favor, insira um e-mail válido.', 'erro');
        return;
    }
    
    mostrarMensagem('Mensagem enviada com sucesso! Em breve entraremos em contato.', 'sucesso');
    formulario.reset();
});

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function mostrarMensagem(texto, tipo) {
    const msgAnterior = document.querySelector('.mensagem-feedback');
    if (msgAnterior) {
        msgAnterior.remove();
    }
    
    const msg = document.createElement('div');
    msg.classList.add('mensagem-feedback');
    msg.classList.add(tipo);
    msg.textContent = texto;
    
    formulario.insertBefore(msg, formulario.firstChild);
    
    setTimeout(function() {
        msg.remove();
    }, 4000);
}