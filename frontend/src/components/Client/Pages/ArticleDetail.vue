<template>
 <div>
  <div v-if="article" class="page-details py-4">
    <h1 class="text-center mb-3">{{ article.title }}</h1>
    <div class="text-center">
      <img :src="article.img" style="max-width: 600px; border-radius: 10px" />
    </div>
    <div class="mt-4 fs-3">
      <h1>What do you need to make good {{ article.content }}?</h1>
      <p>
        {{ article.message }}
      </p>
      <ul>
        <li>
          {{ article.infor1 }}
        </li>
        <li>
          {{ article.infor2 }}
        </li>
        <li>
          {{ article.infor3 }}
        </li>
        <li>
          {{ article.infor4 }}
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="text-center py-5">
    <h2>Không tìm thấy bài viết</h2>
  </div>
  <div class="pages-lienquan">
    <h1 class="text-center">Read More Articles</h1>
    <p class="text-center fs-5">
      We consider all the drivers of change gives you the components you need to
      change to create a truly happens.
    </p>
  </div>
  <div class="list">
      <div class="list_pages">
        <template v-for="(value, index) in list_details" :key="index">
          <div
            style="background-color: rgb(245, 237, 237)"
            class="product-all"
            @click="goToDetail(index + 1)"
          >
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
      article: null,
      // Giả lập lại danh sách bài viết (nên tách riêng thành file JSON hoặc fetch từ API nếu sau này mở rộng)
      list_pages: [
        {
          id: 1,
          img: "http://localhost:5173/src/img/pages/1.jpg",
          title: "How to make a delicious crispy fried chicken",
          content: "fried chicken",
          message:
            " The key to great fried chicken is choosing high-quality fresh chicken, especially thighs or wings, which are high in fat and tender, helping toretain moisture and flavor after frying.",
          infor1:
            " Marination (Ướp): Marinate the chicken for at least 4 hours or overnight. Use a mix of salt, black pepper, garlic powder, paprika, and buttermilk (or regular milk with lemon juice) to tenderize the chicken and boost flavor from the inside out.",
          infor2:
            "Coating (Lớp bột): For that signature crunch, coat the chicken in a seasoned flour mix. Combine all-purpose flour with paprika, garlic powder, onion powder, salt, and pepper. For extra crispiness, double-dip: flour → buttermilk → flour again. This builds a thick, crunchy crust.",
          infor3:
            "Fry in small batches. Overcrowding the pan or fryer drops the oil temperature and leads to soggy chicken. Give each piece space to crisp up properly.",
          infor4:
            "Cooking: Maintain an oil temperature of around 170–180°C (340–360°F). Fry until golden brown and crispy. The internal temperature should reach 75°C (165°F) for perfectly cooked, juicy chicken.",
        },
        {
          id: 2,
          img: "http://localhost:5173/src/img/pages/2.jpg",
          title:
            "The secret to making the perfect French fries in an air fryer",
          content: "French fries",
          message:
            " Great fries start with the right potato. Russet potatoes are ideal thanks to their high starch and low moisture content, which gives you fries that are fluffy inside and crispy outside.",
          infor1:
            "Cutting & Soaking: Cut your potatoes evenly—about ¼ inch thick—for consistent cooking. Then soak them in cold water for at least 30 minutes, or ideally a few hours. This removes excess starch, helping the fries crisp up better during cooking.",
          infor2:
            "Drying: Before frying, dry the potatoes thoroughly with a towel. Any leftover moisture will cause the oil to splatter and make the fries soggy instead of crispy.",
          infor3:
            "Double Frying: This is the secret to perfect fries. First fry: Cook at a lower temperature (around 150°C / 300°F) until the fries are soft but pale. Rest: Let them cool for a few minutes. Second fry: Increase the heat to 190°C / 375°F and fry again until golden brown and crispy.",
          infor4:
            "Seasoning:Season the fries immediately after frying with salt so it sticks well. You can also toss them with garlic powder, paprika, or even a sprinkle of parmesan for extra flavor.",
        },
        {
          id: 3,
          img: "http://localhost:5173/src/img/pages/3.jpg",
          title: "How to make delicious fried spring rolls",
          content: "spring rolls",
          message:
            " The soul of perfect fried nem chua is high-quality fresh ground pork with a bit of fat (tầm 20%) to keep the texture juicy and flavorful after frying. Avoid lean cuts that may dry out during cooking.",
          infor1:
            "Seasoning & Fermentation: A great nem chua base needs a well-balanced mix of garlic, chili, sugar, fish sauce, and a hint of pepper. Traditional nem chua is lightly fermented for a signature tangy flavor—about 1–2 days depending on temperature and humidity. If you're making it for frying, fermentation time can be shorter to keep the meat tender and fresh-tasting.",
          infor2:
            "Shaping & Wrapping: Form small sausage-like rolls using banana leaves or plastic wrap. Keep them evenly sized for uniform cooking. You can add a bit of shredded pork skin (bì) for authentic texture and chewiness.",
          infor3:
            "Coating: Before frying, roll each nem chua in a light layer of beaten egg and breadcrumbs (bột chiên xù). This helps create that crispy golden shell we all love. Let them rest a bit so the coating adheres well.",
          infor4:
            "Frying: Use medium heat (around 160–170°C) to fry until golden and crispy. Avoid using too high a temperature—it may burn the outside before the inside is fully cooked. Fry in small batches to maintain oil temperature and crispiness.",
        },
        {
          id: 4,
          img: "http://localhost:5173/src/img/pages/4.jpg",
          title: "5 must-have kitchen gadgets to save your time",
          content: "5 must-have kitchen gadgets ",
          message:
            "Chop, slice, and blend in seconds—perfect for sauces, salads, or prepping large meals quickly.",
          infor1:
            "Electric Kettle: Heats water in under a minute—great for tea, coffee, instant noodles, or sterilizing utensils.",
          infor2:
            "Air Fryer: Get crispy results with less oil—ideal for fries, nuggets, or even baked goods.",
          infor3:
            "Garlic Press: Save time and tears—instantly crush garlic with no mess and no peeling required.",
          infor4:
            "Rice Cooker: Not just for rice—it can steam, slow-cook, and even make cakes!",
        },
        {
          id: 5,
          img: "http://localhost:5173/src/img/pages/5.jpg",
          title:
            "The best tips and tricks for making the perfect cup of coffee",
          content: "up of coffee",
          message:
            " Choose Fresh Beans: Freshly roasted, high-quality beans are key. Grind just before brewing.",
          infor1:
            "Use the Right Ratio: A general rule: 1–2 tablespoons of coffee per 180ml of water.",
          infor2:
            "Water Temperature: Ideal temp: 90–96°C. Avoid boiling water—it burns the coffee!",
          infor3:
            "Brew Method Matters: French press, pour-over, espresso—choose what matches your flavor preference.",
          infor4:
            "Clean Equipment: Oil and residue ruin flavor. Clean everything regularly.",
        },
        {
          id: 6,
          img: "http://localhost:5173/src/img/pages/6.jpg",
          title: "Foods that make Hoi An bread",
          content: "Hoi An bread",
          message:
            " Crispy Baguette: Thin crust, fluffy interior—baked fresh daily.",
          infor1:
            "Grilled Pork or Chicken: Marinated in lemongrass and fish sauce for smoky, savory depth.",
          infor2:
            "Pate & Mayonnaise: Creamy, homemade, and rich—it’s what gives Hoi An bánh mì its soul.",
          infor3:
            "Pickled Veggies: Crisp and tangy carrots and daikon balance the richness.",
          infor4:
            "Fresh Herbs: Coriander, chili, and cucumber for brightness and crunch.",
        },
        {
          id: 7,
          img: "http://localhost:5173/src/img/pages/7.jpg",
          title: "5 best bakeries you should visit",
          content: "5 best bakeries you should visit",
          message:
            " Crispy Baguette: Thin crust, fluffy interior—baked fresh daily.",
          infor1: "Tartine (Hà Nội): Known for its sourdough and rustic vibe.",
          infor2: "L’amour (Sài Gòn): Sweet pastries with a French twist.",
          infor3:
            "Tiệm Bánh Cối Xay Gió (Đà Lạt): Iconic yellow wall & old-school breads.",
          infor4: "ABC Bakery: Affordable, creative, and all over Vietnam.",
        },
        {
          id: 8,
          img: "http://localhost:5173/src/img/pages/8.jpg",
          title: "How to make super delicious kumquat tea",
          content: "Kumquat Tea",
          message:
            " Choose Ripe Kumquats: Bright orange, soft to touch—not green or overly firm.",
          infor1:
            "Squeeze Gently: Keep the zest for fragrance, strain the juice.",
          infor2: "Sweeten Right: Use honey or rock sugar—adjust to taste.",
          infor3:
            "Brew with Hot Water: Don’t boil it—just steep with hot water for 3–5 minutes.",
          infor4: "Serve Warm or Iced: Perfect for sore throats or hot days!",
        },
        {
          id: 9,
          img: "http://localhost:5173/src/img/pages/9.jpg",
          title: "The ultimate guide to making the best homemade fries",
          content: "French fries",
          message:
            " The best fries start with the right kind of potato. Go for starchy varieties like Russet or Idaho—they’re dry and fluffy inside, which means crispier fries on the outside.",
          infor1:
            "Cut Evenly:Uniform thickness = even cooking. Aim for sticks about ¼ inch thick. Use a mandoline slicer if you want pro-level consistency.",
          infor2:
            "Soak Before Frying:Soaking the cut potatoes in cold water (at least 30 minutes, or overnight) removes excess starch, which prevents sticking and helps them crisp up.",
          infor3:
            "Double Fry for Perfection:First Fry (Blanch): 150–160°C (300–320°F) until fries are soft but not colored.Cool down—this step is key.Second Fry: 180–190°C (350–375°F) until golden and crispy.",
          infor4:
            "Season Immediately:Toss fries with salt right after frying, while they’re still hot. You can also add paprika, garlic powder, parmesan, or fresh herbs for a gourmet twist.",
        },
        {
          id: 10,
          img: "http://localhost:5173/src/img/pages/10.jpg",
          title: "Secrets to making the most delicious chicken nuggets",
          content: "chicken nuggets",
          message:
            "Use Chicken Thighs:Juicier than breast meat and stays tender when fried.",
          infor1:
            "Season Well:Salt, pepper, garlic powder, paprika, and onion powder.",
          infor2:
            "Bread Smart:Flour → Egg → Breadcrumbs. For extra crunch: panko.",
          infor3: "Double Fry:Low temp first, then crisp at high temp.",
          infor4: "Serve Hot with Dips:Ketchup, BBQ sauce, or spicy mayo.",
        },
        {
          id: 11,
          img: "http://localhost:5173/src/img/pages/11.jpg",
          title: "5 essential tools for making fast food at home",
          content: "Fast Food",
          message:
            " Deep Fryer or Air Fryer – For nuggets, fries, onion rings...",
          infor1: "Nonstick Pan – Perfect for burgers, eggs, and sandwiches.",
          infor2: "Sharp Chef’s Knife – For slicing, dicing, and speed.",
          infor3: "Mandoline Slicer – Thin, uniform cuts for fries or slaw.",
          infor4: "Silicone Spatula – Heat-proof, non-stick, super handy.",
        },
        {
          id: 12,
          img: "http://localhost:5173/src/img/pages/12.jpg",
          title: "easy cheesecake recipes for dessert lovers",
          content: "Dessert",
          message:
            " Crust First:Crushed graham crackers or Oreo + melted butter = perfect base.",
          infor1:
            "Creamy Filling:Cream cheese, eggs, sugar, vanilla, and a splash of lemon juice.",
          infor2:
            "Bake Low and Slow:Use a water bath at low temp to avoid cracks.",
          infor3:
            "Cool Gradually:Let it cool in the oven first, then fridge for at least 4 hours.",
          infor4: "Toppings:Berries, caramel, or chocolate—whatever you crave.",
        },
      ],
      list_details: [
        {
          img: "http://localhost:5173/src/img/pages/9.jpg",
          time: "January 3, 2023",
          title: "The ultimate guide to making the best homemade fries ",
        },
        {
          img: "http://localhost:5173/src/img/pages/10.jpg",
          time: "January 3, 2023",
          title: "Secrets to making the most delicious chicken nuggets",
        },
        {
          img: "http://localhost:5173/src/img/pages/11.jpg",
          time: "January 3, 2023",
          title: "5 essential tools for making fast food at home ",
        },
        {
          img: "http://localhost:5173/src/img/pages/12.jpg",
          time: "January 3, 2023",
          title: "easy cheesecake recipes for dessert lovers",
        },
      ],
    };
  },
  created() {
    const id = parseInt(this.$route.params.id);
    this.article = this.list_pages.find((item) => item.id === id);
  },
};
</script>

<style scoped>
.container {
  margin: auto;
}
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
.list {
  display: flex;
  justify-content: center;
}
.list_pages {
  width: 80%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.product-all {
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
