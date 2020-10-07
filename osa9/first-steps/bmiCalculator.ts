interface BmiInput {
  height: number;
  weight: number;
}

const parseBmiArgs = (args: string[]): BmiInput => {
  if (args.length < 4 || args.length > 4)
    throw new Error('Exactly two numbers required as arguments.');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Both values must be numbers.');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height * height) / 10000);

  switch (true) {
    case bmi < 15:
      return 'Very severely underweight';
    case bmi < 16:
      return 'Severely underweight';
    case bmi < 18.5:
      return 'Underweight';
    case bmi < 25:
      return 'Normal (healthy weight)';
    case bmi < 30:
      return 'Overweight';
    case bmi < 35:
      return 'Obese Class I (Moderately obese)';
    case bmi < 40:
      return 'Obese Class II (Severely obese)';
    default:
      return 'Obese Class III (Very severely obese)';
  }
};

if (!(process.argv.length === 3 && process.argv[2] === 'web')) {
  try {
    const { height, weight } = parseBmiArgs(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error:', e.message);
  }
}
