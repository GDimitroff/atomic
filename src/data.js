import Project from './models/Project';
import Task from './models/Task';
import { v4 as uuidv4 } from 'uuid';

export const defaultData = () => {
  let projects = [];

  const personal = new Project(uuidv4(), 'Personal', 'pink');
  const workout = new Project(uuidv4(), 'Workout', 'green');
  const education = new Project(uuidv4(), 'Education', 'gold');

  const gift = new Task(
    uuidv4(),
    personal.id,
    'Buy gift for my bae',
    'If you dare to miss this you are gonna be homeless... and single!',
    'high',
    '11.03.2023',
    false,
    true
  );

  const flowers = new Task(
    uuidv4(),
    personal.id,
    'Buy flowers for my sweetheart',
    "Every woman loves flowers even if the say they don't",
    'medium',
    '23.06.2022',
    false,
    true
  );

  const upperBodyWorkout = new Task(
    uuidv4(),
    workout.id,
    'Upper body workout',
    'Go hard of go home!',
    'low',
    '21.06.2022',
    false,
    false
  );

  const finishEducation = new Task(
    uuidv4(),
    education.id,
    'Finish The Odin Project curriculum',
    "When it's hard remember why you are doing it...",
    'medium',
    '28.08.2022',
    false,
    false
  );

  personal.addTask(gift);
  personal.addTask(flowers);
  workout.addTask(upperBodyWorkout);
  education.addTask(finishEducation);

  projects.push(personal, workout, education);
  return projects;
};
