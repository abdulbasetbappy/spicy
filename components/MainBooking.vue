<template>
  <section class="i-bookings mt-5 pt-5">
    <ITitle front="Book a table" back="Reservation" />
    <div class="i-booking-image" style="background-image: url(/img/booking.png)"></div>

    <div class="container">
      <div class="i-booking">
        <h2 class="fw-bold">Hotel Reservation</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
          perspiciatis a ut facilis, voluptatem doloribus provident vero.
        </p>

        <div class="row">
          <div class="col">
            <img src="/img/booking-img.png" height="100px" alt="" />
          </div>
          <div class="col d-flex justify-content-end align-items-end">
            <button class="btn btn-primary text-white">Reservation</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.i-bookings {
  position: relative;

  .i-booking-image {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 300px;
    width: 100%;
  }

  .i-booking {
    margin-top: -150px;
    width: 50%;
    height: fit-content;
    background: #fff;
    box-shadow: 6px 22px 26px 0px rgba(0, 0, 0, 0.05);
    padding: 50px;
  }
}
</style>
