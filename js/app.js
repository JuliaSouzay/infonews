document.addEventListener('DOMContentLoaded', () => {
  updateNav();
  renderPublicNews();
});

function updateNav() {
  const user = getCurrentUser();
  const navAuth = document.getElementById('nav-auth');
  
  if (navAuth) {
    if (user) {
      navAuth.innerHTML = `
        <span>Olá, <strong>${user.username}</strong> (${user.role})</span>
        <a href="perfil.html">Meu Perfil</a>
        ${user.role === 'admin' ? '<a href="cms-admin.html">Painel CMS</a>' : ''}
        <a href="#" onclick="logout()">Sair</a>
      `;
    } else {
      navAuth.innerHTML = `
        <a href="login.html">Login</a>
        <a href="cadastro.html">Registar</a>
      `;
    }
  }
}

function renderPublicNews(filterRegiao = null) {
  const newsContainer = document.getElementById('public-news');
  if (!newsContainer) return;

  let newsList = JSON.parse(localStorage.getItem('noticias')) || [];

  if (filterRegiao) {
    newsList = newsList.filter(n => n.regiao === filterRegiao);
  }

  newsContainer.innerHTML = '';
  if (newsList.length === 0) {
    newsContainer.innerHTML = '<p>Nenhuma notícia encontrada nesta secção.</p>';
    return;
  }

  newsList.forEach(news => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${news.titulo}</h3>
      <small>Região: <strong>${news.regiao.toUpperCase()}</strong> | Autor: ${news.autor}</small>
      <p style="margin-top: 10px;">${news.conteudo}</p>
    `;
    newsContainer.appendChild(card);
  });
}