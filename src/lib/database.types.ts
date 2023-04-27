export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Course: {
        Row: {
          author_name: string;
          created_at: string;
          description: string;
          detailed_description: string;
          duration: number;
          id: string;
          lesson_num: number;
          name: string;
          popular: boolean;
          preview_img_src: string;
          rating: number;
          updated_at: string;
          what_learn: string[] | null;
          youtube_embed_id: string;
        };
        Insert: {
          author_name?: string;
          created_at?: string;
          description?: string;
          detailed_description?: string;
          duration?: number;
          id: string;
          lesson_num?: number;
          name?: string;
          popular?: boolean;
          preview_img_src?: string;
          rating?: number;
          updated_at?: string;
          what_learn?: string[] | null;
          youtube_embed_id?: string;
        };
        Update: {
          author_name?: string;
          created_at?: string;
          description?: string;
          detailed_description?: string;
          duration?: number;
          id?: string;
          lesson_num?: number;
          name?: string;
          popular?: boolean;
          preview_img_src?: string;
          rating?: number;
          updated_at?: string;
          what_learn?: string[] | null;
          youtube_embed_id?: string;
        };
      };
      CourseSection: {
        Row: {
          course_id: string;
          created_at: string | null;
          duration: number;
          id: string;
          index: number;
          lessons_num: number;
          name: string;
          updated_at: string | null;
          youtube_embed_id: string;
        };
        Insert: {
          course_id: string;
          created_at?: string | null;
          duration?: number;
          id: string;
          index?: number;
          lessons_num?: number;
          name?: string;
          updated_at?: string | null;
          youtube_embed_id?: string;
        };
        Update: {
          course_id?: string;
          created_at?: string | null;
          duration?: number;
          id?: string;
          index?: number;
          lessons_num?: number;
          name?: string;
          updated_at?: string | null;
          youtube_embed_id?: string;
        };
      };
      FileAttachment: {
        Row: {
          created_at: string | null;
          file_name: string;
          file_size: number;
          file_url: string;
          id: string;
          lesson_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          file_name?: string;
          file_size?: number;
          file_url?: string;
          id?: string;
          lesson_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          file_name?: string;
          file_size?: number;
          file_url?: string;
          id?: string;
          lesson_id?: string;
          updated_at?: string | null;
        };
      };
      Lesson: {
        Row: {
          course_id: string;
          created_at: string;
          description: string;
          duration: number;
          id: string;
          index: number;
          is_text_lesson: boolean;
          name: string;
          next_lesson_id: string | null;
          section_id: string;
          section_index: number;
          text_content: string;
          updated_at: string;
          youtube_embed_id: string | null;
        };
        Insert: {
          course_id: string;
          created_at?: string;
          description: string;
          duration?: number;
          id: string;
          index?: number;
          is_text_lesson: boolean;
          name?: string;
          next_lesson_id?: string | null;
          section_id: string;
          section_index?: number;
          text_content?: string;
          updated_at?: string;
          youtube_embed_id?: string | null;
        };
        Update: {
          course_id?: string;
          created_at?: string;
          description?: string;
          duration?: number;
          id?: string;
          index?: number;
          is_text_lesson?: boolean;
          name?: string;
          next_lesson_id?: string | null;
          section_id?: string;
          section_index?: number;
          text_content?: string;
          updated_at?: string;
          youtube_embed_id?: string | null;
        };
      };
      Review: {
        Row: {
          created_at: string | null;
          id: string;
          review_author_avatar_src: string;
          review_author_name: string;
          review_text: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          review_author_avatar_src?: string;
          review_author_name?: string;
          review_text?: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          review_author_avatar_src?: string;
          review_author_name?: string;
          review_text?: string;
          updated_at?: string | null;
        };
      };
      Tag: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          name?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
      };
      TagsOnCourse: {
        Row: {
          assigned_at: string;
          assigned_by: string;
          course_id: string;
          tag_id: string;
        };
        Insert: {
          assigned_at?: string;
          assigned_by: string;
          course_id: string;
          tag_id: string;
        };
        Update: {
          assigned_at?: string;
          assigned_by?: string;
          course_id?: string;
          tag_id?: string;
        };
      };
      Topic: {
        Row: {
          course_id: string;
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          course_id: string;
          created_at?: string;
          id: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          course_id?: string;
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          email: string | null;
          id: string;
          image: string | null;
          name: string | null;
        };
        Insert: {
          email?: string | null;
          id: string;
          image?: string | null;
          name?: string | null;
        };
        Update: {
          email?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
        };
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
}
