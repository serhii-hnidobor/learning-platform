import getSupabaseClient from 'lib/get-supabase-client/supabase-client';

async function getCourses(supabaseAccessToken: string) {
  const supabase = getSupabaseClient(supabaseAccessToken);

  const { data, error } = await supabase
    .from('Course')
    .select(
      'preview_img_src, lesson_num, author_name, name, rating, id, popular, Tag ( id ), Topic ( id )',
    );

  if (error) {
    throw error;
  }

  return data;
}

async function getTopics(supabaseAccessToken: string) {
  const supabase = getSupabaseClient(supabaseAccessToken);

  const { data, error } = await supabase.from('Topic').select();

  if (error) {
    throw error;
  }

  return data;
}

export { getTopics, getCourses };
