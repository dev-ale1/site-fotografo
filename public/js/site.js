/* ========== FIREBASE CONFIG ========== */

const firebaseConfig = {
    apiKey: "AIzaSyCyCAnwUkUUoTuYg_W4qDoGHfAvfSNAgZ0", /*"SUA_APIKEY_AQUI",*/
    authDomain: "site-fotografo-dvd.firebaseapp.com",
    projectId: "site-fotografo-dvd",
    storageBucket: "site-fotografo-dvd.firebasestorage.app",
    messagingSenderId: "611194350005",
    appId: "1:611194350005:web:c513fa0cb4dd8624fd51fc"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ========== CARREGAR DADOS ========== */

document.addEventListener('DOMContentLoaded', function() {
    carregarTextos();
    carregarFotosGaleria();
    carregarVideos();
});

/* ========== TEXTOS ========== */

function carregarTextos() {
    db.collection('textos').doc('site').get().then(function(doc) {
        if (!doc.exists) return;
        
        const textos = doc.data();
        
        if (textos.heroTitulo) {
            const heroH2 = document.querySelector('.hero h2');
            if (heroH2) heroH2.textContent = textos.heroTitulo;
        }
        if (textos.heroParagrafo) {
            const heroP = document.querySelector('.hero p');
            if (heroP) heroP.textContent = textos.heroParagrafo;
        }
        if (textos.sobre) {
            const sobreP = document.querySelector('.sobre-texto p');
            if (sobreP) sobreP.textContent = textos.sobre;
        }
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
    });
}

/* ========== FOTOS ========== */

function carregarFotosGaleria() {
    db.collection('fotos').get().then(function(snapshot) {
        if (snapshot.empty) return;
        
        const galeria = document.querySelector('.galeria');
        galeria.innerHTML = '';
        
        snapshot.forEach(function(doc) {
            const foto = doc.data();
            const div = document.createElement('div');
            div.classList.add('foto');
            div.innerHTML = `
                <img src="${foto.url}" alt="${foto.descricao}" loading="lazy">
            `;
            galeria.appendChild(div);
        });
        
        ativarLightbox();
    });
}

/* ========== VÍDEOS ========== */

function carregarVideos() {
    db.collection('videos').get().then(function(snapshot) {
        if (snapshot.empty) return;
        
        let secaoVideo = document.getElementById('videos');
        
        if (!secaoVideo) {
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
        
        const videos = [];
        snapshot.forEach(function(doc) {
            videos.push(doc.data());
        });
        
        if (videos.length === 1) {
            galeriaVideos.style.gridTemplateColumns = '600px';
            galeriaVideos.style.justifyContent = 'center';
        } else {
            galeriaVideos.style.gridTemplateColumns = 'repeat(2, 1fr)';
            galeriaVideos.style.justifyContent = 'normal';
        }
        
        videos.forEach(function(video) {
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