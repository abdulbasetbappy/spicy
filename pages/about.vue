<template>
  <div class="container">
    <div class="pasta-about">
      <h1 class="pasta-about-title">A Propos</h1>

      <div class="row">
        <div class="col pasta-about-text">
          <p>
            Chez Sushi N Poke, nous sommes passionnés par la cuisine japonaise
            authentique. Nous n'utilisons que les ingrédients les plus frais et
            les méthodes traditionnelles pour préparer nos plats, afin que vous
            puissiez être sûr d'obtenir la meilleure expérience possible. Que
            vous ayez envie de sushis délicats ou de bols de poke copieux, nous
            avons quelque chose pour tout le monde.
          </p>

          <p>
            Nous proposons également une variété d'options végétaliennes et sans
            gluten, afin que chacun puisse profiter de notre cuisine délicieuse.
            Venez nous rendre visite dès aujourd'hui et découvrez le goût du
            Japon.
          </p>
        </div>
        <div class="col">
          <img
            src="~/assets/img/sushi-4.jpg"
            height="300"
            style="height: 300px"
            alt="Sushi N Poke"
          />
        </div>
      </div>

      <div class="row pasta-numbers">
        <div class="col-4">
          <h2 class="pasta-numbers-count">01.</h2>
          <h3 class="pasta-numbers-title">
            Saveurs <span class="pasta-numbers-em">japonaises</span>
          </h3>
          <p class="pasta-numbers-text">
            Découvrez une cuisine japonaise authentique, préparée avec des
            ingrédients frais et de qualité.
          </p>
        </div>
        <div class="col-4">
          <h2 class="pasta-numbers-count">02.</h2>
          <h3 class="pasta-numbers-title">
            Plaisirs <span class="pasta-numbers-em">Gourmands</span>
          </h3>
          <p class="pasta-numbers-text">
            Savourez nos sushis et poke bowls délicieux, ainsi que nos desserts
            gourmands.
          </p>
        </div>
        <div class="col-4">
          <h2 class="pasta-numbers-count">03.</h2>
          <h3 class="pasta-numbers-title">
            <span class="pasta-numbers-em">Expérience </span> unique
          </h3>
          <p class="pasta-numbers-text">
            Vivez une expérience unique en dégustant notre cuisine japonaise
            authentique et en profitant de notre service chaleureux.
          </p>
        </div>
      </div>

      <div class="row pasta-box">
        <div class="col-8 pasta-box-content">
          <h3 class="pasta-box-title">Passez votre commande en un clic !</h3>
          <div class="pasta-box-buttons">
            <RouterLink to="/order" class="btn btn-primary btn-lg pickup">
              Click & Collect
            </RouterLink>
            <RouterLink to="/order" class="btn btn-primary btn-lg delivery">
              Livraison
            </RouterLink>
          </div>
        </div>
        <div class="col-4 pasta-box-image">
          <img src="~/assets/img/sushi-3.png" alt="Pasta" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: "Menus",
  head() {
    return {
      title: "Checkout - Sushi N Poke",
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-8",
      meta: [
        {
          name: "description",
          content:
            "Sushi N Poke: Le meilleur restaurant de la ville pour une cuisine délicieuse.",
        },
      ],
      links: [
        { rel: "icon", type: "image/x-icon", href: "~/assets/favicon.ico" },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.pasta-about {
  margin-top: 5rem;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    margin: 1rem;
  }

  .pasta-about-title {
    font-size: 3rem;
    font-weight: bold;
    color: var(--bs-primary);
    line-height: 1;
    width: 100%;
    text-align: center;
    margin-bottom: 4rem;
  }

  p {
    font-size: 0.9rem;
    font-weight: normal;
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .row {
    @media (max-width: 768px) {
      flex-direction: column-reverse;
    }
  }

  .col {
    @media (max-width: 768px) {
      width: 100%;
      padding: 1rem;
      margin-bottom: 1rem;
    }
  }

  img {
    width: 100%;
    height: -webkit-fill-available;
    border-radius: 2rem;
    object-fit: cover;
  }
}

.pasta-numbers {
  margin-top: 10rem;
  margin-bottom: 10rem;

  .col-4 {
    @media (max-width: 768px) {
      width: 100%;
      padding: 1rem;
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 768px) {
    margin: 0;
  }

  .pasta-numbers-count {
    font-size: 2.5;
    font-weight: bold;
    color: var(--bs-secondary);
    line-height: 1;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .pasta-numbers-title {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 1rem;

    .pasta-numbers-em {
      color: var(--bs-primary);
    }
  }

  .pasta-numbers-text {
    font-size: 0.9rem;
    font-weight: normal;
    margin-bottom: 2rem;
  }
}

.pasta-box {
  background: var(--bs-primary);
  border-radius: 2rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
  position: relative;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin: 1rem;
    flex-direction: column-reverse;
  }

  .col-4,
  .col-8 {
    @media (max-width: 768px) {
      width: 100%;
      padding: 1rem;
      margin-bottom: 1rem;
    }
  }

  .pasta-box-content {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    z-index: 1;

    .pasta-box-title {
      font-size: 2rem;
      font-weight: bold;
      color: var(--bs-body-bg);
      text-transform: capitalize;
      margin-bottom: 1rem;

      @media (max-width: 768px) {
        text-align: center;
        font-size: 1.5rem;
      }
    }

    .pasta-box-buttons {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 2rem;
      width: 100%;

      @media (max-width: 768px) {
        justify-content: center;
      }

      .btn.delivery {
        padding: 0.75rem 1.5rem;
        font-size: 0.9rem;
        font-weight: bold;
        text-transform: capitalize;
        background-color: transparent;
        border: 2px solid var(--bs-body-bg);
        color: var(--bs-body-bg);
        transition: all 0.3s ease-in-out;
        border-radius: 5px;

        &:hover {
          background-color: var(--bs-body-bg);
          color: var(--bs-primary);
        }
      }

      .btn.pickup {
        padding: 0.75rem 1.5rem;
        font-size: 0.9rem;
        font-weight: bold;
        text-transform: capitalize;
        background-color: var(--bs-body-bg);
        border: 2px solid var(--bs-body-bg);
        color: var(--bs-primary);
        transition: all 0.3s ease-in-out;
        border-radius: 5px;
        margin-right: 1rem;

        &:hover {
          background-color: var(--bs-primary);
          color: var(--bs-body-bg);
        }
      }
    }
  }

  .pasta-box-image {
    @media (max-width: 768px) {
      display: flex;
      justify-content: center;
    }

    img {
      position: absolute;
      width: 250px;
      margin-left: 0;
      margin-top: 0;
      right: 0;
      padding: 30px;
      object-fit: contain;

      @media (max-width: 768px) {
        position: relative;
        width: 100%;
        margin-left: 0;
        margin-top: 0;
        margin-bottom: -5rem;
        right: 0;
      }
    }
  }
}
</style>
