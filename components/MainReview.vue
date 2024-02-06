<template>
  <section class="i-reviews mt-5 pt-5">
    <ITitle :front="$t('What our customers say')" :back="$t('Testimonials')" />
    <div
      class="i-review-image"
      style="background-image: url(/img/review-img.png)"
    ></div>

    <div class="container">
      <div class="i-review">
        <h2 class="i-review-count">0{{ currentReview + 1 }}.</h2>
        <p>
          {{ reviews[currentReview].review }}
        </p>

        <div class="row">
          <div class="col">
            <div class="i-review-author">
              <div class="i-review-author-image" v-if="false"></div>
              <div class="i-review-author-info">
                <h3 class="i-review-author-name">
                  {{ reviews[currentReview].name }}
                </h3>
                <p class="i-review-author-location">
                  {{ reviews[currentReview].location }}
                </p>
              </div>
            </div>
          </div>
          <div class="col d-flex justify-content-end align-items-center">
            <div class="i-review-stars">
              <font-awesome-icon
                icon="star"
                v-if="reviews[currentReview].stars >= 1"
              />
              <font-awesome-icon
                icon="star"
                v-if="reviews[currentReview].stars >= 2"
              />
              <font-awesome-icon
                icon="star"
                v-if="reviews[currentReview].stars >= 3"
              />
              <font-awesome-icon
                icon="star"
                v-if="reviews[currentReview].stars >= 4"
              />
              <font-awesome-icon
                icon="star"
                v-if="reviews[currentReview].stars >= 5"
              />
            </div>
          </div>
        </div>

        <div class="i-review-paginate">
          <div>
            <div class="i-review-paginate-item" @click="prevReview">
              <font-awesome-icon icon="chevron-left" />
            </div>
            <div class="i-review-paginate-item" @click="nextReview">
              <font-awesome-icon icon="chevron-right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: "MainReview",
  data() {
    return {
      currentReview: 0,
      reviews: [
        {
          name: "Marie",
          location: "France, Paris",
          stars: 5,
          review:
            "J'ai récemment essayé ce restaurant de pizza et de burger et j'ai été très satisfait! La pizza était cuite à la perfection et le burger était savoureux. Le service était également très agréable. Je recommande vivement cet endroit pour tous ceux qui cherchent à manger une délicieuse pizza ou un burger satisfaisant!",
        },
        {
          name: "Pierre",
          location: "France, Paris",
          stars: 5,
          review:
            "Je suis un habitué de ce restaurant depuis des mois maintenant et je ne suis jamais déçu. Les pizzas sont toujours chaudes et savoureuses, et les burgers sont incroyablement juteux. Le service est également rapide et amical. Si vous cherchez une bonne pizza ou un burger, ne cherchez pas plus loin!",
        },
        {
          name: "Jean-Luc",
          location: "France, Paris",
          stars: 5,
          review:
            "Je suis un grand fan de ce restaurant de pizza et de burger depuis des années. Leur pizza est la meilleure que j'ai jamais goûtée et leurs burgers sont absolument délicieux. L'ambiance du restaurant est également très agréable et confortable. Si vous cherchez un endroit pour manger une excellente pizza ou un burger, cet endroit est un choix parfait!",
        },
      ],
    };
  },
  methods: {
    nextReview() {
      if (this.currentReview < this.reviews.length - 1) {
        this.currentReview++;
      }
    },
    prevReview() {
      if (this.currentReview > 0) {
        this.currentReview--;
      }
    },
  },
});
</script>

<style lang="scss">
.i-reviews {
  position: relative;

  .i-review-image {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 500px;
    width: 100%;
  }

  .i-review {
    margin-top: -300px;
    width: 50%;
    height: auto;
    background: #fff;
    box-shadow: 6px 22px 26px 0px rgba(0, 0, 0, 0.05);
    padding: 50px;
    border-radius: 5px;
    overflow: hidden;

    .i-review-count {
      font-size: 40px;
      font-weight: bold;
      line-height: 1;
      text-decoration: underline var(--bs-primary);
      text-decoration-thickness: 3px;

      margin-bottom: 20px;
    }

    .i-review-author {
      display: flex;
      align-items: center;
      margin: 20px 0;

      .i-review-author-image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--bs-primary);
        margin-right: 20px;
      }

      .i-review-author-info {
        .i-review-author-name {
          font-size: 18px;
          font-weight: bold;
          line-height: 1;
          margin-bottom: 5px;
        }

        .i-review-author-location {
          font-size: 14px;
          line-height: 1;
          color: rgba(132, 132, 132, 1);
          margin: 0;
        }
      }
    }

    .i-review-stars {
      font-size: 20px;
      color: #f9c700;
    }
  }

  .i-review-paginate {
    display: flex;
    justify-content: center;

    .i-review-paginate-item {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      border: 2px solid var(--bs-primary);
      color: var(--bs-primary);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease-in-out;
      cursor: pointer;

      &:not(:last-child) {
        margin-right: 15px;
      }

      &:hover {
        background: var(--bs-primary);
        color: var(--bs-body-bg);
      }
    }
  }
}
</style>
