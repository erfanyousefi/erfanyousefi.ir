<template>
  <div>
    <Title title="هرروز یک جمله" />
    <Sentence :text="sentence" />
    <Title title="کدوم طرفی میخوای بری" />
    <Road />
    <Title title="مشاوره رایگان" />
    <Guid />
    <Title title="آخرین دوره ها" />
    <LastCourses />
    <Title title="آخرین مقالات" />
    <LastBlogs />
  </div>
</template>

<script>
import Title from "@/components/partials/client/Title.vue";
import Sentence from "@/components/client/Sentence/Sentence.vue";
import Road from "@/components/partials/client/Road.vue";
import Guid from "@/components/partials/client/Guid.vue";
import LastCourses from "@/components/client/course/LastCourses.vue";
import LastBlogs from "@/components/client/blog/LastBlogs.vue";
export default {
  components: {
    Title,
    Sentence,
    Road,
    Guid,
    LastCourses,
    LastBlogs
  },
  setup() {
    const sentence = `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
                        مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                        زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.`;

    return {
      sentence,
    };
  },
};
</script>

<style>
</style>