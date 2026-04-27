// BricoLink - Application de mise en relation bricoleurs/particuliers
// Version simplifiée avec stockage localStorage

// Utilitaires
const $ = (sel) => document.querySelector(sel);
const uuid = () => crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2);

const toast = (message, type = 'info') => {
  const container = document.getElementById('toast-container') || (() => {
    const div = document.createElement('div');
    div.id = 'toast-container';
    div.className = 'toast-container';
    document.body.appendChild(div);
    return div;
  })();
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3000);
};

// Store
const Store = {
  get(key, def = null) {
    try {
      const data = localStorage.getItem(`bricolink_${key}`);
      return data ? JSON.parse(data) : def;
    } catch { return def; }
  },
  set(key, value) {
    localStorage.setItem(`bricolink_${key}`, JSON.stringify(value));
  },
  getUsers() { return this.get('users', []); },
  setUsers(u) { this.set('users', u); },
  getCurrentUser() { return this.get('currentUser', null); },
  setCurrentUser(u) { this.set('currentUser', u); },
  getRequests() { return this.get('requests', []); },
  setRequests(r) { this.set('requests', r); },
  getApplications() { return this.get('applications', []); },
  setApplications(a) { this.set('applications', a); },
  getMessages() { return this.get('messages', []); },
  setMessages(m) { this.set('messages', m); },
  getReviews() { return this.get('reviews', []); },
  setReviews(r) { this.set('reviews', r); }
};

// Initialisation avec données d'exemple
function initData() {
  if (Store.getUsers().length === 0) {
    Store.setUsers([
      { id: 'b1', email: 'bricoleur@test.com', password: '123', name: 'Jean Dupont', role: 'bricoleur', phone: '0600000001', skills: ['Plomberie', 'Électricité'], avatar: '', description: 'Bricoleur expérimenté avec 10 ans de pratique.', rating: 4.5, reviewCount: 12, createdAt: new Date().toISOString(), emailVerified: true },
      { id: 'b2', email: 'marie@test.com', password: '123', name: 'Marie Martin', role: 'bricoleur', phone: '0600000002', skills: ['Jardinage', 'Nettoyage'], avatar: '', description: 'Passionnée de jardinage et de petits travaux.', rating: 4.8, reviewCount: 8, createdAt: new Date().toISOString(), emailVerified: true },
      { id: 'p1', email: 'client@test.com', password: '123', name: 'Pierre Client', role: 'particular', phone: '0600000003', skills: [], avatar: '', description: '', rating: 0, reviewCount: 0, createdAt: new Date().toISOString(), emailVerified: true }
    ]);
  }
  if (Store.getRequests().length === 0) {
    Store.setRequests([
      { id: 'r1', userId: 'p1', userName: 'Pierre Client', title: 'Réparer un robinet qui fuit', description: 'Le robinet de la cuisine fuit depuis plusieurs jours.', category: 'Plomberie', address: '12 rue de Paris', city: 'Paris', photos: [], status: 'open', createdAt: new Date(Date.now() - 86400000).toISOString(), selectedBricoleurId: null },
      { id: 'r2', userId: 'p1', userName: 'Pierre Client', title: 'Tailler la haie du jardin', description: 'Haie de 20m à tailler', category: 'Jardinage', address: '5 avenue des fleurs', city: 'Lyon', photos: [], status: 'open', createdAt: new Date(Date.now() - 43200000).toISOString(), selectedBricoleurId: null }
    ]);
  }
}

initData();

// Services simplifiés
const Auth = {
  login(email, password) {
    const users = Store.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Email ou mot de passe incorrect.');
    Store.setCurrentUser(user);
    return user;
  },
  logout() {
    Store.setCurrentUser(null);
  },
  getCurrent() {
    return Store.getCurrentUser();
  },
  isLoggedIn() {
    return !!this.getCurrent();
  }
};

console.log('BricoLink app loaded');