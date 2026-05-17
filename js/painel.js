/* ========== PAINEL DE CONTROLE ========== */

// Verificar se está logado
if (localStorage.getItem('logado') !== 'true') {
    window.location.href = 'admin.html';
}

/* ========== ABAS ========== */

const abas = document.querySelectorAll('.aba');
const conteudos = document.querySelectorAll('.conteudo-aba');

abas.forEach(function(aba) {
    aba.addEventListener('click', function() {
        // Remover ativo de todas as abas
        abas.forEach(function(a) {
            a.classList.remove('ativa');
        });
        conteudos.forEach(function(c) {
            c.classList.remove('ativo');
        });
        
        // Ativar a aba clicada
        this.classList.add('ativa');
        const alvo = this.getAttribute('data-aba');
        document.getElementById('aba-' + alvo).classList.add('ativo');
    });
});

/* ========== BOTÃO SAIR ========== */

document.getElementById('btn-sair').addEventListener('click', function() {
    localStorage.removeItem('logado');
    window.location.href = 'admin.html';
});

/* ========== GERENCIAR FOTOS ========== */

const formFoto = document.querySelector('.form-foto');
const gridFotos = document.getElementById('grid-fotos');

// Carregar fotos salvas
function carregarFotos() {
    const fotos = JSON.parse(localStorage.getItem('fotos')) || [];
    gridFotos.innerHTML = '';
    
    fotos.forEach(function(foto, index) {
        const div = document.createElement('div');
        div.classList.add('foto-item');
        div.innerHTML = `
            <img src="${foto.url}" alt="${foto.descricao}">
            <button class="btn-remover" data-index="${index}">&times;</button>
        `;
        gridFotos.appendChild(div);
    });
    
    // Eventos de remover
    document.querySelectorAll('.btn-remover').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            removerFoto(index);
        });
    });
}

// Adicionar foto
formFoto.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const arquivo = document.getElementById('imagem').files[0];
    const descricao = document.getElementById('descricao').value.trim();
    
    if (!arquivo || descricao === '') {
        alert('Preencha todos os campos.');
        return;
    }
    
    // Converter imagem para Base64 (armazenamento local)
    const leitor = new FileReader();
    leitor.onload = function(evento) {
        const fotos = JSON.parse(localStorage.getItem('fotos')) || [];
        fotos.push({
            url: evento.target.result,
            descricao: descricao
        });
        localStorage.setItem('fotos', JSON.stringify(fotos));
        carregarFotos();
        formFoto.reset();
    };
    leitor.readAsDataURL(arquivo);
});

// Remover foto
function removerFoto(index) {
    const fotos = JSON.parse(localStorage.getItem('fotos')) || [];
    fotos.splice(index, 1);
    localStorage.setItem('fotos', JSON.stringify(fotos));
    carregarFotos();
}

/* ========== GERENCIAR TEXTOS ========== */

const formTextos = document.querySelector('.form-textos');

// Carregar textos salvos
function carregarTextos() {
    const textos = JSON.parse(localStorage.getItem('textos')) || {};
    
    document.getElementById('texto-hero-titulo').value = textos.heroTitulo || '';
    document.getElementById('texto-hero-paragrafo').value = textos.heroParagrafo || '';
    document.getElementById('texto-sobre').value = textos.sobre || '';
    document.getElementById('texto-email').value = textos.email || '';
    document.getElementById('texto-telefone').value = textos.telefone || '';
    document.getElementById('texto-instagram').value = textos.instagram || '';
}

// Salvar textos
formTextos.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const textos = {
        heroTitulo: document.getElementById('texto-hero-titulo').value,
        heroParagrafo: document.getElementById('texto-hero-paragrafo').value,
        sobre: document.getElementById('texto-sobre').value,
        email: document.getElementById('texto-email').value,
        telefone: document.getElementById('texto-telefone').value,
        instagram: document.getElementById('texto-instagram').value
    };
    
    localStorage.setItem('textos', JSON.stringify(textos));
    alert('Textos salvos com sucesso!');
});

/* ========== GERENCIAR VÍDEOS ========== */

const formVideo = document.querySelector('.form-video');
const listaVideos = document.getElementById('lista-videos');

// Carregar vídeos salvos
function carregarVideos() {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    listaVideos.innerHTML = '';
    
    videos.forEach(function(video, index) {
        const div = document.createElement('div');
        div.classList.add('video-item');
        div.innerHTML = `
            <span>${video.titulo}</span>
            <button class="btn-remover-video" data-index="${index}">Remover</button>
        `;
        listaVideos.appendChild(div);
    });
    
    document.querySelectorAll('.btn-remover-video').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            removerVideo(index);
        });
    });
}

// Adicionar vídeo
formVideo.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const url = document.getElementById('video-url').value.trim();
    const titulo = document.getElementById('video-titulo').value.trim();
    
    if (url === '' || titulo === '') {
        alert('Preencha todos os campos.');
        return;
    }
    
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.push({ url: url, titulo: titulo });
    localStorage.setItem('videos', JSON.stringify(videos));
    carregarVideos();
    formVideo.reset();
});

// Remover vídeo
function removerVideo(index) {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.splice(index, 1);
    localStorage.setItem('videos', JSON.stringify(videos));
    carregarVideos();
}

/* ========== INICIALIZAR ========== */

carregarFotos();
carregarTextos();
carregarVideos();