import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getCourse from '@wasp/queries/getCourse';
import enrollInCourse from '@wasp/actions/enrollInCourse';

export function Course() {
  const { courseId } = useParams();
  const { data: course, isLoading, error } = useQuery(getCourse, { courseId });
  const enrollInCourseFn = useAction(enrollInCourse);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleEnroll = () => {
    enrollInCourseFn({ courseId });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{course.title}</h1>
      <p>{course.content}</p>
      <button
        onClick={handleEnroll}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
      >
        Enroll
      </button>
    </div>
  );
}