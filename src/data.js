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
    personal.name,
    personal.color,
    'Buy gift for my bae',
    'If you dare to miss this you are gonna be homeless... and single!',
    'high',
    '11.03.2023',
    false,
    true
  );

  const flowers = new Task(
    uuidv4(),
    personal.name,
    personal.color,
    'Buy flowers for my sweetheart',
    "Every woman loves flowers even if the say they don't",
    'medium',
    '23.06.2022',
    false,
    true
  );

  personal.addTask(gift);
  personal.addTask(flowers);

  const upperBodyWorkout = new Task(
    uuidv4(),
    workout.name,
    workout.color,
    'Upper body workout',
    'Go hard of go home!',
    'low',
    '21.06.2022',
    false,
    false
  );

  workout.addTask(upperBodyWorkout);

  const finishEducation = new Task(
    uuidv4(),
    education.name,
    education.color,
    'Finish The Odin Project curriculum',
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
