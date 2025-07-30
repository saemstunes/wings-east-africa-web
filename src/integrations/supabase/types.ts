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
          backup_codes: string[] | null
          created_at: string | null
          id: string
          last_login_at: string | null
          locked_until: string | null
          login_attempts: number | null
          role: string
          two_factor_enabled: boolean | null
          two_factor_secret: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          backup_codes?: string[] | null
          created_at?: string | null
          id?: string
          last_login_at?: string | null
          locked_until?: string | null
          login_attempts?: number | null
          role?: string
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          backup_codes?: string[] | null
          created_at?: string | null
          id?: string
          last_login_at?: string | null
          locked_until?: string | null
          login_attempts?: number | null
          role?: string
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          formspree_submitted: boolean | null
          has_attachment: boolean | null
          id: number
          image_storage_url: string | null
          message: string
          name: string
          phone: string | null
          product_name: string | null
          request_metadata: Json | null
          request_type: string | null
          subject: string
          submission_date: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          formspree_submitted?: boolean | null
          has_attachment?: boolean | null
          id?: number
          image_storage_url?: string | null
          message: string
          name: string
          phone?: string | null
          product_name?: string | null
          request_metadata?: Json | null
          request_type?: string | null
          subject: string
          submission_date?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          formspree_submitted?: boolean | null
          has_attachment?: boolean | null
          id?: number
          image_storage_url?: string | null
          message?: string
          name?: string
          phone?: string | null
          product_name?: string | null
          request_metadata?: Json | null
          request_type?: string | null
          subject?: string
          submission_date?: string | null
        }
        Relationships: []
      }
      integrations_status: {
        Row: {
          error_message: string | null
          id: string
          last_check: string
          response_time_ms: number | null
          service_name: string
          status: string
        }
        Insert: {
          error_message?: string | null
          id?: string
          last_check?: string
          response_time_ms?: number | null
          service_name: string
          status: string
        }
        Update: {
          error_message?: string | null
          id?: string
          last_check?: string
          response_time_ms?: number | null
          service_name?: string
          status?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          related_id: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          related_id?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          related_id?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      product_catalog: {
        Row: {
          additional_images: string[] | null
          applications: string[] | null
          brand: string
          category: string
          compatible_with: string[] | null
          cooling_type: string | null
          created_at: string
          currency: string | null
          cylinders: number | null
          dimensions: string | null
          engine_brand: string | null
          engine_model: string | null
          engine_type: string | null
          frequency: string | null
          fuel_type: string | null
          full_description: string | null
          id: string
          key_features: string[] | null
          maintenance_notes: string | null
          model: string | null
          mounting_type: string | null
          name: string
          phase_type: string | null
          power_kva: number | null
          power_kw: number | null
          price: number | null
          primary_image_url: string | null
          rpm: string | null
          service_interval_hours: number | null
          short_description: string | null
          starting_type: string | null
          status: string | null
          stock_quantity: number | null
          subcategory: string | null
          updated_at: string
          voltage: string | null
          weight_kg: number | null
        }
        Insert: {
          additional_images?: string[] | null
          applications?: string[] | null
          brand: string
          category: string
          compatible_with?: string[] | null
          cooling_type?: string | null
          created_at?: string
          currency?: string | null
          cylinders?: number | null
          dimensions?: string | null
          engine_brand?: string | null
          engine_model?: string | null
          engine_type?: string | null
          frequency?: string | null
          fuel_type?: string | null
          full_description?: string | null
          id?: string
          key_features?: string[] | null
          maintenance_notes?: string | null
          model?: string | null
          mounting_type?: string | null
          name: string
          phase_type?: string | null
          power_kva?: number | null
          power_kw?: number | null
          price?: number | null
          primary_image_url?: string | null
          rpm?: string | null
          service_interval_hours?: number | null
          short_description?: string | null
          starting_type?: string | null
          status?: string | null
          stock_quantity?: number | null
          subcategory?: string | null
          updated_at?: string
          voltage?: string | null
          weight_kg?: number | null
        }
        Update: {
          additional_images?: string[] | null
          applications?: string[] | null
          brand?: string
          category?: string
          compatible_with?: string[] | null
          cooling_type?: string | null
          created_at?: string
          currency?: string | null
          cylinders?: number | null
          dimensions?: string | null
          engine_brand?: string | null
          engine_model?: string | null
          engine_type?: string | null
          frequency?: string | null
          fuel_type?: string | null
          full_description?: string | null
          id?: string
          key_features?: string[] | null
          maintenance_notes?: string | null
          model?: string | null
          mounting_type?: string | null
          name?: string
          phase_type?: string | null
          power_kva?: number | null
          power_kw?: number | null
          price?: number | null
          primary_image_url?: string | null
          rpm?: string | null
          service_interval_hours?: number | null
          short_description?: string | null
          starting_type?: string | null
          status?: string | null
          stock_quantity?: number | null
          subcategory?: string | null
          updated_at?: string
          voltage?: string | null
          weight_kg?: number | null
        }
        Relationships: []
      }
      product_service_relations: {
        Row: {
          created_at: string
          id: string
          is_recommended: boolean | null
          notes: string | null
          product_id: string | null
          service_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_recommended?: boolean | null
          notes?: string | null
          product_id?: string | null
          service_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_recommended?: boolean | null
          notes?: string | null
          product_id?: string | null
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_service_relations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_service_relations_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "service_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number | null
          status: string | null
          stock_quantity: number | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price?: number | null
          status?: string | null
          stock_quantity?: number | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number | null
          status?: string | null
          stock_quantity?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          amount: number | null
          contact_submission_id: number | null
          created_at: string
          id: string
          notes: string | null
          quote_number: string
          status: string | null
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          amount?: number | null
          contact_submission_id?: number | null
          created_at?: string
          id?: string
          notes?: string | null
          quote_number: string
          status?: string | null
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          amount?: number | null
          contact_submission_id?: number | null
          created_at?: string
          id?: string
          notes?: string | null
          quote_number?: string
          status?: string | null
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_contact_submission_id_fkey"
            columns: ["contact_submission_id"]
            isOneToOne: false
            referencedRelation: "contact_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      request_status_history: {
        Row: {
          changed_by: string | null
          created_at: string
          id: string
          new_status: string
          notes: string | null
          old_status: string | null
          request_tracking_id: string | null
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          id?: string
          new_status: string
          notes?: string | null
          old_status?: string | null
          request_tracking_id?: string | null
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          id?: string
          new_status?: string
          notes?: string | null
          old_status?: string | null
          request_tracking_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "request_status_history_request_tracking_id_fkey"
            columns: ["request_tracking_id"]
            isOneToOne: false
            referencedRelation: "request_tracking"
            referencedColumns: ["id"]
          },
        ]
      }
      request_tracking: {
        Row: {
          assigned_to: string | null
          contact_submission_id: number | null
          created_at: string
          customer_notified_at: string | null
          follow_up_date: string | null
          id: string
          notes: string | null
          priority: string | null
          quote_id: string | null
          status: string
          status_updated_at: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          contact_submission_id?: number | null
          created_at?: string
          customer_notified_at?: string | null
          follow_up_date?: string | null
          id?: string
          notes?: string | null
          priority?: string | null
          quote_id?: string | null
          status?: string
          status_updated_at?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          contact_submission_id?: number | null
          created_at?: string
          customer_notified_at?: string | null
          follow_up_date?: string | null
          id?: string
          notes?: string | null
          priority?: string | null
          quote_id?: string | null
          status?: string
          status_updated_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "request_tracking_contact_submission_id_fkey"
            columns: ["contact_submission_id"]
            isOneToOne: false
            referencedRelation: "contact_submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "request_tracking_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      service_catalog: {
        Row: {
          advance_notice_days: number | null
          applicable_products: string[] | null
          available_locations: string[] | null
          base_price: number | null
          category: string
          created_at: string
          currency: string | null
          description: string
          duration_hours: number | null
          equipment_brands: string[] | null
          frequency: string | null
          id: string
          included_items: string[] | null
          interval_hours: number | null
          mobile_service: boolean | null
          name: string
          parts_included: boolean | null
          price_type: string | null
          requirements: string[] | null
          service_type: string
          status: string | null
          tools_required: string[] | null
          updated_at: string
        }
        Insert: {
          advance_notice_days?: number | null
          applicable_products?: string[] | null
          available_locations?: string[] | null
          base_price?: number | null
          category: string
          created_at?: string
          currency?: string | null
          description: string
          duration_hours?: number | null
          equipment_brands?: string[] | null
          frequency?: string | null
          id?: string
          included_items?: string[] | null
          interval_hours?: number | null
          mobile_service?: boolean | null
          name: string
          parts_included?: boolean | null
          price_type?: string | null
          requirements?: string[] | null
          service_type: string
          status?: string | null
          tools_required?: string[] | null
          updated_at?: string
        }
        Update: {
          advance_notice_days?: number | null
          applicable_products?: string[] | null
          available_locations?: string[] | null
          base_price?: number | null
          category?: string
          created_at?: string
          currency?: string | null
          description?: string
          duration_hours?: number | null
          equipment_brands?: string[] | null
          frequency?: string | null
          id?: string
          included_items?: string[] | null
          interval_hours?: number | null
          mobile_service?: boolean | null
          name?: string
          parts_included?: boolean | null
          price_type?: string | null
          requirements?: string[] | null
          service_type?: string
          status?: string | null
          tools_required?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          base_price: number | null
          category: string
          created_at: string
          description: string | null
          duration_hours: number | null
          id: string
          name: string
          status: string | null
          updated_at: string
        }
        Insert: {
          base_price?: number | null
          category: string
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          base_price?: number | null
          category?: string
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_quote_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
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
