export interface ICombinations {
  equal?: ICombination;
  floor?: ICombination;
  ceil?: ICombination;
}

export interface ICombination {
  value: number;
  cards: number[];
}
