import HttpError from '@wasp/core/HttpError.js'


export const createJob = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Job.create({
    data: {
      description: args.description,
      requirements: args.requirements,
      benefits: args.benefits
    }
  })
}

export const applyForJob = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { jobId } = args;

  // Check if the job exists
  const job = await context.entities.Job.findUnique({
    where: { id: jobId }
  });
  if (!job) { throw new HttpError(404, 'Job not found'); }

  // Create a new application
  const application = await context.entities.Application.create({
    data: {
      status: 'pending',
      job: { connect: { id: jobId } },
      user: { connect: { id: context.user.id } }
    }
  });

  return application;
}

export const createCourse = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Course.create({
    data: {
      title: args.title,
      content: args.content,
      user: { connect: { id: context.user.id } }
    }
  })
}

export const enrollInCourse = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });
  const course = await context.entities.Course.findUnique({
    where: { id: args.courseId }
  });
  
  if (!user || !course) { throw new HttpError(404) };
  
  await context.entities.User.update({
    where: { id: context.user.id },
    data: { courses: { connect: { id: args.courseId } } }
  });
  
  return true;
}

export const createNotification = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Notification.create({
    data: {
      content: args.content,
      user: { connect: { id: context.user.id } }
    }
  })
}