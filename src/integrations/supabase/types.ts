export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_credentials: {
        Row: {
          id: number
          password_hash: string
          username: string
        }
        Insert: {
          id?: never
          password_hash: string
          username: string
        }
        Update: {
          id?: never
          password_hash?: string
          username?: string
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
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
