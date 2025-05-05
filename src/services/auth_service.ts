import api from './api'; // ton axios
import Cookies from 'js-cookie'; // on importe js-cookie

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

      // On stocke dans les cookies au lieu de localStorage
      Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'Strict' });
      Cookies.set('userId', user_id, { expires: 1, secure: true, sameSite: 'Strict' });
      Cookies.set('userRole', statut, { expires: 1, secure: true, sameSite: 'Strict' });

      const storedToken = Cookies.get('token');
      if (storedToken !== token) {
        throw new Error("Échec de l'enregistrement du token dans le cookie.");
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