import getSupabaseClient from 'lib/get-supabase-client/supabase-client';

async function getCourse(courseId: string, supabaseAccessToken: string) {
  const supabase = getSupabaseClient(supabaseAccessToken);

  const { data } = await supabase
    .from('Course')
    .select(
      'author_name, name, rating, youtube_embed_id, description, detailed_description, what_learn',
    )
    .eq('id', courseId);

  return data;
}

async function getCourseSection(courseId: string, supabaseAccessToken: string) {
  const supabase = getSupabaseClient(supabaseAccessToken);

  const { data } = await supabase
    .from('CourseSection')
    .select()
    .eq('course_id', courseId);

  return data;
}

async function getCourseLessons(courseId: string, supabaseAccessToken: string) {
  const supabase = getSupabaseClient(supabaseAccessToken);

  const { data } = await supabase
    .from('Lesson')
    .select('duration, name, index, id, youtube_embed_id, section_id')
    .order('index', { ascending: true })
    .eq('course_id', courseId);

  return data;
}

export { getCourse, getCourseSection, getCourseLessons };
