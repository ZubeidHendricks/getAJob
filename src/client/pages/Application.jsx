import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getApplication from '@wasp/queries/getApplication';

export function ApplicationPage() {
  const { applicationId } = useParams();
  const { data: application, isLoading, error } = useQuery(getApplication, { applicationId });

  if (isLoading) return 'Loading...';
  if (error) return `Error: ${error}`;

  return (
    <div>
      <h1>{application.status}</h1>
      <p>Details: {application.details}</p>
    </div>
  );
}