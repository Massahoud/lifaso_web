import api from './api'; // ou le bon chemin relatif vers ton fichier d’instance axios

class AuthService {
  
    async login(email: string, motDePasse: string): Promise<void> {
    try {
      const response = await api.post('/auth/login', {
        email,
        mot_de_passe: motDePasse,
      });

      const { token, user_id, statut } = response.data;

      if (!token || !user_id || !statut) {
        throw new Error('Données de connexion invalides.');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('userId', user_id);
      localStorage.setItem('userRole', statut);

      const storedToken = localStorage.getItem('token');
      if (storedToken !== token) {
        throw new Error("Échec de l'enregistrement du token.");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Erreur lors de la tentative de connexion.';
      throw new Error(message);
    }
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export default new AuthService();
