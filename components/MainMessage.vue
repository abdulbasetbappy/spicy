<template>
  <div class="i-message py-5">
    <div class="container py-5">
      <div class="i-message-content">
        <h2 class="i-message-title">A Propos</h2>
        <h4 class="i-message-subtitle">
          Vous avez envie de déguster une véritable pizza artisanale à domicile?
        </h4>

        <p class="i-message-text">
          Sushi N Poke est une pizzeria installée depuis 2017 au 34 Av. du
          Général de Gaulle, 94500 Champigny-sur-Marne. La pizzeria The Pasta
          Way vous proposes 34 recettes de pizzas cuisinées avec des produits
          frais et dans le respect des traditions indienne.
        </p>
        <p class="i-message-text">
          Vous pouvez soit venir à la pizzeria déguster nos savoureuses pizzas
          soit le faire depuis le confort de votre domicile grâce à notre
          service de livraison gratuite. Notre pizzaïolo réalise journalièrement
          la pâte pizza de nos délicieuses pizzas . Toutes nos pizzas sont
          artisanales et tout les produits que nous utilisons sont HALAL.
        </p>
      </div>
      <div class="i-message-badge">
        <img src="~/assets/img/message-badge.png" alt="badge" />
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  name: "MainMessage",
});
</script>

<style scoped lang="scss">
.i-message {
  background: url("/assets/img/message-bg.jpg") no-repeat center center;
  background-size: cover;

  .i-message-content {
    background: rgba(255, 255, 255, 0.85);
    border: 2px solid var(--bs-primary);
    border-radius: 30px;
    backdrop-filter: blur(5px);
    padding: 2rem;
    padding-bottom: 3rem;
    box-shadow: 0px 10px 20px 20px rgba(0, 0, 0, 0.15);

    .i-message-title {
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 10px;
      color: var(--bs-primary);
      text-align: center;
    }

    .i-message-subtitle {
      font-size: 18px;
      text-align: center;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .i-message-text {
      font-size: 16px;
      text-align: center;
      padding: 0 2rem;
    }
  }

  .i-message-badge {
    display: flex;
    justify-content: center;

    img {
      width: 120px;
      margin-top: -60px;
      z-index: 1;
    }
  }
}
</style>
