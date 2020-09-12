<template>
  <section v-bind:class="$style.dialog">
    <h2 class="blind">번호 선택</h2>
    <div v-bind:class="$style.content">
      <ul v-bind:class="$style.choose_list">
        <li v-bind:class="$style.choose_item" v-for="(num, idx) in numbers" v-bind:key="idx">
          <span v-on:click="onChooseNumber(num)"
                v-bind:class="$style.choose_num"
                v-bind:style="isChosen(num)
              ? 'background-color: #333; border-color: #000; color: #fff'
              : 'background-color: #fff; border-color: #f00;'"
          >{{ num }}</span>
        </li>
        <li v-bind:class="$style.choose_item" v-for="idx in hideNumbers" v-bind:key="idx">
          <span v-bind:class="[$style.choose_num, $style.hide]"></span>
        </li>
      </ul>
      <div v-bind:class="$style.footer">
        <button v-if="myNumber.length > 0" type="button" v-on:click="onResetChoose"
                v-bind:class="[$style.btn_footer, $style.btn_reset, getFooterHalfStyle()]">
          다시<br/>선택
        </button>
        <button type="button" v-on:click="onAutoChoose"
                v-bind:class="[$style.btn_footer, $style.btn_auto, getFooterHalfStyle()]">
          자동<br/>선택
        </button>
        <button v-if="myNumber.length === 6" type="button" v-on:click="onHideChoose"
                v-bind:class="[$style.btn_footer, $style.btn_ok]">
          선택<br/>완료
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { MY_NUMBER, REMOVE_MY_NUMBER, ADD_MY_NUMBER } from '@/store/mutations-type';
import { lotto } from '@/common/utils';

export default {
  name: 'choose',
  data() {
    return {
      /**
       * [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
       * 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
       * 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
       * 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
       * 41, 42, 43, 44, 45]
       */
      numbers: Array.from(Array(45).keys(), v => v + 1),

      /**
       * (4) [empty × 4]
       */
      hideNumbers: Array(4),
    };
  },
  computed: {
    ...mapGetters([
      'color',
      'myNumber',
      'lotteryNumber',
      'lotteryBonus',
    ]),
  },
  methods: {
    /**
     * isChosen -> choose?
     * @param num 하나하나 선택한 번호
     * @returns {boolean} 하나하나 선택한 번호가 있는지? 없는지?
     */
    isChosen(num) {
      /*
      if (this.myNumber.includes(num)) {
        return true;
      }
      return false;
      */
      return this.myNumber.includes(num);
    },

    /**
     * 부모창으로 이동
     */
    onHideChoose() {
      this.$router.go(-1);
    },

    /**
     * 선택한 번호
     */
    onChooseNumber(choose) {
      const num = Number(choose);
      if (this.myNumber.includes(num)) {
        this.$store.commit(REMOVE_MY_NUMBER, { num });
      } else if (this.myNumber.length < 6) {
        this.$store.commit(ADD_MY_NUMBER, { num });
      }
    },

    /**
     * 다시 선택
     */
    onResetChoose() {
      this.$store.commit(MY_NUMBER, { numbers: [] });
    },

    /**
     * 자동선택
     */
    onAutoChoose() {
      this.$store.commit(MY_NUMBER, { numbers: lotto().numbers });
    },

    /**
     * 수동선택, 자동선택, 선택 완료
     * 아무것도 선택 안 했을 시 -> 자동 선택
     * 최소한 1개 이상 클릭시 -> 다시 선택, 자동 선택
     * 6개 클릭시 -> 다시 선택, 자동 선택, 선택 완료
     * @returns {string} 하단 style css를 반환하는 값
     */
    getFooterHalfStyle() {
      if (this.myNumber.length === 6) {
        return '';
      }
      return this.$style.btn_footer_half;
    },
  },
};
</script>

<style module>
.dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.content {
  width: 260px;
  margin-top: 35px;
  background-color: #fff;
}

.choose_list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 10px 10px 0 10px;
}

.choose_item {
  margin: 1px;
}

.choose_num {
  display: inline-block;
  box-sizing: border-box;
  width: 30px;
  height: 40px;
  line-height: 38px;
  margin: 1px;
  font-size: 18px;
  text-align: center;
  border: solid 1px #fff;
  color: #f00;
  cursor: pointer;
}

.choose_num.hide {
  cursor: default;
  opacity: 0;
}

.opacity {
  opacity: 0.3;
}

.footer {
  display: block;
  margin-top: 10px;
  text-align: center;
  border-top: solid 1px #aaa;
}

.btn_footer {
  width: 83px;
  height: 50px;
  line-height: 20px;
  background-color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.btn_footer_half {
  width: 125px;
}

.btn_reset {
  color: #f20;
  border-right: solid 1px #aaa;
}

.btn_auto {
  color: #05f;
}

.btn_ok {
  color: #333;
  border-left: solid 1px #aaa;
}
</style>
