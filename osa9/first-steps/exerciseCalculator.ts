interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: number[], target: number): Result => {
  const average = hours.reduce((a, b) => a + b, 0) / hours.length;
  let rating;
  let ratingDescription = '';

  if (average / target < 0.75) {
    rating = 1;
    ratingDescription = 'Bad';
  }
  else if (average / target > 1.25) {
    rating = 3;
    ratingDescription = 'Good';
  }
  else {
    rating = 2;
    ratingDescription = 'OK';
  }

  const result = {
    periodLength: hours.length,
    trainingDays: hours.filter(h => h > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  }

  return result;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));