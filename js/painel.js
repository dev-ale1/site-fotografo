/* ========== FIREBASE CONFIG ========== */

const firebaseConfig = {
    apiKey: "AIzaSyCyCAnwUkUUoTuYg_W4qDoGHfAvfSNAgZ0",
    authDomain: "site-fotografo-dvd.firebaseapp.com",
    projectId: "site-fotografo-dvd",
    storageBucket: "site-fotografo-dvd.firebasestorage.app",
    messagingSenderId: "611194350005",
    appId: "1:611194350005:web:c513fa0cb4dd8624fd51fc"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

/* ========== VERIFICAR LOGIN ========== */

auth.onAuthStateChanged(function(user) {
    if (!user) {
        window.location.href = 'admin.html';
    } else {
        // Só carrega os dados depois de confirmar o login
        carregarFotos();
        carregarTextos();
        carregarVideos();
    }
});

/* ========== ABAS ========== */

const abas = document.querySelectorAll('.aba');
const conteudos = document.querySelectorAll('.conteudo-aba');

abas.forEach(function(aba) {
    aba.addEventListener('click', function() {
        abas.forEach(function(a) { a.classList.remove('ativa'); });
        conteudos.forEach(function(c) { c.classList.remove('ativo'); });
        
        this.classList.add('ativa');
        const alvo = this.getAttribute('data-aba');
        document.getElementById('aba-' + alvo).classList.add('ativo');
    });
});

/* ========== BOTÃO SAIR ========== */

document.getElementById('btn-sair').addEventListener('click', function() {
    auth.signOut().then(function() {
        window.location.href = 'admin.html';
    });
});

/* ========== GERENCIAR FOTOS ========== */

const formFoto = document.querySelector('.form-foto');
const gridFotos = document.getElementById('grid-fotos');

function carregarFotos() {
    db.collection('fotos').get().then(function(snapshot) {
        gridFotos.innerHTML = '';
        
        snapshot.forEach(function(doc) {
            const foto = doc.data();
            const div = document.createElement('div');
            div.classList.add('foto-item');
            div.innerHTML = `
                <img src="${foto.url}" alt="${foto.descricao}">
                <button class="btn-remover" data-id="${doc.id}">&times;</button>
            `;
            gridFotos.appendChild(div);
        });
        
        document.querySelectorAll('.btn-remover').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                removerFoto(id);
            });
        });
    });
}

formFoto.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const arquivo = document.getElementById('imagem').files[0];
    const descricao = document.getElementById('descricao').value.trim();
    
    if (!arquivo || descricao === '') {
        alert('Preencha todos os campos.');
        return;
    }
    
    const leitor = new FileReader();
    leitor.onload = function(evento) {
        db.collection('fotos').add({
            url: evento.target.result,
            descricao: descricao
        }).then(function() {
            carregarFotos();
            formFoto.reset();
        });
    };
    leitor.readAsDataURL(arquivo);
});

function removerFoto(id) {
    db.collection('fotos').doc(id).delete().then(function() {
        carregarFotos();
    });
}

/* ========== GERENCIAR TEXTOS ========== */

const formTextos = document.querySelector('.form-textos');

function carregarTextos() {
    db.collection('textos').doc('site').get().then(function(doc) {
        if (doc.exists) {
            const textos = doc.data();
            document.getElementById('texto-hero-titulo').value = textos.heroTitulo || '';
            document.getElementById('texto-hero-paragrafo').value = textos.heroParagrafo || '';
            document.getElementById('texto-sobre').value = textos.sobre || '';
            document.getElementById('texto-email').value = textos.email || '';
            document.getElementById('texto-telefone').value = textos.telefone || '';
            document.getElementById('texto-instagram').value = textos.instagram || '';
        }
    });
}

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
    
    db.collection('textos').doc('site').set(textos).then(function() {
        alert('Textos salvos com sucesso!');
    });
});

/* ========== GERENCIAR VÍDEOS ========== */

const formVideo = document.querySelector('.form-video');
const listaVideos = document.getElementById('lista-videos');

function carregarVideos() {
    db.collection('videos').get().then(function(snapshot) {
        listaVideos.innerHTML = '';
        
        snapshot.forEach(function(doc) {
            const video = doc.data();
            const div = document.createElement('div');
            div.classList.add('video-item');
            div.innerHTML = `
                <span>${video.titulo}</span>
                <button class="btn-remover-video" data-id="${doc.id}">Remover</button>
            `;
            listaVideos.appendChild(div);
        });
        
        document.querySelectorAll('.btn-remover-video').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                removerVideo(id);
            });
        });
    });
}

formVideo.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const url = document.getElementById('video-url').value.trim();
    const titulo = document.getElementById('video-titulo').value.trim();
    
    if (url === '' || titulo === '') {
        alert('Preencha todos os campos.');
        return;
    }
    
    db.collection('videos').add({
        url: url,
        titulo: titulo
    }).then(function() {
        carregarVideos();
        formVideo.reset();
    });
});

function removerVideo(id) {
    db.collection('videos').doc(id).delete().then(function() {
        carregarVideos();
    });
}

/* ========== ALTERAR SENHA ========== */

const formSenha = document.querySelector('.form-senha');
const mensagemSenha = document.querySelector('.mensagem-senha');

formSenha.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const senhaNova = document.getElementById('senha-nova').value;
    const senhaConfirmar = document.getElementById('senha-confirmar').value;
    
    if (senhaNova !== senhaConfirmar) {
        mensagemSenha.textContent = 'As senhas não coincidem.';
        mensagemSenha.style.color = '#dc3545';
        return;
    }
    
    if (senhaNova.length < 6) {
        mensagemSenha.textContent = 'A senha deve ter no mínimo 6 caracteres.';
        mensagemSenha.style.color = '#dc3545';
        return;
    }
    
    const user = auth.currentUser;
    
    user.updatePassword(senhaNova).then(function() {
        mensagemSenha.textContent = 'Senha alterada com sucesso!';
        mensagemSenha.style.color = '#28a745';
        formSenha.reset();
    }).catch(function(error) {
        mensagemSenha.textContent = 'Erro: faça login novamente antes de alterar a senha.';
        mensagemSenha.style.color = '#dc3545';
    });
});