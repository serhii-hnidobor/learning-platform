import getSupabaseClient from 'lib/get-supabase-client/supabase-client';

async function getLessonById(lessonId: string, supabaseAccessToken: string) {
  const supabase = getSupabaseClient(supabaseAccessToken);

  const { data } = await supabase
    .from('Lesson')
    .select(
      'id, index, section_index, text_content, name, youtube_embed_id, description, course_id, FileAttachment(*), next_lesson:next_lesson_id(index, name, duration, id)',
    )
    .eq('id', lessonId);

  return data;
}

export { getLessonById };
