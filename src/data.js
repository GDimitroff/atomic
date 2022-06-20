import Project from './models/Project';
import Task from './models/Task';

export const defaultData = () => {
  let projects = [];

  const personal = new Project('Personal', 'pink');
  const workout = new Project('Workout', 'green');
  const education = new Project('Education', 'gold');

  const gift = new Task(
    'Buy gift for my bae',
    personal,
    'If you dare to miss this you are gonna be homeless... and single!',
    'high',
    '11.03.2023',
    false,
    true
  );

  const flowers = new Task(
    'Buy flowers for my sweetheart',
    personal,
    "Every woman loves flowers even if the say they don't",
    'medium',
    '23.06.2022',
    false,
    true
  );

  personal.addTask(gift);
  personal.addTask(flowers);

  const upperBodyWorkout = new Task(
    'Upper body workout',
    workout,
    'Go hard of go home!',
    'low',
    '21.06.2022',
    false,
    false
  );

  workout.addTask(upperBodyWorkout);

  const finishEducation = new Task(
    'Finish The Odin Project curriculum',
    education,
    "When it's hard remember why you are doing it...",
    'medium',
    '28.08.2022',
    false,
    false
  );

  education.addTask(finishEducation);

  projects.push(personal, workout, education);

  return projects;
};
