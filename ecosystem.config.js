module.exports = {
  apps: [
    {
      name: "sistema-interno",
      script: "server.js",

      exec_mode: "fork",
      instances: 1,

      env: {
        NODE_ENV: "production",
        PORT: 3010
      },

      autorestart: true,
      watch: false,
      max_memory_restart: "300M"
    }
  ]
};

