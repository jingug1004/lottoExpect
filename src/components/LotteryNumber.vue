<template>
  <section v-bind:class="$style.wrap">
    <slot name="title"></slot>
    <ul v-bind:class="[$style.list, opacity ? $style.opacity : '']">
      <li v-bind:class="$style.item" v-for="(num, idx) in lotteryNumber" :key="idx">
        <span v-bind:class="$style.num"
              v-bind:style="{ backgroundColor:getColor(num) }">{{ num }}</span>
      </li>
      <li v-bind:class="$style.item">
        <i class="material-icons" v-bind:class="$style.ico">add</i>
      </li>
      <li v-bind:class="$style.item">
        <span v-bind:class="$style.num"
              v-bind:style="{ backgroundColor:getColor(lotteryBonus) }">{{ lotteryBonus }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'lottery-number',
  props: {
    /**
     * 숫자 하나를 대입하여 검증
     */
    getColor: {
      type: Function,
      required: true,
      validator(func) {
        return typeof func(1) === 'string';
      },
    },
  },
  data() {
    return {
      opacity: 'opacity',
    };
  },
  created() {
    /**
     * Result.vue에 있음
     */
    this.EventBus.$on('win', () => {
      this.opacity = 'opacity';
    });

    /**
     * Result.vue에 있음
     */
    this.EventBus.$on('lottery', () => {
      this.opacity = '';
    });
  },
  computed: {
    ...mapGetters([
      'color',
      'lotteryCount',
      'lotteryNumber',
      'lotteryBonus',
    ]),
  },
  methods: {
    /**
     * 로또 추첨한 개수를 가져옴
     * @returns {number}
     */
    getLotteryCount() {
      return this.lotteryCount;
    },
  },
};
</script>

<style module>
.wrap {
  height: 50px;
}

.list {
  list-style: none;
  padding: 0;
  overflow: hidden;
  background-color: initial;
  transition: opacity 0.5s ease;
}

.item {
  float: left;
}

.num {
  display: inline-block;
  width: 42px;
  height: 42px;
  line-height: 39px;
  margin: 1px;
  font-size: 20px;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  transition: background-color 0.3s ease;
}

.ico {
  height: 45px;
  margin-top: 11px;
  color: #666;
}

.opacity {
  opacity: 0.3;
}
</style>
