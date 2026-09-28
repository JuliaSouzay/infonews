// Inicializar notícias padrão se não existirem
(function initNews() {
  if (!localStorage.getItem('noticias')) {
    const defaultNews = [
      { id: 1, titulo: 'Nova Tecnologia Lançada', regiao: 'sudeste', conteudo: 'Detalhes da nova tecnologia...', autor: 'admin' },
      { id: 2, titulo: 'Festival Cultural no Norte', regiao: 'norte', conteudo: 'O evento reuniu milhares...', autor: 'admin' }
    ];
    localStorage.setItem('noticias', JSON.stringify(defaultNews));
  }
})();

// Listar notícias no painel Admin
function renderAdminTable() {
  const newsList = JSON.parse(localStorage.getItem('noticias')) || [];
  const tbody = document.getElementById('news-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';
  newsList.forEach(news => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${news.id}</td>
      <td>${news.titulo}</td>
      <td>${news.regiao.toUpperCase()}</td>
      <td>
        <button onclick="deleteNews(${news.id})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Guardar nova notícia
function saveNews(titulo, regiao, conteudo) {
  const newsList = JSON.parse(localStorage.getItem('noticias')) || [];
  const newId = newsList.length ? newsList[newsList.length - 1].id + 1 : 1;
  const user = getCurrentUser();

  const newPost = { id: newId, titulo, regiao, conteudo, autor: user ? user.username : 'admin' };
  newsList.push(newPost);
  
  localStorage.setItem('noticias', JSON.stringify(newsList));
  renderAdminTable();
}

// Eliminar notícia
function deleteNews(id) {
  let newsList = JSON.parse(localStorage.getItem('noticias')) || [];
  newsList = newsList.filter(news => news.id !== id);
  localStorage.setItem('noticias', JSON.stringify(newsList));
  renderAdminTable();
}