import { PRICE } from '@/constants/base';
import {
  PLAY,
  STOP,
  LOTTERY,
  MY_NUMBER,
  ADD_MY_NUMBER,
  REMOVE_MY_NUMBER,
  ADD_MONEY,
  WIN,
  WIN_HISTORY,
} from './mutations-type';
import EventBus from '@/common/eventBus';

export default {
  [PLAY]: (state) => {
    state.isPlaying = true;
    EventBus.$emit('lottery');
  },
  [STOP]: (state) => {
    state.isPlaying = false;
  },
  [LOTTERY]: (state, payload) => {
    state.lotteryCount++;
    state.lotteryNumber = payload.number;
    state.lotteryBonus = payload.bonus;
    state.wallet.used += PRICE;
    state.wallet.have -= PRICE;
    EventBus.$emit('checkMatching');
  },
  [MY_NUMBER]: (state, payload) => {
    state.myNumber = payload.numbers;
  },
  [REMOVE_MY_NUMBER]: (state, payload) => {
    const idx = state.myNumber.indexOf(payload.num);
    if (idx > -1) {
      state.myNumber.splice(idx, 1);
    }
  },
  [ADD_MY_NUMBER]: (state, payload) => {
    state.myNumber.push(payload.num);
    state.myNumber.sort((a, b) => a - b);
  },
  [WIN]: (state, payload) => {
    state.result[payload.ranking]++;
    state.ranking = payload.ranking;
  },
  [WIN_HISTORY]: (state, payload) => {
    state.winHistory.unshift(payload);
    state.winHistory = state.winHistory.slice(0, 100);
  },
  [ADD_MONEY]: (state, payload) => {
    state.wallet.have += payload.money;
  },
};

/* state.js
isPlaying: false,
  color: [
  { min: 1, max: 10, value: 'orange' },
  { min: 11, max: 20, value: 'blue' },
  { min: 21, max: 30, value: 'red' },
  { min: 31, max: 40, value: 'gray' },
  { min: 41, max: 45, value: 'green' },
],
  myNumber: [],
  lotteryCount: 0,
  lotteryNumber: [1, 9, 17, 25, 33, 41],
  lotteryBonus: 45,
  winHistory: [],
  result: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
wallet: { used: 0, have: DEFAULT_MONEY },
*/


/* getters.js
isReady: state => state.isPlaying && state.myNumber.length === 6,
  isPlaying: state => state.isPlaying,
  color: state => state.color,
  isMoney: state => state.wallet.have >= PRICE,
  myNumber: state => state.myNumber,
  lotteryCount: state => state.lotteryCount,
  lotteryNumber: state => state.lotteryNumber,
  lotteryBonus: state => state.lotteryBonus,
  winHistory: state => state.winHistory,
  result: state => state.result,
  wallet: state => state.wallet,
*/
