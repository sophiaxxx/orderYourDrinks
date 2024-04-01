<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <span>{{ currencyName }}賣出</span> <input type="text" v-model="soldCurrency"> <br>
      <p> 假設 1 {{ currencyName }} = {{ soldCurrency }} 台幣 </p>
    </div>

    <div>台幣 <input type="text" v-model="twd"> = {{ countCurrency }}{{ currencyName }} </div>
    <div>{{ currencyName }} <input type="text" v-model="currency"> = {{ countTwd }} 台幣 </div>

    <div>
      <h3> Choose your currency </h3>
      <div v-for="currency in currencys">
        <input type="radio" id="currency.id" :value="currency.id" v-model="picked" v-on:change="changeCurrency" />
        <label for="currency.id">{{ currency.name }}</label>
      </div>
    </div>

    <div>
      <h3>Select where you want to go?</h3>
      <div v-for="c in countrys">
        <input type="checkbox" id="c.id" :value="c.name" v-model="selectedCountry" v-on:change="checkCountry" />
        <label for="c.id">{{ c.name }}</label>
      </div>
    </div>

    <br>
    <div>
      <button type="button" name="button" v-on:click="controlPost">control post</button>
      <button type="button" name="button" v-on:click="getmsg">get</button>
      <button type="button" name="button" v-on:click="postmsg" :disabled="isBtnDisable">post</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      soldCurrency: 0.215,
      twd: 100,
      currency: 1,
      currencyName: '日幣',
      isBtnDisable: true,
      currencys: [
        { id: 0, value: '0.215', name: '日幣' },
        { id: 1, value: '0.89', name: '泰銖' },
        { id: 2, value: '32', name: '美元' },
      ],
      picked: 0,
      countrys:[
        { id: 0, name: '日本' },
        { id: 1, name: '泰國' },
        { id: 2, name: '美國' },
      ],
      selectedCountry:[]
    }
  },
  methods: {
    checkCountry() {
      console.log(this.selectedCountry)
    },
    changeCurrency() {
      if (this.picked >= 0) {
        this.currency = this.currencys[this.picked].value;
        this.soldCurrency = this.currencys[this.picked].value;
        this.currencyName = this.currencys[this.picked].name;
      }
    },
    getmsg() {
      this.$axios.get('/api/personal?name=MUKI').then(function (res) {
        console.log('res=', res)
      })

    },
    postmsg() {
      this.$axios.post('/api/favorite', { name: 'money' }).then(res => {
        console.log('post res = ', res)
      })
    },
    controlPost() {
      this.isBtnDisable = !this.isBtnDisable;
    }
  },
  computed: {
    countCurrency: {
      get() {
        return Number.parseFloat(Number(this.twd) / this.soldCurrency).toFixed(3);
      },
      set(val) {
        this.countTwd = Number.parseFloat(Number(this.twd) * this.soldCurrency).toFixed(3);
      }
    },
    countTwd: {
      get() {
        return Number.parseFloat(Number(this.currency) * this.soldCurrency).toFixed(3);
      },
      set(val) {
        this.countCurrency = Number.parseFloat(Number(this.currency) / this.soldCurrency).toFixed(3);
      }
    },

  }
}
</script>
