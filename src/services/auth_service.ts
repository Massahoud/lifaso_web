import api from './api'; // ton axios
import Cookies from 'js-cookie'; // on importe js-cookie


class AuthService {
  async login(email: string, motDePasse: string): Promise<void> {
    try {
      const response = await api.post('/auth/login', {
        email,
        mot_de_passe: motDePasse,
      });
      console.log('Headers:', response.headers);
console.log('Réponse de connexion:', response.data); // Ajout d'un log pour la réponse
console.log('Cookies disponibles après connexion:', document.cookie); // Log des cookies accessibles
      const {  user_id, statut } = response.data;

      if ( !user_id || !statut) {
        throw new Error('Données de connexion invalides.');
      }

    
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Erreur lors de la tentative de connexion.';
      throw new Error(message);
    }
  }

  getUserRole(): string | undefined {
    return Cookies.get('userRole'); // on lit dans les cookies
  }

  logout(): void {
    // On supprime les cookies
    Cookies.remove('token');
    Cookies.remove('userId');
    Cookies.remove('userRole');
  }

  isAuthenticated(): boolean {
    return !!Cookies.get('token');
  }
}

export default new AuthService();
