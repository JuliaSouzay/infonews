// Inicializar utilizadores padrão no localStorage se não existirem
(function initUsers() {
  if (!localStorage.getItem('users')) {
    const defaultUsers = [
      { username: 'admin', password: '123', role: 'admin' },
      { username: 'leitor', password: '123', role: 'leitor' }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
})();

// Registo de utilizador
function registerUser(username, password, role = 'leitor') {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = users.some(u => u.username === username);

  if (userExists) {
    return { success: false, message: 'Utilizador já existe!' };
  }

  users.push({ username, password, role });
  localStorage.setItem('users', JSON.stringify(users));
  return { success: true, message: 'Registo efetuado com sucesso!' };
}

// Login de utilizador
function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Guarda a sessão atual
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, message: 'Credenciais inválidas.' };
}

// Obter utilizador ativo na sessão
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

// Terminar Sessão
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

// Guarda de Segurança para Páginas Protegidas (CMS)
function checkAuth(requiredRole = null) {
  const user = getCurrentUser();

  if (!user) {
    alert('Acesso negado! Por favor, faça login.');
    window.location.href = 'login.html';
    return;
  }

  if (requiredRole && user.role !== requiredRole) {
    alert('Permissão insuficiente! Apenas Administradores têm acesso.');
    window.location.href = 'index.html';
  }
}