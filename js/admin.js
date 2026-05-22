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
const db = firebase.firestore();

/* ========== LOGIN ========== */

const loginForm = document.querySelector('.login-form');
const mensagem = document.querySelector('.mensagem-login');

// Buscar senha salva no Firebase
db.collection('config').doc('senha').get().then(function(doc) {
    const senhaCorreta = doc.exists ? doc.data().valor : 'dvd2026';
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const senha = document.getElementById('senha').value;
        
        if (senha === senhaCorreta) {
            mensagem.textContent = 'Acesso liberado! Redirecionando...';
            mensagem.className = 'mensagem-login sucesso';
            
            localStorage.setItem('logado', 'true');
            
            setTimeout(function() {
                window.location.href = 'painel.html';
            }, 1000);
            
        } else {
            mensagem.textContent = 'Senha incorreta. Tente novamente.';
            mensagem.className = 'mensagem-login erro';
            document.getElementById('senha').value = '';
        }
    });
});

// Se já estiver logado, redireciona
if (localStorage.getItem('logado') === 'true') {
    window.location.href = 'painel.html';
}