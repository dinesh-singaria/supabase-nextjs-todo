export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      notifications: {
        Row: {
          created_at: string;
          id: number;
          is_read: boolean | null;
          message: string;
          recipient_id: string;
          task_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_read?: boolean | null;
          message: string;
          recipient_id: string;
          task_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_read?: boolean | null;
          message?: string;
          recipient_id?: string;
          task_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: false;
            referencedRelation: "todos";
            referencedColumns: ["id"];
          }
        ];
      };
      todos: {
        Row: {
          assigned_to: string | null;
          due_date: string | null;
          id: number;
          inserted_at: string;
          is_complete: boolean | null;
          task: string | null;
          user_id: string;
        };
        Insert: {
          assigned_to?: string | null;
          due_date?: string | null;
          id?: number;
          inserted_at?: string;
          is_complete?: boolean | null;
          task?: string | null;
          user_id: string;
        };
        Update: {
          assigned_to?: string | null;
          due_date?: string | null;
          id?: number;
          inserted_at?: string;
          is_complete?: boolean | null;
          task?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
