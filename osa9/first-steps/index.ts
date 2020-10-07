import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!isNaN(height) && !isNaN(weight)) {
    const bmi = calculateBmi(height, weight);
    res.send({ weight, height, bmi });
  }
  else {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

interface ExerciseParams {
  daily_exercises: number[];
  target: number;
}

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseParams;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  }
  else if (!Array.isArray(daily_exercises) ||
    !daily_exercises.every(n => !isNaN(Number(n))) ||
    isNaN(Number(target))) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, target);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});