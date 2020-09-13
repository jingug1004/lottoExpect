import { DEFAULT_MONEY } from '@/constants/base';

export default {
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
  wallet: {
    used: 0, have: DEFAULT_MONEY,
  },
};

/*
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

