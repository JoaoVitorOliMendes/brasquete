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
      event: {
        Row: {
          created_at: string
          date: string
          group_id: string
          id: string
          status: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          date: string
          group_id: string
          id?: string
          status?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          group_id?: string
          id?: string
          status?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_member: {
        Row: {
          confirmed: number
          created_at: string
          group_id: string
          id: string
          status: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          confirmed?: number
          created_at?: string
          group_id: string
          id?: string
          status?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          confirmed?: number
          created_at?: string
          group_id?: string
          id?: string
          status?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_member_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          admin_id: string
          created_at: string
          id: string
          level: number
          location_id: string | null
          name: string
          private: boolean
          updated_at: string | null
        }
        Insert: {
          admin_id: string
          created_at?: string
          id?: string
          level?: number
          location_id?: string | null
          name: string
          private?: boolean
          updated_at?: string | null
        }
        Update: {
          admin_id?: string
          created_at?: string
          id?: string
          level?: number
          location_id?: string | null
          name?: string
          private?: boolean
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["id"]
          },
        ]
      }
      location: {
        Row: {
          add_city: string | null
          add_country: string | null
          add_neighborhood: string | null
          add_number: string | null
          add_state: string | null
          add_street: string | null
          created_at: string
          id: string
          latitude: number
          location_img: string | null
          longitude: number
          updated_at: string | null
        }
        Insert: {
          add_city?: string | null
          add_country?: string | null
          add_neighborhood?: string | null
          add_number?: string | null
          add_state?: string | null
          add_street?: string | null
          created_at?: string
          id?: string
          latitude: number
          location_img?: string | null
          longitude: number
          updated_at?: string | null
        }
        Update: {
          add_city?: string | null
          add_country?: string | null
          add_neighborhood?: string | null
          add_number?: string | null
          add_state?: string | null
          add_street?: string | null
          created_at?: string
          id?: string
          latitude?: number
          location_img?: string | null
          longitude?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      match: {
        Row: {
          created_at: string
          duration: number
          event_id: string
          id: string
          pause_duration: number | null
          team_a_id: string | null
          team_b_id: string | null
          time_end: string | null
          time_pause: string | null
          time_start: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          duration: number
          event_id: string
          id?: string
          pause_duration?: number | null
          team_a_id?: string | null
          team_b_id?: string | null
          time_end?: string | null
          time_pause?: string | null
          time_start?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          duration?: number
          event_id?: string
          id?: string
          pause_duration?: number | null
          team_a_id?: string | null
          team_b_id?: string | null
          time_end?: string | null
          time_pause?: string | null
          time_start?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "match_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_team_a_id_fkey"
            columns: ["team_a_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_team_b_id_fkey"
            columns: ["team_b_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
        ]
      }
      motives: {
        Row: {
          created_at: string
          id: string
          motive: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          motive: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          motive?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      player: {
        Row: {
          created_at: string
          event_id: string
          group_member_id: string
          id: string
          position: string | null
          status: number | null
          team_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          event_id: string
          group_member_id: string
          id?: string
          position?: string | null
          status?: number | null
          team_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string
          group_member_id?: string
          id?: string
          position?: string | null
          status?: number | null
          team_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_group_member_id_fkey"
            columns: ["group_member_id"]
            isOneToOne: false
            referencedRelation: "group_member"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
        ]
      }
      player_score: {
        Row: {
          count: number
          created_at: string
          id: string
          match_id: string | null
          player_id: string
          score_id: string
          updated_at: string | null
        }
        Insert: {
          count?: number
          created_at?: string
          id?: string
          match_id?: string | null
          player_id: string
          score_id: string
          updated_at?: string | null
        }
        Update: {
          count?: number
          created_at?: string
          id?: string
          match_id?: string | null
          player_id?: string
          score_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_score_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_score_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_score_score_id_fkey"
            columns: ["score_id"]
            isOneToOne: false
            referencedRelation: "score"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          birth_date: string | null
          expo_push_token: string | null
          first_name: string
          height: number | null
          id: string
          last_name: string
          position: string | null
          profile_img: string | null
        }
        Insert: {
          birth_date?: string | null
          expo_push_token?: string | null
          first_name: string
          height?: number | null
          id: string
          last_name: string
          position?: string | null
          profile_img?: string | null
        }
        Update: {
          birth_date?: string | null
          expo_push_token?: string | null
          first_name?: string
          height?: number | null
          id?: string
          last_name?: string
          position?: string | null
          profile_img?: string | null
        }
        Relationships: []
      }
      report: {
        Row: {
          created_at: string
          created_by: string
          id: string
          other_motive: string | null
          target: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: string
          other_motive?: string | null
          target: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          other_motive?: string | null
          target?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_target_fkey"
            columns: ["target"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      report_motive: {
        Row: {
          created_at: string
          id: string
          motive_id: string
          report_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          motive_id: string
          report_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          motive_id?: string
          report_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_motive_motive_id_fkey"
            columns: ["motive_id"]
            isOneToOne: false
            referencedRelation: "motives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_motive_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "report"
            referencedColumns: ["id"]
          },
        ]
      }
      score: {
        Row: {
          created_at: string
          id: string
          score: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          score: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          score?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      team: {
        Row: {
          created_at: string
          event_id: string
          id: string
          name: string
          status: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          name: string
          status?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          name?: string
          status?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      closedmatchresult: {
        Args: { _user_id: string }
        Returns: {
          match_id: string
          match_start: string
          match_end: string
          team_a_name: string
          team_b_name: string
          team_a_points: string
          team_b_points: string
          team_a_faltas: string
          team_b_faltas: string
        }[]
      }
      playerscoresformatch: {
        Args: { _match_id: string }
        Returns: {
          name: string
          profile_img: string
          player_score: Json
        }[]
      }
      safe_to_numeric: {
        Args: { input_text: string }
        Returns: number
      }
      safe_to_timestamptz: {
        Args: { input_text: string }
        Returns: string
      }
      select_events_logged_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          date: string
          group_id: string
          id: string
          status: number
          updated_at: string | null
        }[]
      }
      userstatistics: {
        Args: { _user_id: string }
        Returns: {
          profileid: string
          avgstat: string
          score: string
        }[]
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
