export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      exam_attempts: {
        Row: {
          created_at: string
          date: string
          exam_template_id: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          exam_template_id: string
          id?: string
          name: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          date?: string
          exam_template_id?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_attempts_exam_template_id_fkey"
            columns: ["exam_template_id"]
            isOneToOne: false
            referencedRelation: "exam_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_university_programs_view"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      exam_templates: {
        Row: {
          category: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number
          created_at: string
          id: string
          merchant_oid: string | null
          payment_details: Json | null
          payment_id: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          merchant_oid?: string | null
          payment_details?: Json | null
          payment_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          merchant_oid?: string | null
          payment_details?: Json | null
          payment_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          graduated: boolean
          id: string
          image_url: string | null
          is_premium: boolean
          name: string | null
          obp: number
          university_program: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          graduated?: boolean
          id: string
          image_url?: string | null
          is_premium?: boolean
          name?: string | null
          obp?: number
          university_program?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          graduated?: boolean
          id?: string
          image_url?: string | null
          is_premium?: boolean
          name?: string | null
          obp?: number
          university_program?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_university_program_fkey"
            columns: ["university_program"]
            isOneToOne: false
            referencedRelation: "profiles_university_programs_view"
            referencedColumns: ["university_program_id"]
          },
          {
            foreignKeyName: "profiles_university_program_fkey"
            columns: ["university_program"]
            isOneToOne: false
            referencedRelation: "university_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      subject_results: {
        Row: {
          correct_count: number
          created_at: string
          exam_attempt_id: string
          id: string
          incorrect_count: number
          subject_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          correct_count?: number
          created_at?: string
          exam_attempt_id: string
          id?: string
          incorrect_count?: number
          subject_id: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          correct_count?: number
          created_at?: string
          exam_attempt_id?: string
          id?: string
          incorrect_count?: number
          subject_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subject_results_exam_attempt_id_fkey"
            columns: ["exam_attempt_id"]
            isOneToOne: false
            referencedRelation: "exam_attempt_view"
            referencedColumns: ["attempt_id"]
          },
          {
            foreignKeyName: "subject_results_exam_attempt_id_fkey"
            columns: ["exam_attempt_id"]
            isOneToOne: false
            referencedRelation: "exam_attempt_view_dashboard"
            referencedColumns: ["attempt_id"]
          },
          {
            foreignKeyName: "subject_results_exam_attempt_id_fkey"
            columns: ["exam_attempt_id"]
            isOneToOne: false
            referencedRelation: "exam_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subject_results_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subject_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subject_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_university_programs_view"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      subjects: {
        Row: {
          created_at: string
          display_order: number
          exam_template_id: string
          id: string
          name: string
          question_count: number
        }
        Insert: {
          created_at?: string
          display_order: number
          exam_template_id: string
          id?: string
          name: string
          question_count: number
        }
        Update: {
          created_at?: string
          display_order?: number
          exam_template_id?: string
          id?: string
          name?: string
          question_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "subjects_exam_template_id_fkey"
            columns: ["exam_template_id"]
            isOneToOne: false
            referencedRelation: "exam_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      university_programs: {
        Row: {
          category: Database["public"]["Enums"]["exam_category"]
          department: string
          description: string | null
          id: string
          program: string
          rank: number | null
          score: number | null
          university: string
        }
        Insert: {
          category: Database["public"]["Enums"]["exam_category"]
          department: string
          description?: string | null
          id: string
          program: string
          rank?: number | null
          score?: number | null
          university: string
        }
        Update: {
          category?: Database["public"]["Enums"]["exam_category"]
          department?: string
          description?: string | null
          id?: string
          program?: string
          rank?: number | null
          score?: number | null
          university?: string
        }
        Relationships: []
      }
      yks_rankings: {
        Row: {
          ayt_exam_attempt_id: string | null
          created_at: string
          ea_placement_rank: number
          ea_placement_score: number
          ea_raw_rank: number
          ea_raw_score: number
          graduated: boolean
          id: string
          obp: number
          say_placement_rank: number
          say_placement_score: number
          say_raw_rank: number
          say_raw_score: number
          soz_placement_rank: number
          soz_placement_score: number
          soz_raw_rank: number
          soz_raw_score: number
          tyt_exam_attempt_id: string | null
          tyt_placement_rank: number
          tyt_placement_score: number
          tyt_raw_rank: number
          tyt_raw_score: number
          user_id: string
        }
        Insert: {
          ayt_exam_attempt_id?: string | null
          created_at?: string
          ea_placement_rank: number
          ea_placement_score: number
          ea_raw_rank: number
          ea_raw_score: number
          graduated?: boolean
          id?: string
          obp?: number
          say_placement_rank: number
          say_placement_score: number
          say_raw_rank: number
          say_raw_score: number
          soz_placement_rank: number
          soz_placement_score: number
          soz_raw_rank: number
          soz_raw_score: number
          tyt_exam_attempt_id?: string | null
          tyt_placement_rank: number
          tyt_placement_score: number
          tyt_raw_rank: number
          tyt_raw_score: number
          user_id?: string
        }
        Update: {
          ayt_exam_attempt_id?: string | null
          created_at?: string
          ea_placement_rank?: number
          ea_placement_score?: number
          ea_raw_rank?: number
          ea_raw_score?: number
          graduated?: boolean
          id?: string
          obp?: number
          say_placement_rank?: number
          say_placement_score?: number
          say_raw_rank?: number
          say_raw_score?: number
          soz_placement_rank?: number
          soz_placement_score?: number
          soz_raw_rank?: number
          soz_raw_score?: number
          tyt_exam_attempt_id?: string | null
          tyt_placement_rank?: number
          tyt_placement_score?: number
          tyt_raw_rank?: number
          tyt_raw_score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "yks_rankings_ayt_exam_attempt_id_fkey"
            columns: ["ayt_exam_attempt_id"]
            isOneToOne: false
            referencedRelation: "exam_attempt_view"
            referencedColumns: ["attempt_id"]
          },
          {
            foreignKeyName: "yks_rankings_ayt_exam_attempt_id_fkey"
            columns: ["ayt_exam_attempt_id"]
            isOneToOne: false
            referencedRelation: "exam_attempt_view_dashboard"
            referencedColumns: ["attempt_id"]
          },
          {
            foreignKeyName: "yks_rankings_ayt_exam_attempt_id_fkey"
            columns: ["ayt_exam_attempt_id"]
            isOneToOne: false
            referencedRelation: "exam_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yks_rankings_tyt_exam_attempt_id_fkey"
            columns: ["tyt_exam_attempt_id"]
            isOneToOne: false
            referencedRelation: "exam_attempt_view"
            referencedColumns: ["attempt_id"]
          },
          {
            foreignKeyName: "yks_rankings_tyt_exam_attempt_id_fkey"
            columns: ["tyt_exam_attempt_id"]
            isOneToOne: false
            referencedRelation: "exam_attempt_view_dashboard"
            referencedColumns: ["attempt_id"]
          },
          {
            foreignKeyName: "yks_rankings_tyt_exam_attempt_id_fkey"
            columns: ["tyt_exam_attempt_id"]
            isOneToOne: false
            referencedRelation: "exam_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yks_rankings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yks_rankings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_university_programs_view"
            referencedColumns: ["profile_id"]
          },
        ]
      }
    }
    Views: {
      exam_attempt_view: {
        Row: {
          attempt_date: string | null
          attempt_id: string | null
          attempt_name: string | null
          created_at: string | null
          exam_category: string | null
          exam_template_name: string | null
          net_score: number | null
          total_blank: number | null
          total_correct: number | null
          total_incorrect: number | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exam_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_university_programs_view"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      exam_attempt_view_dashboard: {
        Row: {
          attempt_date: string | null
          attempt_id: string | null
          attempt_name: string | null
          created_at: string | null
          exam_category: string | null
          exam_template_name: string | null
          net_score: number | null
          total_blank: number | null
          total_correct: number | null
          total_incorrect: number | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exam_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_university_programs_view"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      profiles_university_programs_view: {
        Row: {
          category: Database["public"]["Enums"]["exam_category"] | null
          created_at: string | null
          department: string | null
          description: string | null
          email: string | null
          graduated: boolean | null
          image_url: string | null
          name: string | null
          obp: number | null
          profile_id: string | null
          program: string | null
          rank: number | null
          score: number | null
          university: string | null
          university_program: string | null
          university_program_id: string | null
          updated_at: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_university_program_fkey"
            columns: ["university_program"]
            isOneToOne: false
            referencedRelation: "profiles_university_programs_view"
            referencedColumns: ["university_program_id"]
          },
          {
            foreignKeyName: "profiles_university_program_fkey"
            columns: ["university_program"]
            isOneToOne: false
            referencedRelation: "university_programs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      calculate_subject_net: {
        Args: { correct_count: number; incorrect_count: number }
        Returns: number
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      exam_category: "say" | "soz" | "ea" | "dil" | "tyt"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      exam_category: ["say", "soz", "ea", "dil", "tyt"],
    },
  },
} as const
