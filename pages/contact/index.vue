<template>
  <div class="container">
    <div class="pasta-contact">
      <h1 class="pasta-contact-title">Contact Us</h1>

      <div class="row">
        <div class="col pasta-contact-text">
          <Form
            ref="form"
            :action="useAppConfig().apiRoot + '/email'"
            method="get"
            :validation-schema="{
              name: 'required',
              email: 'required|email',
              phone: 'required|phone',
            }"
          >
            <!-- Start: name -->
            <div class="row mb-3">
              <div class="col-12">
                <label for="name" class="form-label">{{ $t("Name") }}</label>
                <Field
                  v-model="form.name"
                  name="name"
                  :label="$t('Name')"
                  :placeholder="$t('Enter your name')"
                  id="name"
                  autocomplete="name"
                />
                <ErrorMessage name="name" />
              </div>
            </div>
            <!-- End: name -->

            <!-- Start: email -->
            <div class="row mb-3">
              <div class="col-12">
                <label for="email" class="form-label">{{
                  $t("Email address")
                }}</label>
                <Field
                  v-model="form.email"
                  name="email"
                  :label="$t('Email address')"
                  :placeholder="$t('Enter your email address')"
                  id="email"
                  type="email"
                  autocomplete="email"
                />
                <ErrorMessage name="email" />
              </div>
            </div>
            <!-- End: email -->

            <div class="row mb-3">
              <div class="col-12">
                <label for="phone" class="form-label">{{
                  $t("Phone number")
                }}</label>
                <Field
                  v-model="form.phone"
                  name="phone"
                  :label="$t('Phone number')"
                  :placeholder="$t('Enter your phone number')"
                  id="phone"
                  type="tel"
                  autocomplete="tel"
                />
                <ErrorMessage name="phone" />

                <small class="form-text text-muted">
                  {{
                    $t(
                      "We'll never share your email or phone number with anyone else."
                    )
                  }}
                </small>
              </div>

              <div class="col-12">
                <label for="message" class="form-label">{{
                  $t("Message")
                }}</label>
                <textarea
                  class="input"
                  v-model="form.message"
                  name="message"
                  :label="$t('Message')"
                  :placeholder="$t('Enter your message')"
                  id="message"
                  type="textarea"
                  autocomplete="message"
                />
              </div>

              <div class="col-12">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="
                    form.name === '' ||
                    form.email === '' ||
                    form.phone === '' ||
                    form.message === ''
                  "
                >
                  {{ $t("Submit") }}
                </button>
              </div>
            </div>
          </Form>
        </div>
        <div class="col">
          <h3 class="mb-3">{{ $t("Our Location") }}</h3>
          <p>
            {{ $t("Sushi N Poke") }}
            <br />
            {{ $t("4 Quai du Pont Neuf") }}
            <br />
            {{ $t("56700 Hennebont, France") }}
          </p>
          <h3 class="mb-3">{{ $t("Contact Info") }}</h3>
          <p>
            {{ $t("Phone") }}:
            <a href="tel:+330753816934">+33 07 53 81 69 34</a>
            <br />
            {{ $t("Email") }}:
            <a href="mailto:info@example.com"> info@example.com </a>
          </p>

          <h3 class="mb-3">{{ $t("Feedback") }}</h3>
          <p>
            {{ $t("How was your experience?") }}
            <br />
            <a href="https://maps.app.goo.gl/oqo4vK9Y3x3j2VAR6">
              {{ $t("Leave us a review") }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
    };
  },
});
</script>

<style lang="scss">
.pasta-contact {
  margin-top: 5rem;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    margin: 1rem;
  }

  .pasta-contact-title {
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

  & > .row {
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

form {
  background: var(--bs-body-bg);
  label {
    font-size: 14px;
    font-weight: bold;
    color: #fff;
  }

  select {
    background: var(--p-black-gray);
    border: 1px solid var(--p-black-gray);
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }

  input,
  .input {
    background: var(--p-black-gray);
    border: 1px solid var(--p-black-gray);
    color: #fff;
    border-radius: 4px;
    padding: 10px;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    overflow: hidden;
    &::placeholder {
      color: #fff5;
    }

    // color of autocomplete
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: #fff;
      -webkit-box-shadow: 0 0 0px 1000px var(--p-black-gray) inset;
      transition: background-color 5000s ease-in-out 0s;
    }

    &:focus {
      border-color: #fff;
    }
  }
}

span[role="alert"] {
  color: red;
  display: block;
}
</style>
