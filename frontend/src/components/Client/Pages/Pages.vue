<template>
    <div>
        <div class="gioithieu text-center p-2">
            <H1>Our Blog & Articles</H1>
            <p>
                We consider all the drivers of change gives you the components you need <br> to change to create a truly
                happens.
            </p>
        </div>
        <div class="list">
            <div class="list_pages">
            <template v-for="(value, index) in list_pages" :key="index">
                <div style="background-color: rgb(245, 237, 237) ;" class="product-all">
                    <img v-bind:src="value.img" alt="" />
                    <div class="ghichu">
                        <p class="fs-7">{{ value.time }}</p>
                    </div>
                    <div class="price d-flex justify-content-between">
                        <p class="mt-3 fs-5">{{ value.title }}</p>
                    </div>
                </div>
            </template>

        </div>
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
    .list_pages {
        display: grid !important;
        /* Đảm bảo grid được áp dụng */
        grid-template-columns: repeat(3, 1fr) !important;
    }

    .allproduct {
        display: grid !important;
        /* Đảm bảo grid được áp dụng */
        grid-template-columns: repeat(1, 1fr) !important;
    }
}

@media (max-width: 600px) {
    .list_pages {
        display: grid !important;
        /* Đảm bảo grid được áp dụng */
        grid-template-columns: repeat(1, 1fr) !important;
    }
}
.list{
    display: flex;
    justify-content: center;
}
.list_pages {
    width: 80%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    
}

.product-all{
    background-color: rgb(245, 237, 237);
    padding: 15px;
    border-radius: 10px;
}

.product-all img {
    width: 100%;
    height: 200px;
    /* object-fit: cover; */
    border-radius: 10px;
}


.product-all:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

</style>