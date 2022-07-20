import Project from './models/Project';
import Task from './models/Task';
import { v4 as uuidv4 } from 'uuid';
import { format, startOfToday } from 'date-fns';

export const defaultData = () => {
  let projects = [];

  const personal = new Project(uuidv4(), 'Personal', 'pink');
  const workout = new Project(uuidv4(), 'Workout', 'green');
  const education = new Project(uuidv4(), 'Education', 'gold');
  const books = new Project(uuidv4(), 'Books', 'red');

  const gift = new Task(
    uuidv4(),
    personal.id,
    'Buy gift for my bae',
    'If you dare to miss this you are gonna be homeless... and single!',
    'high',
    '11.03.2022',
    false,
    true
  );

  const flowers = new Task(
    uuidv4(),
    personal.id,
    'Flowers for The One',
    "Every woman loves flowers even if they say they don't",
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
    '12.07.2022',
    true,
    false
  );

  const today = format(startOfToday(), 'dd.MM.yyyy');
  const overallFitness = new Task(
    uuidv4(),
    workout.id,
    'Gym',
    'Make it happen and go to the gym you lazy moron!',
    'high',
    today,
    false,
    true
  );

  const finishEducation = new Task(
    uuidv4(),
    education.id,
    'Finish The Odin Project curriculum',
    "When it's hard remember why you are doing it...",
    'medium',
    '15.09.2022',
    false,
    false
  );

  const firstBook = new Task(
    uuidv4(),
    books.id,
    '"Хроники на болката" от Иво Иванов',
    'When you have the time.',
    'low',
    '15.09.2023',
    false,
    false
  );

  const secondBook = new Task(
    uuidv4(),
    books.id,
    '12 Rules for Life: An Antidote to Chaos',
    'Little by little.',
    'low',
    today,
    false,
    true
  );

  personal.addTask(gift);
  personal.addTask(flowers);
  workout.addTask(overallFitness);
  workout.addTask(upperBodyWorkout);
  education.addTask(finishEducation);
  books.addTask(firstBook);
  books.addTask(secondBook);

  projects.push(books, workout, personal, education);
  return projects;
};
