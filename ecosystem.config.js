module.exports = {
  apps: [
    {
      name: "cloud-app",
      script: "app.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "200M"
    }
  ]
};
