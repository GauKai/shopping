<script>
export default {
    props: {
        pillIndex: {
            type: Number,
        },
        num: {
            type: Number,
        },
    },
    emits: ['submit'],
    data() {
        return {
            quantityTemp: 1,
        }
    },
    computed: {
        quantity() {
            if (this.num > 0) {
                this.quantityTemp = this.num;
            }
            // 父層傳入 num = 0 不保留原本的值
            return this.quantityTemp;
        }
    },
    methods: {
        changeQuantity(index, num, type) {
            switch (type) {
                case 0: num > 1 ? this.quantityTemp -= 1 : ''; break;
                case 1: num < 25 ? this.quantityTemp += 1 : ''; break;
                default: return;
            }
            this.$emit('submit', [index, this.quantityTemp]);
        },
    },
}
</script>

<template>
    <div class="flex items-center">
        <button class="card-quantity-btn rounded-l-2xl" @click="changeQuantity(pillIndex, quantity, 0)">-</button>
        <input class="card-quantity-num" readonly type="number" min="1" max="25" v-model="quantity">
        <button class="card-quantity-btn rounded-r-2xl" @click="changeQuantity(pillIndex, quantity, 1)">+</button>
    </div>
</template>

<style scoped>
.card-quantity-btn {
    @apply w-[30px] h-[30px] bg-blue-200 text-black text-xl hover:bg-blue-500 active:bg-blue-700 float-end;
}

.card-quantity-num {
    @apply w-[50px] h-[30px] text-center border-[1px] float-end;
}

/* Chrome, Safari, Edge, Opera Hide Arrows From Input Number*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox Hide Arrows From Input Number*/
input[type=number] {
    -moz-appearance: textfield;
}
</style>