import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getUser from '@wasp/queries/getUser';

export function Profile() {
  const { data: user } = useQuery(getUser);
  const { data: applications } = useQuery(getApplications);
  const { data: courses } = useQuery(getCourses);
  const { data: notifications } = useQuery(getNotifications);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Profile</h1>
      <h2 className='text-xl font-bold mb-2'>Username: {user?.username}</h2>
      <h2 className='text-xl font-bold mb-2'>Resume: {user?.resume}</h2>

      <h2 className='text-xl font-bold mt-4 mb-2'>Applications:</h2>
      {applications && applications.map((application) => (
        <div key={application.id}>{application.job.description}</div>
      ))}

      <h2 className='text-xl font-bold mt-4 mb-2'>Courses:</h2>
      {courses && courses.map((course) => (
        <div key={course.id}>{course.title}</div>
      ))}

      <h2 className='text-xl font-bold mt-4 mb-2'>Notifications:</h2>
      {notifications && notifications.map((notification) => (
        <div key={notification.id}>{notification.content}</div>
      ))}
    </div>
  );
}