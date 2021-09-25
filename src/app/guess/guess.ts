import { Contestant } from './../contestant/contestant';
import { Timestamp } from 'firebase/firestore';
export interface Guess {
  id?: string;
  contestant: Contestant;
  showAnswer: boolean;
  dateSubmitted: Timestamp;
}
