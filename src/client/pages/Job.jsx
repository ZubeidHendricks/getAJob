import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getJob from '@wasp/queries/getJob';

export function Job() {
  const { data: job, isLoading, error } = useQuery(getJob);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{job.description}</h1>
      <div className='mb-4'>Requirements: {job.requirements}</div>
      <div className='mb-4'>Benefits: {job.benefits}</div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Apply</button>
      <Link to='/' className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2'>Back</Link>
    </div>
  );
}