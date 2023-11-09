import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getJobs from '@wasp/queries/getJobs';
import applyForJob from '@wasp/actions/applyForJob';

export function Home() {
  const { data: jobs, isLoading, error } = useQuery(getJobs);
  const applyForJobFn = useAction(applyForJob);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleApplyForJob = (jobId) => {
    applyForJobFn({ jobId });
  }

  return (
    <div className='p-4'>
      {jobs.map((job) => (
        <div
          key={job.id}
          className='bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <h2 className='text-xl'>{job.description}</h2>
          <p>{job.requirements}</p>
          <button
            onClick={() => handleApplyForJob(job.id)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  );
}