import { convertCourseDataToCourseProps } from 'helpers/data/data';
import { CourseDataType, TopicDataType } from 'types/api/data';

interface CourseTopicsSearchArgInterface {
  selectedTopicData: TopicDataType;
  courseData: CourseDataType[];
}

function courseTopicsSearch({
  selectedTopicData,
  courseData,
}: CourseTopicsSearchArgInterface) {
  const { id: selectedTopicId } = selectedTopicData;

  const searchResult = courseData.filter((course) => {
    return course.topics.includes(selectedTopicId);
  });

  return convertCourseDataToCourseProps(searchResult);
}

export { courseTopicsSearch, type CourseTopicsSearchArgInterface };
