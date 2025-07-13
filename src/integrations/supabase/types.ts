export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          active: boolean
          created_at: string
          email: string
          id: string
          name: string | null
          password_hash: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          email: string
          id?: string
          name?: string | null
          password_hash: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          password_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      banners: {
        Row: {
          active: boolean | null
          created_at: string
          cta_link: string | null
          cta_text: string | null
          description: string | null
          id: string
          image_url: string | null
          order_position: number | null
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          order_position?: number | null
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          order_position?: number | null
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cities: {
        Row: {
          active: boolean
          created_at: string
          id: string
          name: string
          state: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          name: string
          state: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          name?: string
          state?: string
        }
        Relationships: []
      }
      internet_plans: {
        Row: {
          active: boolean | null
          created_at: string
          features: Json | null
          id: string
          name: string
          popular: boolean | null
          price: number
          speed: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          features?: Json | null
          id?: string
          name: string
          popular?: boolean | null
          price: number
          speed: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          features?: Json | null
          id?: string
          name?: string
          popular?: boolean | null
          price?: number
          speed?: string
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          address_number: string | null
          birth_date: string | null
          city: string | null
          cpf: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          invoice_due_day: number | null
          lead_type: string | null
          lgpd_consent: boolean | null
          message: string | null
          name: string
          observations: string | null
          phone: string | null
          plan_name: string | null
          plan_type: string | null
          preferred_installation_period: string | null
          reference_point: string | null
          second_phone: string | null
          selected_city: string | null
          source: string | null
          status: string | null
          street_name: string | null
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          address_number?: string | null
          birth_date?: string | null
          city?: string | null
          cpf?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          invoice_due_day?: number | null
          lead_type?: string | null
          lgpd_consent?: boolean | null
          message?: string | null
          name: string
          observations?: string | null
          phone?: string | null
          plan_name?: string | null
          plan_type?: string | null
          preferred_installation_period?: string | null
          reference_point?: string | null
          second_phone?: string | null
          selected_city?: string | null
          source?: string | null
          status?: string | null
          street_name?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          address_number?: string | null
          birth_date?: string | null
          city?: string | null
          cpf?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          invoice_due_day?: number | null
          lead_type?: string | null
          lgpd_consent?: boolean | null
          message?: string | null
          name?: string
          observations?: string | null
          phone?: string | null
          plan_name?: string | null
          plan_type?: string | null
          preferred_installation_period?: string | null
          reference_point?: string | null
          second_phone?: string | null
          selected_city?: string | null
          source?: string | null
          status?: string | null
          street_name?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      mobile_plans: {
        Row: {
          active: boolean | null
          created_at: string
          data_amount: string
          features: Json | null
          id: string
          minutes: string
          name: string
          popular: boolean | null
          price: number
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          data_amount: string
          features?: Json | null
          id?: string
          minutes: string
          name: string
          popular?: boolean | null
          price: number
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          data_amount?: string
          features?: Json | null
          id?: string
          minutes?: string
          name?: string
          popular?: boolean | null
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content_key: string
          content_type: string | null
          content_value: string | null
          created_at: string
          id: string
          section: string
          updated_at: string
        }
        Insert: {
          content_key: string
          content_type?: string | null
          content_value?: string | null
          created_at?: string
          id?: string
          section: string
          updated_at?: string
        }
        Update: {
          content_key?: string
          content_type?: string | null
          content_value?: string | null
          created_at?: string
          id?: string
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          active: boolean | null
          client_location: string | null
          client_name: string
          created_at: string
          id: string
          rating: number | null
          testimonial: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          client_location?: string | null
          client_name: string
          created_at?: string
          id?: string
          rating?: number | null
          testimonial: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          client_location?: string | null
          client_name?: string
          created_at?: string
          id?: string
          rating?: number | null
          testimonial?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
