interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface ExerciseInput {
  target: number
  hours: number[]
}

const parseExerciseArgs = (args: string[]): ExerciseInput => {
  if (args.length < 4) throw new Error('Arguments missing.');

  if (args.slice(2).every(a => !isNaN(Number(a)))) {
    return {
      target: Number(args[2]),
      hours: args.slice(3).map(s => Number(s)),
    };
  } else {
    throw new Error('All arguments must be numbers.');
  }
};

export const calculateExercises = (hours: number[], target: number): Result => {
  const average = hours.reduce((a, b) => a + b, 0) / hours.length;
  let rating = 2;
  let ratingDescription = 'OK';

  if (average / target < 0.75) {
    rating = 1;
    ratingDescription = 'Bad';
  } else if (average / target > 1.25) {
    rating = 3;
    ratingDescription = 'Good';
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter(h => h > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, hours } = parseExerciseArgs(process.argv);
  console.log(calculateExercises(hours, target));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error:', e.message);
}
