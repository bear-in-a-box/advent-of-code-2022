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
  'A X': Outcomes.Draw + Scores.Rock,
  'A Y': Outcomes.Win + Scores.Paper,
  'A Z': Outcomes.Lose + Scores.Scissors,
  'B X': Outcomes.Lose + Scores.Rock,
  'B Y': Outcomes.Draw + Scores.Paper,
  'B Z': Outcomes.Win + Scores.Scissors,
  'C X': Outcomes.Win + Scores.Rock,
  'C Y': Outcomes.Lose + Scores.Paper,
  'C Z': Outcomes.Draw + Scores.Scissors,
};

benchmark('day 02, star 1', async function run() {
  let score: number = 0;

  const onLine = (line: string): void => {
    score += results[line];
  };

  await readLineByLine(getInputPath(__dirname), { onLine });

  return score;
});
