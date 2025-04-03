<template>
    <div>
        <div class="gioithieu text-center p-2">
            <H1>Our Blog & Articles</H1>
            <p>
                We consider all the drivers of change gives you the components you need <br> to change to create a truly
                happens.
            </p>
        </div>
        <div class="list_product">
            <template v-for="(value, index) in list_pages" :key="index">
                <div style="background-color: rgb(245, 237, 237) ;" class="producta">
                    <img style="height: 200px;" v-bind:src="value.img" alt="" />
                    <div style="height: 20px" class="ghichu">
                        <p class="fs-7">{{ value.time }}</p>
                    </div>
                    <div class="price d-flex justify-content-between">
                        <p class="mt-3 fs-5">{{ value.title }}</p>
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
            list_pages: [
                { "img": "http://localhost:5173/src/img/pages/1.jpg", "time": "January 3, 2023", "title": "How to make a delicious crispy fried chicken" },
                { "img": "http://localhost:5173/src/img/pages/2.jpg", "time": "January 3, 2023", "title": "The secret to making the perfect French fries in an air fryer" },
                { "img": "http://localhost:5173/src/img/pages/3.jpg", "time": "January 3, 2023", "title": "How to prepare delicious chicken tenders" },
                { "img": "http://localhost:5173/src/img/pages/4.jpg", "time": "January 3, 2023", "title": "5 must-have kitchen gadgets to save your time" },
                { "img": "http://localhost:5173/src/img/pages/5.jpg", "time": "January 3, 2023", "title": "The best tips & tricks to make a perfect burger" },
                { "img": "http://localhost:5173/src/img/pages/6.jpg", "time": "January 3, 2023", "title": "7 delicious cheesecake recipes you must try" },
                { "img": "http://localhost:5173/src/img/pages/7.jpg", "time": "January 3, 2023", "title": "5 best pizza restaurants you should visit" },
                { "img": "http://localhost:5173/src/img/pages/8.jpg", "time": "January 3, 2023", "title": "How to make a crispy and juicy fried chicken at home" },
                { "img": "http://localhost:5173/src/img/pages/9.jpg", "time": "January 3, 2023", "title": "The ultimate guide to making the best homemade fries " },
                { "img": "http://localhost:5173/src/img/pages/10.jpg", "time": "January 3, 2023", "title": "Secrets to making the most delicious chicken nuggets" },
                { "img": "http://localhost:5173/src/img/pages/11.jpg", "time": "January 3, 2023", "title": "5 essential tools for making fast food at home " },
                { "img": "http://localhost:5173/src/img/pages/12.jpg", "time": "January 3, 2023", "title": "7 easy cheesecake recipes for dessert lovers" },
            ]
        }

    }
}
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
    grid-template-columns: repeat(5, 1fr);
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