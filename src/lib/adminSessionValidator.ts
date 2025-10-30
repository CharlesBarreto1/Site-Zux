import { supabase } from "@/integrations/supabase/client";

interface AdminSession {
  token: string;
  expiresAt: string;
}

interface AdminUser {
  id: string;
  email: string;
  name?: string;
}

export class AdminSessionValidator {
  private static SESSION_KEY = 'admin_session';
  private static USER_KEY = 'admin_user';

  /**
   * Valida se há uma sessão de admin ativa e válida
   * Esta validação é apenas client-side e deve ser complementada por RLS no backend
   */
  static async isValidSession(): Promise<boolean> {
    const sessionData = localStorage.getItem(this.SESSION_KEY);
    
    if (!sessionData) {
      return false;
    }

    try {
      const session: AdminSession = JSON.parse(sessionData);
      
      // Verifica se a sessão expirou
      if (new Date(session.expiresAt) <= new Date()) {
        this.clearSession();
        return false;
      }

      // Valida a sessão no servidor via Supabase
      // Nota: Isso requer que o token seja passado nas requests
      // Por enquanto, apenas validamos o tempo de expiração client-side
      // A segurança real vem das políticas RLS que verificam is_admin_user()
      
      return true;
    } catch (error) {
      console.error('Erro ao validar sessão:', error);
      this.clearSession();
      return false;
    }
  }

  /**
   * Obtém o token da sessão atual
   */
  static getSessionToken(): string | null {
    const sessionData = localStorage.getItem(this.SESSION_KEY);
    if (!sessionData) return null;

    try {
      const session: AdminSession = JSON.parse(sessionData);
      return session.token;
    } catch {
      return null;
    }
  }

  /**
   * Obtém o usuário admin atual
   */
  static getCurrentUser(): AdminUser | null {
    const userData = localStorage.getItem(this.USER_KEY);
    if (!userData) return null;

    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }

  /**
   * Armazena a sessão após login bem-sucedido
   */
  static setSession(session: AdminSession, user: AdminUser): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Limpa a sessão (logout)
   */
  static clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * Cria um cliente Supabase com o token de sessão configurado
   * Isso é necessário para que as políticas RLS funcionem corretamente
   */
  static async getAuthenticatedClient() {
    const token = this.getSessionToken();
    
    if (!token) {
      throw new Error('Nenhuma sessão ativa');
    }

    // Define o token de sessão para uso nas funções RLS
    await supabase.rpc('set_session_token', { token });
    
    return supabase;
  }
}
