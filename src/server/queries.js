import HttpError from '@wasp/core/HttpError.js'


export const getUser = async ({ identifier }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: parseInt(identifier) },
    include: {
      applications: true,
      courses: true,
      notifications: true
    }
  });

  if (!user) throw new HttpError(404, `User with identifier ${identifier} not found`);

  return user;
}

export const getJob = async ({ jobId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const job = await context.entities.Job.findUnique({
    where: { id: jobId },
    include: { applications: true }
  });

  if (!job) { throw new HttpError(404, `Job with id ${jobId} not found`); }

  return job;
}

export const getJobs = async (args, context) => {
  const jobs = await context.entities.Job.findMany({
    where: { isOpen: true }
  });

  return jobs;
}

export const getApplication = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { applicationId } = args;
  const application = await context.entities.Application.findUnique({
    where: { id: applicationId },
    include: { job: true, user: true }
  });

  if (!application) throw new HttpError(404, 'No application with id ' + applicationId);

  return application;
}

export const getCourse = async (args, context) => {
  const { courseId } = args;

  const course = await context.entities.Course.findUnique({
    where: { id: courseId },
    include: { user: true }
  });

  if (!course) throw new HttpError(404, 'No course with id ' + courseId);

  return course;
}

export const getNotification = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { id } = args;

  const notification = await context.entities.Notification.findUnique({
    where: { id }
  });

  if (!notification) { throw new HttpError(404, `Notification with id ${id} not found`); }

  return notification;
}