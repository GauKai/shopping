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
    };
  },
  mounted() {
    this.arrCart = JSON.parse(localStorage.getItem("cart-08")) ?? [];
  },
  methods: {
    change(e) {
      this.productData[e[0]].quantity = e[1];
    },
    addCart(id, num) {
      if (this.arrCart.length === 0) {
        this.arrCart.push({
          id: id,
          quantity: num,
        });
      } else {
        const index = this.arrCart.findIndex(item => item.id === id);
        if (index != -1) {
          this.arrCart[index].quantity + num > 25 ? this.arrCart[index].quantity = 25 : this.arrCart[index].quantity += num;
        } else {
          this.arrCart.push({
            id: id,
            quantity: num,
          });
        }
        this.arrCart.sort(function (a, b) {
          return a.id - b.id;
        })
      }
      localStorage.setItem("cart-08", JSON.stringify(this.arrCart));
    },
  }
}
</script>

<template>
  <main>
    <div class="w-full h-[calc(100vh-40px)] flex flex-col justify-center items-center text-black pt-[40px]">
      <div>Shopping</div>
      <div class="content">
        <div v-for="(item, index) in productData" :key="item.id" class="card">
          <img :src="item.pic" class="card-img">
          <div class="card-content">
            <div class="card-name">{{ item.name }}</div>
            <div class="card-description">{{ item.description }}</div>
            <div class="card-price">{{ '價格: ' + item.price }}</div>
          </div>
          <div class="card-quantity">
            數量:
            <pill :pillIndex="index" :num="item.quantity" @submit="change"></pill>
          </div>
          <button type="button" class="card-addCart" @click="addCart(item.id, item.quantity)">加入購物車</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.content {
  @apply w-full h-[calc(100vh-40px)] pt-10 flex flex-wrap justify-center gap-5;
}

.card {
  @apply w-1/2 sm:w-1/3 lg:w-1/6 rounded-lg border-[1px] flex flex-col;
}

.card-img {
  @apply w-full rounded-t-lg;
}

.card-content {
  @apply h-[200px] p-2 flex flex-col gap-y-3;
}

.card-quantity {
  @apply p-2 w-full flex items-center justify-between;
}

.card-addCart {
  @apply w-full h-[30px] bg-blue-500 text-white rounded-b-lg hover:bg-red-500 active:bg-red-700;
}
</style>