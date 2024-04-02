<template>
  <div class="hello">
    <div class="block" v-for="i in sortNumbers">{{ i }}</div>
    <br />
    <h1>{{ msg }}</h1>
    <div>
      <span>{{ currencyName }}賣出</span>
      <input type="text" v-model.trim="soldCurrency" v-bind:class="{ error: soldCurrency.length > 6 }" />
      <br />
      <p>假設 1 {{ currencyName }} = {{ soldCurrency }} 台幣</p>
    </div>

    <div>
      台幣 <input type="text" v-model="twd" /> = {{ countCurrency
      }}{{ currencyName }}
    </div>
    <div>
      {{ currencyName }} <input type="text" v-model="currency" /> =
      {{ countTwd }} 台幣
    </div>

    <div>
      <h3>Change into :</h3>
      <div v-for="currency in currencys">
        <input type="radio" id="currency.id" :value="currency.id" v-model="picked" v-on:change="changeCurrency" />
        <label for="currency.id">{{ currency.name }}</label>
      </div>
    </div>

    <div>
      <h3>
        Select where you want to go? <span>{{ selectedCountry }}</span>
      </h3>
      <div v-for="c in countrys">
        <input type="checkbox" id="c.id" :value="c.name" v-model="selectedCountry" v-on:change="checkCountry" />
        <label for="c.id">{{ c.name }}</label>
      </div>
    </div>

    <div>
      <h3>請選擇換匯用途:</h3>
      <select v-model="selected_option">
        <option v-for="option in options" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>
    <br />
    <div>
      <textarea v-model="comment" placeholder="請勿超過30字" :style="textareaStyle"
        @keypress.enter.exact="areaPopup()"></textarea>
    </div>
    <br />
    <div>
      <input type="checkbox" id="checkbox" v-model="isChecked" />
      <label for="checkbox">是否同意上述內容</label>
    </div>


    <hr />
    <div>
      <button type="button" name="button" v-on:click="controlPost">
        control post
      </button>
      <button type="button" name="button" v-on:click="getmsg">get</button>
      <button type="button" name="button" v-on:click="postmsg" :disabled="isBtnDisable">
        post
      </button>
      <button @click="alert('Good Morning~')">Click Me</button>
    </div>
    <br />

    <div class="block" v-for="i in eventNumbers">{{ i }}</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Vue.js Bank",
      soldCurrency: 0.215,
      twd: 100,
      currency: 1,
      currencyName: "日幣",
      isBtnDisable: true,
      currencys: [
        { id: 0, value: "0.215", name: "日幣" },
        { id: 1, value: "0.89", name: "泰銖" },
        { id: 2, value: "32", name: "美元" },
      ],
      picked: 0,
      countrys: [
        { id: 0, name: "日本" },
        { id: 1, name: "泰國" },
        { id: 2, name: "美國" },
      ],
      selectedCountry: [],
      options: [
        { text: "海外投資", value: "1" },
        { text: "國內外幣儲蓄", value: "2" },
        { text: "國外觀光", value: "3" },
        { text: "留學支出", value: "4" },
      ],
      selected_option: "1",
      isChecked: false,
      comment: "",
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
     
    };
  },
  methods: {
    areaPopup() {
      window.alert(this.comment);
    },
    checkCountry() {
      console.log(this.selectedCountry);
    },
    changeCurrency() {
      if (this.picked >= 0) {
        this.currency = this.currencys[this.picked].value;
        this.soldCurrency = this.currencys[this.picked].value;
        this.currencyName = this.currencys[this.picked].name;
      }
    },
    getmsg() {
      this.$axios.get("/api/personal?name=MUKI").then(function (res) {
        console.log("res=", res);
      });
    },
    postmsg() {
      this.$axios.post("/api/favorite", { name: "money" }).then((res) => {
        console.log("post res = ", res);
      });
    },
    controlPost() {
      this.isBtnDisable = !this.isBtnDisable;
    },
    alert(txt) {
      window.alert(txt);
    },
  },
  computed: {
    countCurrency: {
      get() {
        return Number.parseFloat(Number(this.twd) / this.soldCurrency).toFixed(
          3
        );
      },
      set(val) {
        this.countTwd = Number.parseFloat(
          Number(this.twd) * this.soldCurrency
        ).toFixed(3);
      },
    },
    countTwd: {
      get() {
        return Number.parseFloat(
          Number(this.currency) * this.soldCurrency
        ).toFixed(3);
      },
      set(val) {
        this.countCurrency = Number.parseFloat(
          Number(this.currency) / this.soldCurrency
        ).toFixed(3);
      },
    },
    textareaStyle() {
      return {
        bolder: this.isValid ? "blue" : "red solid 1px",
        color: this.isValid ? "blue" : "red",
        width: "300px",
      };
    },
    isValid() {
      return this.comment.length <= 30;
    },
    eventNumbers() {
      return this.numbers.filter((n) => n % 2 === 0);
    },
    sortNumbers() {
      return [...this.numbers].sort((a, b) => b - a);
    },
  },
};
</script>

<style>
.error {
  color: red;
  border: red solid 1px;
}

.block {
  display: block;
  float: left;
  border: 1px solid #000;
  width: 2rem;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  font-size: 1.25rem;
}


</style>
