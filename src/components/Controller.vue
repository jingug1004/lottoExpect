<template>
  <aside>
    <slot name="title"></slot>
    <button type="button" v-bind:class="$style.btn_toggle" v-if="isPlaying" v-on:click="onStop">
      <i class="material-icons" v-bind:class="$style.ico">stop</i>
    </button>
    <button type="button" v-bind:class="$style.btn_toggle" v-else v-on:click="onPlay">
      <i class="material-icons" v-bind:class="$style.ico">play_arrow</i>
    </button>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import { PLAY, STOP } from '@/store/mutations-type';
import { CHARGE, CHOOSE } from '@/constants/router';

export default {
  name: 'controller',
  computed: {
    ...mapGetters([
      'isPlaying',
      'isMoney',
      'myNumber',
    ]),
  },
  methods: {
    /**
     * 추첨 시작
     */
    onPlay() {
      if (this.myNumber.length === 6) { // myNumber: []
        if (this.isMoney) { // isMoney: state => state.wallet.have >= PRICE,
          this.$store.commit(PLAY);
        } else {
          this.$router.push(CHARGE);
        }
      } else {
        this.$router.push(CHOOSE);
      }
    },

    /**
     * 추첨 종료
     */
    onStop() {
      this.$store.commit(STOP);
    },
  },
};
</script>

<style module>
.btn_toggle {
  position: absolute;
  top: 15px;
  right: 0;
  width: 90px;
  height: 30px;
  padding: 0;
  color: #fff;
  background-color: #333;
  border: solid 1px #000;
  cursor: pointer;
  outline: none;
}

.ico {
  margin-left: 1px;
  font-size: 28px;
  vertical-align: top;
}
</style>
