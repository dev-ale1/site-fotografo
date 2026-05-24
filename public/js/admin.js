/* ========== FIREBASE CONFIG ========== */

const firebaseConfig = {
    apiKey: "AIzaSyCyCAnwUkUUoTuYg_W4qDoGHfAvfSNAgZ0",
    authDomain: "site-fotografo-dvd.firebaseapp.com",
    projectId: "site-fotografo-dvd",
    storageBucket: "site-fotografo-dvd.firebasestorage.app",
    messagingSenderId: "611194350005",
    appId: "1:611194350005:web:c513fa0cb4dd8624fd51fc"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

/* ========== LOGIN ========== */

const loginForm = document.querySelector('.login-form');
const mensagem = document.querySelector('.mensagem-login');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    auth.signInWithEmailAndPassword(email, senha)
        .then(function() {
            mensagem.textContent = 'Acesso liberado! Redirecionando...';
            mensagem.className = 'mensagem-login sucesso';
            
            setTimeout(function() {
                window.location.href = 'painel.html';
            }, 1000);
        })
        .catch(function(error) {
            mensagem.textContent = 'E-mail ou senha incorretos.';
            mensagem.className = 'mensagem-login erro';
            document.getElementById('senha').value = '';
        });
});

// Se já estiver logado, redireciona
auth.onAuthStateChanged(function(user) {
    if (user && window.location.pathname.includes('admin.html')) {
        window.location.href = 'painel.html';
    }
});