import { benchmark } from 'utils/benchmark';
import { readLineByLine } from 'utils/reader';
import { getInputPath } from 'utils/argv';

const enum Scores {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

const enum Outcomes {
  Win = 6,
  Draw = 3,
  Lose = 0,
}

const results: Record<string, number> = {
  'A X': Outcomes.Lose + Scores.Scissors,
  'A Y': Outcomes.Draw + Scores.Rock,
  'A Z': Outcomes.Win + Scores.Paper,
  'B X': Outcomes.Lose + Scores.Rock,
  'B Y': Outcomes.Draw + Scores.Paper,
  'B Z': Outcomes.Win + Scores.Scissors,
  'C X': Outcomes.Lose + Scores.Paper,
  'C Y': Outcomes.Draw + Scores.Scissors,
  'C Z': Outcomes.Win + Scores.Rock,
};

benchmark('day 02, star 2', async function run() {
  let score: number = 0;

  const onLine = (line: string): void => {
    score += results[line];
  };

  await readLineByLine(getInputPath(__dirname), { onLine });

  return score;
});
