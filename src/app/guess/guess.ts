import { Contestant } from './../contestant/contestant';
export interface Guess {
  id?: string;
  contestant: Contestant;
  showAnswer: boolean;
}
