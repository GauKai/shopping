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
    submitData() {
      return this.$router.push({ name: "Shopping" });
    }
  }
}
</script>

<template>
  <main>
    <div class="px-5 py-2 flex flex-col">
      <span class="text-3xl font-bold text-black">完成購買</span>
      <div class="w-11/12 flex flex-col gap-3 border-y-[1px] mx-auto my-[20px]">
        <div class="card" v-for="(item, index) in arrCart" :key="item.id">
          <img :src="item.pic" class="card-img">
          <div class="name">{{ item.name }}</div>
          <div class="price">{{ '$' + item.price }}</div>
          <div class="price">{{ item.quantity }}</div>
        </div>
      </div>
      <div class="w-11/12 flex justify-around gap-3 border-y-[1px] mx-auto my-[20px]">
        <div>姓名</div>
        <div>電話</div>
        <div>地址</div>
        <div>付款方式</div>
        <div>email</div>
        <div>運送方式</div>
      </div>
      <div class="flex justify-between items-center">
        <button class="act-btn bg-green-700 hover:bg-green-900" type="button" @click="submitData()">回首頁</button>
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
  @apply rounded-md text-white px-2 py-1 w-full;
}
</style>