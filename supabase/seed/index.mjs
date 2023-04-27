import * as fs from 'fs';
import cliProgress from "cli-progress";
import {createClient} from "@supabase/supabase-js";
import * as path from "path";
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
dotenv.config({path: '../../.env.local'})

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY){
  throw new Error('supabase env not specify')
}

const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const courses = JSON.parse(
  fs.readFileSync(path.resolve(__dirname,'data/courses.json'), { encoding: 'utf-8' }),
);
const lessons = JSON.parse(
  fs.readFileSync(path.resolve(__dirname,'data/lessons.json'), { encoding: 'utf-8' }),
);
const sections = JSON.parse(
  fs.readFileSync(path.resolve(__dirname,'data/courseSections.json'), { encoding: 'utf-8' }),
);
const reviews = JSON.parse(
  fs.readFileSync(path.resolve(__dirname,'data/reviews.json'), { encoding: 'utf-8' }),
);
const tags = JSON.parse(
  fs.readFileSync(path.resolve(__dirname,'data/tags.json'), { encoding: 'utf-8' }),
);
const topics = JSON.parse(
  fs.readFileSync(path.resolve(__dirname,'data/topics.json'), { encoding: 'utf-8' }),
);

const numAllRecord = courses.length + (lessons.length * 2) + sections.length + reviews.length + tags.length + topics.length;
let curWrittenRecordNum = 0;

const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect);

async function insert(data, tableName) {
  if (!Array.isArray(data)){
    const {error} = await supabase.from(tableName).insert(data);

    if (error && error.code !== '23505'){
      console.error(error);
    }
    curWrittenRecordNum++;
    progressBar.start(numAllRecord, curWrittenRecordNum);

    return;
  }

  for (const obj of data) {
    const {error} = await supabase.from(tableName).insert(obj);

    if (error && error.code !== '23505'){
        console.error(error);
    }
    curWrittenRecordNum++;
    progressBar.start(numAllRecord, curWrittenRecordNum);
  }
}

async function update(data, tableName, id){
  const {error} = await supabase.from(tableName).update(data).eq('id', id);

  if (error){
    console.error(error);
  }
}
async function createTags (tagsIds, courseId){
  for (const tagId of tagsIds){
    await insert([{course_id: courseId, tag_id: tagId, assigned_by: 'admin'}], 'TagsOnCourse')
  }
}

async function seedLesson (courseId) {

  const fileAttachments = lessons.filter(l => l.course_id === courseId).map(lesson => { return {...lesson.attachment, lesson_id: lesson.id}});

  const courseLesson = lessons.filter(l => l.course_id === courseId).map(l => {
    if (!l.next_lesson){
      delete l.next_lesson;
      delete l.attachment;
      delete l.course_name;
      return l;
    }

    const { next_lesson } = l;
    l.next_lesson_id = next_lesson.id;
    delete l.next_lesson;
    delete l.attachment;
    delete l.course_name;
    return {
      ...l,
    }
  });

  for(const lesson of  courseLesson){
    await insert([{...lesson, next_lesson_id: null }],'Lesson')
  }

  for (const attachment of fileAttachments){
    if (attachment){
      await insert([attachment],'FileAttachment')
    }
  }


  for (const lesson of courseLesson){
    await update({next_lesson_id: lesson.next_lesson_id}, 'Lesson', lesson.id);
  }
}

async function main() {
  progressBar.start(numAllRecord, 0);

  await insert(reviews, 'Review')

  for (const course of courses) {
    const courseData = {...course, tags: undefined, topics: undefined};
    const { id: curCourseId } = courseData;

    const courseSection = sections.filter(
      (section) => section.course_id === curCourseId,
    );

    const courseTags = tags.filter((tag) => tag.course_id === curCourseId).map(tag => {return {...tag, course_id: undefined} });
    const courseTopics = topics.filter(
      (topic) => topic.course_id === curCourseId,
    );

    await insert([courseData], 'Course');
    await insert(courseSection, 'CourseSection');
    await insert(courseTopics, 'Topic');
    await insert(courseTags,'Tag');
    await createTags(course.tags, curCourseId)

    await seedLesson(course.id);
  }

  progressBar.stop();
}

main();