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
      event: {
        Row: {
          created_at: string
          date: string
          group_id: string
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          date: string
          group_id: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          group_id?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
        ]
      }
      group: {
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
      group_member: {
        Row: {
          confirmed: number | null
          created_at: string
          group_id: string
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          confirmed?: number | null
          created_at?: string
          group_id: string
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          confirmed?: number | null
          created_at?: string
          group_id?: string
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_member_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "group"
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
          longitude?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      match: {
        Row: {
          created_at: string
          event_id: string
          id: string
          time_end: string
          time_pause: string | null
          time_start: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          time_end: string
          time_pause?: string | null
          time_start: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          time_end?: string
          time_pause?: string | null
          time_start?: string
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
          team_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          event_id: string
          group_member_id: string
          id?: string
          position?: string | null
          team_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string
          group_member_id?: string
          id?: string
          position?: string | null
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
          created_at: string
          id: string
          player_id: string
          score_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          player_id: string
          score_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          player_id?: string
          score_id?: string
          updated_at?: string | null
        }
        Relationships: [
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
          first_name: string | null
          height: number | null
          id: string
          last_name: string | null
          position: string | null
        }
        Insert: {
          birth_date?: string | null
          first_name?: string | null
          height?: number | null
          id: string
          last_name?: string | null
          position?: string | null
        }
        Update: {
          birth_date?: string | null
          first_name?: string | null
          height?: number | null
          id?: string
          last_name?: string | null
          position?: string | null
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
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          name?: string
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
      user_match: {
        Row: {
          created_at: string
          host: boolean
          id: string
          match_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          host: boolean
          id?: string
          match_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          host?: boolean
          id?: string
          match_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_match_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_match_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
