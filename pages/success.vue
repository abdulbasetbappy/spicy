<template>
  <div class="row p-5 my-5">
    <div class="col-md-12 d-flex flex-column justify-content-center">
      <font-awesome-icon icon="check-circle" size="5x" class="text-success" />
      <div class="mt-3 d-flex justify-content-center flex-column text-center">
        <h1 class="fw-bold">{{ $t("Congratulations") }},</h1>
        <h2>{{ $t("Your order was placed successfully!") }}</h2>
        <p>
          {{
            $t(
              "We will email you a confirmation email with details of your order."
            )
          }}
        </p>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <NuxtLink
        class="btn btn-primary fw-bold mt-3"
        style="max-width: fit-content"
        to="/"
      >
        {{ $t("Order More") }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: "Success",
  head() {
    return {
      title: "Success",
      meta: [
        {
          name: "description",
          content: "Thank you for your order.",
        },
      ],
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
});
</script>
