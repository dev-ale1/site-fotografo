/* ========== LOGIN ========== */

// Senha de acesso (depois podemos deixar o fotógrafo trocar)
const SENHA_CORRETA = 'dvd2026';

const loginForm = document.querySelector('.login-form');
const mensagem = document.querySelector('.mensagem-login');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const senha = document.getElementById('senha').value;
    
    if (senha === SENHA_CORRETA) {
        // Login bem-sucedido
        mensagem.textContent = 'Acesso liberado! Redirecionando...';
        mensagem.className = 'mensagem-login sucesso';
        
        // Salvar sessão no localStorage
        localStorage.setItem('logado', 'true');
        
        // Redirecionar para o painel (criaremos depois)
        setTimeout(function() {
            window.location.href = 'painel.html';
        }, 1000);
        
    } else {
        // Senha incorreta
        mensagem.textContent = 'Senha incorreta. Tente novamente.';
        mensagem.className = 'mensagem-login erro';
        document.getElementById('senha').value = '';
    }
});

// Se já estiver logado, redireciona direto para o painel
if (localStorage.getItem('logado') === 'true') {
    window.location.href = 'painel.html';
}