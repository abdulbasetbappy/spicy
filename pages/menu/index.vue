<template>
  <div class="container">
    <div class="pasta-menu">
      <h1 class="pasta-menu-title">Menu</h1>

      <div class="row">
        <div class="col" @click="this.$router.push('/order')">
          <img src="~/assets/img/tpw-menu.png" alt="Sushi N Poke Menu" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.pasta-menu {
  margin-top: 5rem;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    margin: 1rem;
  }

  .pasta-menu-title {
    font-size: 3rem;
    font-weight: bold;
    color: var(--bs-primary);
    line-height: 1;
    width: 100%;
    text-align: center;
    margin-bottom: 4rem;
  }

  img {
    width: 100%;
    border-radius: 1rem;
    cursor: pointer;
  }
}
</style>
