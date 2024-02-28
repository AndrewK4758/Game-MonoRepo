import { IDie, ISummedRoll } from './interfaces';

const generateRandomNumber = (upperBound: number): number => {
  return Math.floor(Math.random() * upperBound) + 1;
};

const rollDice = (dice: IDie[]): number[] => {
  return dice.map((shake) => shake.roll());
};

const rollSingleDiceMultipleTimes = (
  count: number,
  die: IDie,
  rolls: Array<number> = []
): number[] | void => {
  if (count === 0) return;
  rolls.push(die.roll());
  rollSingleDiceMultipleTimes(count - 1, die, rolls);
  return rolls;
};

const rollMultipleDiceMultipleTimes = (
  totalRolls: number,
  dice: IDie[],
  rolls: number[][]
): number[][] | void => {
  if (totalRolls === 0) return;
  rolls.push(rollDice(dice));
  rollMultipleDiceMultipleTimes(totalRolls - 1, dice, rolls);
  return rolls;
};

//WHY RETURN AS ISummedRoll rather than create an instance of new SummedRoll for the sum of Die
const rollSingleDiceMultipleTimesAndSum = (
  count: number,
  dice: IDie,
  rolls: number[] = []
): ISummedRoll | void => {
  if (count === 0) return;
  rolls.push(dice.roll());
  rollSingleDiceMultipleTimesAndSum(count - 1, dice, rolls);
  return {
    rollValues: rolls,
    sum: rolls.reduce((a, b) => a + b, 0),
  } as ISummedRoll;
};

const rollMultipleDiceAndSum = (dice: [IDie]): ISummedRoll | void => {
  const rolls = dice.map((shake) => shake.roll());
  return {
    rollValues: rolls,
    sum: rolls.reduce((a, b) => a + b, 0),
  } as ISummedRoll;
};

const rangeSelector = (min: number, max: number): number => {
  const num: number = Math.floor(Math.random() * (max - min) + min);
  return num !== 1 ? num : num + 1;
};

export { generateRandomNumber, rollDice, rangeSelector };
