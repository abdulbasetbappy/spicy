module.exports = {
  apps: [
    {
      name: "Sushi N Poke",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
