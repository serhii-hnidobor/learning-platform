import getSupabaseClient from 'lib/get-supabase-client/supabase-client';

async function getReviews(supabaseAccessToken: string) {
  const supabase = getSupabaseClient(supabaseAccessToken);

  const { data } = await supabase
    .from('Review')
    .select('review_text, review_author_name, review_author_avatar_src');

  return data;
}

async function getCourses(supabaseAccessToken: string) {
  const supabase = getSupabaseClient(supabaseAccessToken);

  const { data } = await supabase
    .from('Course')
    .select(
      'preview_img_src, lesson_num, author_name, name, rating, id, popular, Tag ( id )',
    )
    .limit(5);

  return data;
}

async function getTags(supabaseAccessToken: string) {
  const supabase = getSupabaseClient(supabaseAccessToken);

  const { data } = await supabase.from('Tag').select('id, name');

  return data;
}

export { getTags, getCourses, getReviews };
