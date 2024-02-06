<template>
  <section class="i-blog-section mt-5 pt-5">
    <ITitle front="Read latest blog" back="Blog" />
    <div class="container">
      <div class="i-blogs">
        <div class="i-blog" v-for="i in 3" :key="i">
          <div class="i-blog-cover">
            <!-- <div
              class="i-blog-image"
              style="background-image: url(/img/bg.jpg)"
            ></div> -->
            <img src="/img/bg.jpg" alt="" class="i-blog-image" />
            <div class="i-blog-tag">Category</div>
          </div>
          <div class="i-blog-content">
            <h3 class="fw-bold">Blog Title Here</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex,
              architecto esse. Veritatis quisquam.
            </p>
            <a href="#">Read More...</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.i-blogs {
  display: flex;
  gap: 30px;

  .i-blog {
    background: #fff;
    box-shadow: 6px 22px 26px 0px rgba(0, 0, 0, 0.04);
    border-radius: 5px;
    overflow: hidden;

    .i-blog-cover {
      margin-bottom: 15px;
      position: relative;

      .i-blog-image {
        height: 250px;
        width: 100%;
        object-fit: cover;
      }

      .i-blog-tag {
        position: absolute;
        top: 20px;
        left: 20px;
        background: var(--bs-primary);
        color: var(--bs-body-bg);
        padding: 5px 20px;
      }
    }

    .i-blog-content {
      text-align: center;
      padding: 25px;
    }
  }
}
</style>
