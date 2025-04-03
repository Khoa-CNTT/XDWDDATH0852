<template>
    <div>
        <div class="gioithieu text-center p-2">
            <H1>Our Menu</H1>
            <p>
                We consider all the drivers of change gives you the components <br />
                you need to change to create a truly happens.
            </p>
        </div>
        <div class="option-product">
            <button @click="selectedCategory = 'All'">All</button>
            <button @click="selectedCategory = 'Đồ uống'">Đồ Uống</button>
            <button @click="selectedCategory = 'Bánh mì'">Bánh mì</button>
            <button @click="selectedCategory = 'Nem chua rán'">Nem chua rán</button>
            <button @click="selectedCategory = 'Gà rán'">Gà rán</button>
            <button @click="selectedCategory = 'Cà phê'">Cà phê</button>
        </div>
        <div class="list_product">
            <template v-for="(value, index) in filteredProducts" :key="index" >
                <div class="producta">
                    <img v-bind:src="value.img" alt="" />
                    <div style="height: 70px" class="ghichu">
                        <p class="fs-5 mt-2">{{ value.name }}</p>
                    </div>
                    <div class="price d-flex justify-content-between">
                        <p class="mt-3 fs-5">{{ value.price }}đ</p>
                        <!-- {{ value.price.toLocaleString("vi-VN") }} -->
                        <button class="text-nowrap">
                            <b>THÊM VÀO GIỎ</b> <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
            </template>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectedCategory: 'All',
            categories: ['All', 'Đồ Uống', 'Bánh mì', 'Nem chua rán', 'Gà rán', 'Cà phê'],
            form: {
                img: "",
                name: '',
                price: '',
            },
            list_product: [
                { "img": "http://localhost:5173/src/img/menu/1.jpg", "name": "Cam tắc mát lạnh", "price": "30.000", "category": "Đồ uống" },
                { "img": "http://localhost:5173/src/img/menu/2.jpg", "name": "Trà chanh mật ong", "price": "15.000", "category": "Đồ uống" },
                { "img": "http://localhost:5173/src/img/menu/3.jpg", "name": "Trà đào cam sả", "price": "30.000", "category": "Đồ uống" },
                { "img": "http://localhost:5173/src/img/menu/4.jpg", "name": "Trà tắc đá xay", "price": "30.000", "category": "Đồ uống" },
                { "img": "http://localhost:5173/src/img/menu/5.jpg", "name": "Cam đào nhiệt đới", "price": "30.000", "category": "Đồ uống" },
                { "img": "http://localhost:5173/src/img/menu/6.jpg", "name": "Trà dâu tằm sả tắc", "price": "30.000", "category": "Đồ uống" },
                { "img": "http://localhost:5173/src/img/menu/7.jpg", "name": "Soda trái cây nhiệt đới", "price": "30.000", "category": "Đồ uống" },
                { "img": "http://localhost:5173/src/img/menu/8.jpg", "name": "Coca-Cola lon", "price": "30.000", "category": "Đồ uống" },
                { "img": "http://localhost:5173/src/img/menu/9.jpg", "name": "7UP chanh tươi", "price": "30.000", "category": "Đồ uống" },
                { "img": "http://localhost:5173/src/img/menu/10.jpg", "name": "Sting dâu năng lượng", "price": "30.000", "category": "Đồ uống" },
                { "img": "http://localhost:5173/src/img/menu/11.jpg", "name": "Bánh mì bò nướng (với thịt bò nướng, rau mùi, đồ chua)", "price": "30.000", "category": "Bánh mì" },
                { "img": "http://localhost:5173/src/img/menu/12.jpg", "name": " Bánh mì trứng và xúc xích (có trứng cắt lát, xúc xích, rau củ)", "price": "30.000", "category": "Bánh mì"  },
                { "img": "http://localhost:5173/src/img/menu/13.jpg", "name": "Bánh mì gà xé cay (gà xé, rau mùi, cà rốt, dưa leo)", "price": "30.000", "category": "Bánh mì"  },
                { "img": "http://localhost:5173/src/img/menu/14.jpg", "name": "Sandwich thịt nguội (sandwich nhiều tầng với thịt nguội, rau, cà chua)", "price": "30.000", "category": "Bánh mì"  },
                { "img": "http://localhost:5173/src/img/menu/15.jpg", "name": "Bánh mì xíu mại trứng muối (xíu mại, trứng muối, ớt)", "price": "30.000", "category": "Bánh mì"  },
                { "img": "http://localhost:5173/src/img/menu/16.jpg", "name": "Bánh mì mì Ý trứng ốp la", "price": "30.000", "category": "Bánh mì"  },
                { "img": "http://localhost:5173/src/img/menu/18.jpg", "name": "Bánh mì kẹp gà viên & rau xanh", "price": "30.000", "category": "Bánh mì"  },
                { "img": "http://localhost:5173/src/img/menu/17.jpg", "name": "Bánh mì gà nướng sốt mayonnaise", "price": "30.000", "category": "Bánh mì"  },
                { "img": "http://localhost:5173/src/img/menu/19.jpg", "name": "Hot dog phô mai sốt cay", "price": "30.000", "category": "Bánh mì"  },
                { "img": "http://localhost:5173/src/img/menu/20.jpg", "name": "Bánh mì xiên nướng BBQ", "price": "30.000", "category": "Bánh mì"  },
                { "img": "http://localhost:5173/src/img/menu/21.jpg", "name": "Gà viên chiên xù", "price": "30.000", "category": "Nem chua rán" },
                { "img": "http://localhost:5173/src/img/menu/22.jpg", "name": "Kimbap chiên giòn", "price": "30.000", "category": "Nem chua rán"  },
                { "img": "http://localhost:5173/src/img/menu/23.jpg", "name": "Tôm lăn bột chiên giòn", "price": "30.000", "category": "Nem chua rán"  },
                { "img": "http://localhost:5173/src/img/menu/24.jpg", "name": "Gà sốt cay phô mai", "price": "30.000", "category": "Gà rán"  },
                { "img": "http://localhost:5173/src/img/menu/25.jpg", "name": "Gà rán truyền thống", "price": "30.000", "category": "Gà rán"  },
                { "img": "http://localhost:5173/src/img/menu/26.jpg", "name": "Gà rán giòn cay", "price": "30.000", "category": "Gà rán"  },
                { "img": "http://localhost:5173/src/img/menu/28.jpg", "name": "Gà rán bột giòn", "price": "30.000", "category": "Gà rán"  },
                { "img": "http://localhost:5173/src/img/menu/30.jpg", "name": "Cà phê sữa đá", "price": "30.000" , "category": "Cà phê"  },
                { "img": "http://localhost:5173/src/img/menu/31.jpg", "name": "Trà sữa kem brûlée", "price": "30.000", "category": "Cà phê" },
                { "img": "http://localhost:5173/src/img/menu/32.jpg", "name": "Cà phê phin truyền thống", "price": "30.000", "category": "Cà phê" },
                { "img": "http://localhost:5173/src/img/menu/33.jpg", "name": "Cà phê trứng", "price": "30.000", "category": "Cà phê" },
                { "img": "http://localhost:5173/src/img/menu/34.jpg", "name": "Trà sữa cà phê trân châu", "price": "30.000", "category": "Cà phê" },
            ]
        }
    },
    computed: {
    filteredProducts() {
        if (this.selectedCategory === 'All') {
            return this.list_product;
        }
        return this.list_product.filter(product => product.category === this.selectedCategory);
    }
}


};
</script>
<style>
@media (max-width: 1000px) {
    .list_product {
        display: grid !important;
        /* Đảm bảo grid được áp dụng */
        grid-template-columns: repeat(2, 1fr) !important;
    }

    .allproduct {
        display: grid !important;
        /* Đảm bảo grid được áp dụng */
        grid-template-columns: repeat(1, 1fr) !important;
    }
}

@media (max-width: 600px) {
    .list_product {
        display: grid !important;
        /* Đảm bảo grid được áp dụng */
        grid-template-columns: repeat(1, 1fr) !important;
    }
}

.list_product {
    display: grid;
    justify-items: center;
    gap: 10px;
    grid-template-columns: repeat(4, 1fr);
    /* Mặc định là 3 cột */
}

.producta {
    padding: 10px;
    border-radius: 10px;
}

.producta img {
    width: 100%;
    height: 400px;
}

.producta .price {
    display: flex;
    align-items: center;
}

.price button {
    border: none;
    background-color: white;
    font-size: 13px;

    transition: all 0.3s ease;
}

.price button:hover {
    border: 1px solid rgb(139, 139, 11);
    padding: 10px 20px;
    border-radius: 50px;
}

.producta:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.option-product {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.option-product button {
    padding: 10px 20px;
    margin: 10px;
    border: 1px solid #b6a3a5;
    background-color: white;
    font-weight: 600;
    border-radius: 20px;
}

.option-product button:hover {
    border: 1px solid #ad343e;
    background-color: #ad343e;
    color: white;
    transition: 0.3s;
}
</style>
