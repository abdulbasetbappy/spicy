<template>
  <div class="i-title">
    <div class="container">
      <h2 class="i-title-back">{{ back }}</h2>
      <h3 class="i-title-front">{{ front }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "ITitle",
  props: {
    front: {
      type: String,
      required: true,
    },
    back: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.i-title {
  display: flex;
  align-items: center;
  height: 100px;
  position: relative;
  margin-bottom: -26px;

  .i-title-back {
    font-size: 100px;
    font-weight: bold;
    line-height: 1;
    margin: 0;
    position: absolute;
    top: 0;
    color: rgba(8, 8, 8, 0.05);
    z-index: -1;
    user-select: none;
  }

  .i-title-front {
    margin: 0;
    font-size: 28px;
    line-height: 1;
    color: rgba(132, 132, 132, 1);
  }
}
</style>
