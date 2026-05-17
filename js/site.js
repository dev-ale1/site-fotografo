/* ========== CARREGAR DADOS DO PAINEL ========== */

document.addEventListener('DOMContentLoaded', function() {
    carregarTextos();
    carregarFotosGaleria();
    carregarVideos();
});

/* ========== TEXTOS ========== */

function carregarTextos() {
    const textos = JSON.parse(localStorage.getItem('textos'));
    
    if (!textos) return; // Se não houver nada salvo, mantém o padrão
    
    // Hero
    if (textos.heroTitulo) {
        const heroH2 = document.querySelector('.hero h2');
        if (heroH2) heroH2.textContent = textos.heroTitulo;
    }
    if (textos.heroParagrafo) {
        const heroP = document.querySelector('.hero p');
        if (heroP) heroP.textContent = textos.heroParagrafo;
    }
    
    // Sobre
    if (textos.sobre) {
        const sobreP = document.querySelector('.sobre-texto p');
        if (sobreP) sobreP.textContent = textos.sobre;
    }
    
    // Contato
    if (textos.email) {
        const emailEl = document.querySelector('.contato-info p:nth-child(2)');
        if (emailEl) emailEl.innerHTML = '📧 ' + textos.email;
    }
    if (textos.telefone) {
        const telEl = document.querySelector('.contato-info p:nth-child(3)');
        if (telEl) telEl.innerHTML = '📱 ' + textos.telefone;
    }
    if (textos.instagram) {
        const instaEl = document.querySelector('.contato-info p:nth-child(5)');
        if (instaEl) instaEl.innerHTML = '📷 Instagram: ' + textos.instagram;
    }
}

/* ========== FOTOS DA GALERIA ========== */

function carregarFotosGaleria() {
    const fotos = JSON.parse(localStorage.getItem('fotos'));
    
    if (!fotos || fotos.length === 0) return; // Se não houver fotos, mantém as padrão
    
    const galeria = document.querySelector('.galeria');
    galeria.innerHTML = ''; // Limpa as fotos estáticas
    
    fotos.forEach(function(foto) {
        const div = document.createElement('div');
        div.classList.add('foto');
        div.innerHTML = `
            <img src="${foto.url}" alt="${foto.descricao}" loading="lazy">
        `;
        galeria.appendChild(div);
    });
    
    // Reativar o lightbox para as novas fotos
    ativarLightbox();
}

/* ========== VÍDEOS ========== */

function carregarVideos() {
    const videos = JSON.parse(localStorage.getItem('videos'));
    
    if (!videos || videos.length === 0) return;
    
    // Procurar ou criar seção de vídeos
    let secaoVideo = document.getElementById('videos');
    
    if (!secaoVideo) {
        // Criar seção de vídeos após o portfólio
        secaoVideo = document.createElement('section');
        secaoVideo.id = 'videos';
        secaoVideo.classList.add('videos');
       secaoVideo.innerHTML = `
    <div class="container">
        <h2>Vídeos</h2>
        <div class="galeria-videos"></div>
    </div>
`;
secaoVideo.style.padding = '80px 0';
secaoVideo.style.backgroundColor = '#fff';
        
        const portfolio = document.getElementById('portfolio');
        portfolio.parentNode.insertBefore(secaoVideo, portfolio.nextSibling);
    }
    
    const galeriaVideos = secaoVideo.querySelector('.galeria-videos');
    galeriaVideos.innerHTML = '';
    
    videos.forEach(function(video) {
        // Extrair ID do YouTube
        let videoHTML = '';
        const youtubeMatch = video.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
        
        if (youtubeMatch) {
            videoHTML = `
                <div class="video-item">
                    <iframe width="100%" height="315" 
                        src="https://www.youtube.com/embed/${youtubeMatch[1]}" 
                        frameborder="0" allowfullscreen>
                    </iframe>
                    <p>${video.titulo}</p>
                </div>
            `;
        } else {
            videoHTML = `
                <div class="video-item">
                    <p>🎬 <a href="${video.url}" target="_blank">${video.titulo}</a></p>
                </div>
            `;
        }
        
        galeriaVideos.innerHTML += videoHTML;
    });
}

/* ========== REATIVAR LIGHTBOX ========== */

function ativarLightbox() {
    const fotos = document.querySelectorAll('.foto img');
    fotos.forEach(function(foto) {
        foto.addEventListener('click', function() {
            const lightboxImg = document.querySelector('.lightbox-img');
            const lightbox = document.querySelector('.lightbox');
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightbox.classList.add('ativo');
        });
    });
}