import { BrowsePageCourses, TopicI } from 'types/pages/browse-page';
import resultWithoutTagAndTopic from 'helpers/data/remove-topic-and-tag-from-browse-page-course';
interface CourseTopicsSearchArgInterface {
  selectedTopicData: TopicI;
  courseData: BrowsePageCourses;
}

function courseTopicsSearch({
  selectedTopicData,
  courseData,
}: CourseTopicsSearchArgInterface) {
  if (!courseData) {
    return [];
  }

  const { id: selectedTopicId } = selectedTopicData;

  const searchResult = courseData.filter((course) => {
    const { Topic: courseTopics } = course;

    if (!Array.isArray(courseTopics) && selectedTopicId === courseTopics?.id) {
      return true;
    }
    if (!Array.isArray(courseTopics)) {
      return false;
    }

    return courseTopics.map((topic) => topic.id).includes(selectedTopicId);
  });

  return searchResult.map((result) => resultWithoutTagAndTopic(result));
}

export { courseTopicsSearch, type CourseTopicsSearchArgInterface };
