<script>
import jsonData from '@/assets/jsonData/product.json';
import pill from '@/components/Pill.vue';

export default {
  components: {
    pill,
  },
  data() {
    return {
      productData: jsonData,
      arrCart: [],
      temp: [],
      totalRroductCount: 0,
      totalPriceCount: 0,
    };
  },
  mounted() {
    this.arrCart = JSON.parse(localStorage.getItem("cart-08")) ?? [];
    if (this.arrCart != '') {
      this.temp = this.arrCart.map(item => {
        return {
          checked: false,
          id: item.id,
          name: this.productData[item.id - 1].name,
          pic: this.productData[item.id - 1].pic,
          price: this.productData[item.id - 1].price,
          quantity: item.quantity,
          tempPrice: 0,
          tempQuantity: 0,
        };
      });
    }
  },
  methods: {
    changeQuantity(e) {
      this.temp[e[0]].quantity = e[1];
      this.arrCart[e[0]].quantity = e[1];
      localStorage.setItem("cart-08", JSON.stringify(this.arrCart));
    },
    // 待改 應改有更好的辦法
    changeCheckboxStatus(item, index) {
      this.temp[index].checked = !item.checked;
      const price = item.price;
      const quantity = item.quantity;
      if (item.checked) {
        this.totalRroductCount += quantity;
        this.totalPriceCount += price * quantity;
        this.temp[index].tempQuantity = quantity;
        this.temp[index].tempPrice = price * quantity;
      } else {
        this.totalRroductCount -= this.temp[index].tempQuantity;
        this.totalPriceCount -= this.temp[index].tempPrice;
        this.temp[index].tempPrice = 0;
        this.temp[index].tempQuantity = 0;
      }
    },
    bakeToShopping() {
      return this.$router.push('/Shopping');
    },
    submitData() {
      if (!this.temp.some(item => item.checked === true))
        return alert('請選擇商品');
      this.arrCart = this.temp.filter(item => item.checked === true).map(item => {
        return {
          id: item.id,
          name: this.productData[item.id - 1].name,
          pic: this.productData[item.id - 1].pic,
          price: this.productData[item.id - 1].price,
          quantity: item.quantity,
        };
      });
      this.arrCart.push({
        name: 'count',
        count: this.totalRroductCount,
      });
      this.arrCart.push({
        name: 'price',
        price: this.totalPriceCount,
      });
      localStorage.setItem("checkCart-08", JSON.stringify(this.arrCart));
      alert('送出購物車');
      return this.$router.push('/ShoppingCheck');
    }
  }
}
</script>
<template>
  <main>
    <div class="px-5 py-2 flex flex-col">
      <span class="text-3xl font-bold text-black">購物車確認</span>
      <div class="w-11/12 flex flex-col gap-3 border-y-[1px] mx-auto my-[20px]">
        <div class="card" v-for="(item, index) in temp" :key="item.id">
          <input type="checkbox" v-model="item.checked" @input="changeCheckboxStatus(item, index)">
          <img :src="item.pic" class="card-img">
          <div class="name">{{ item.name }}</div>
          <div class="price">{{ '$' + item.price }}</div>
          <pill :pillIndex="index" :num="item.quantity" @submit="changeQuantity"></pill>
        </div>
      </div>
      <div class="w-full flex flex-col items-end text-2xl font-bold text-black mb-[10px]">
        <div>{{ `商品數量: ${totalRroductCount}` }}</div>
        <div>{{ `商品總金額: $${totalPriceCount}` }}</div>
      </div>
      <div class="flex justify-between items-center">
        <button class="act-btn bg-red-700 hover:bg-red-900" type="button" @click="bakeToShopping()">回上頁繼續購買</button>
        <button class="act-btn bg-green-700 hover:bg-green-900" type="button" @click="submitData()">確認購買</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.card {
  @apply w-full h-[120px] border-b-[1px] flex justify-around items-center;
}

.card-img {
  @apply h-4/5;
}

.act-btn {
  @apply rounded-md text-white px-2 py-1;
}
</style>