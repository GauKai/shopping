<script>
export default {
  data() {
    return {
      arrCart: [],
      totalRroductCount: 0,
      totalPriceCount: 0,
    };
  },
  mounted() {
    this.arrCart = JSON.parse(localStorage.getItem("checkCart-08")) ?? [];
    this.totalPriceCount = this.arrCart.pop().price;
    this.totalRroductCount = this.arrCart.pop().count;
  },
  methods: {
    bakeToShoppingCar() {
      return this.$router.push('/ShoppingCar');
    },
    submitData() {
      // return this.$router.push('/ShoppingCheck');
    }
  }
}
</script>

<template>
  <main>
    <div class="px-5 py-2 flex flex-col">
      <span class="text-3xl font-bold text-black">購買確認及填寫資訊</span>
      <div class="w-11/12 flex flex-col gap-3 border-y-[1px] mx-auto my-[20px]">
        <div class="card" v-for="(item, index) in arrCart" :key="item.id">
          <img :src="item.pic" class="card-img">
          <div class="name">{{ item.name }}</div>
          <div class="price">{{ '$' + item.price }}</div>
          <div class="price">{{ item.quantity }}</div>
        </div>
      </div>
      <div>
        <label for="name"><p>姓名</p></label>
        <input type="text" id="name">
        <label for="phone"><p>電話</p></label>
        <input type="text" id="phone">
        <label for="addr"><p>地址</p></label>
        <input type="text" id="addr">
        <label for="email"><p>電子信箱</p></label>
        <input type="email" id="email">
        <p>付款方式</p>
        <input type="radio" id="pay0" name="pay" value="0"><label for="pay0">信用卡</label>
        <input type="radio" id="pay1" name="pay" value="1"><label for="pay1">貨到付款</label>
        <p>運送方式</p>
        <input type="radio" id="send0" name="send" value="0"><label for="send0">宅配</label>
        <input type="radio" id="send1" name="send" value="1"><label for="send1">超商取貨</label>
      </div>
      <div class="w-full flex flex-col items-end text-2xl font-bold text-black mb-[10px]">
        <div>{{ `商品數量: ${totalRroductCount}` }}</div>
        <div>{{ `商品總金額: $${totalPriceCount}` }}</div>
      </div>
      <div class="flex justify-between items-center">
        <button class="act-btn bg-red-700 hover:bg-red-900" type="button" @click="bakeToShoppingCar()">回上頁繼續加購</button>
        <button class="act-btn bg-green-700 hover:bg-green-900" type="button" @click="submitData()">確認送出</button>
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