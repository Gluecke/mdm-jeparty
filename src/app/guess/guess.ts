import { Contestant } from './../contestant/contestant';
import { Timestamp } from 'firebase/firestore';
export interface Guess {
  contestant: Contestant;
  showAnswer: boolean;
  dateSubmitted: Timestamp;
}
