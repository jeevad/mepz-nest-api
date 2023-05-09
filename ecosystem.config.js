// https://pm2.keymetrics.io/docs/usage/application-declaration/
// # Start all applications
// pm2 start ecosystem.config.js
//
// # Stop all
// pm2 stop ecosystem.config.js
//
// # Restart all
// pm2 restart ecosystem.config.js
//
// # Reload all
// pm2 reload ecosystem.config.js
//
// # Delete all
// pm2 delete ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'mepz-nest-api',
      script: './dist/main.js',
      watch: false,
      force: true,
      env: {
        PORT: 3001,
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: '110.224.94.164',
      ref: 'origin/main',
      repo: 'https://github.com/Niras14/mepz-nest-api.git',
      path: '/var/www/html/mepz-nest-api',
      'post-deploy':
        'npm run build && pm2 reload ecosystem.config.js --env production',
    },
  },
};
