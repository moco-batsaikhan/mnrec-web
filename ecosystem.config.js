module.exports = {
  apps: [
    {
      name: "mnrec-web",
      script: "npm",
      args: "start",
      cwd: "/var/www/mnrec-web", // Server дээрх замыг өөрчлөх
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    },
  ],
};
