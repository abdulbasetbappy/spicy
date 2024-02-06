<template>
  <div class="container coming-soon">
    <div class="header">
      <div class="logo">
        <img src="~/assets/tpw.png" alt="logo" />
      </div>
    </div>
    <div class="content">
      <div class="title">We are coming soon</div>
      <div class="subtitle">We are currently working on this website</div>
    </div>

    <div class="footer">
      Made with ❤️ by <a href="https://wetechpro.com/"> WeTechPro </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.coming-soon {
  &.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .header {
    .logo {
      height: 100px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;

    .title {
      font-size: 40px;
      font-weight: 700;
      color: var(--bs-primary);
      margin-bottom: 20px;
    }

    .subtitle {
      font-size: 20px;
      font-weight: 400;
      color: #fff;
    }
  }

  .footer {
    margin-top: 100px;
    font-size: 14px;
    font-weight: 400;
    color: var(--bs-white);
  }

  a {
    color: var(--bs-primary);
    text-decoration: none;
  }

  a:hover {
    color: var(--bs-primary);
    text-decoration: none;
  }

  a:active {
    color: var(--bs-primary);
    text-decoration: none;
  }

  @media (max-width: 768px) {
    .content {
      .title {
        font-size: 30px;
      }

      .subtitle {
        font-size: 16px;
      }
    }

    .footer {
      font-size: 12px;
    }

    .header {
      .logo {
        height: 80px;
      }
    }

    .footer {
      margin-top: 50px;
    }
  }
}
</style>
