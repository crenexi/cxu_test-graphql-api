/* eslint-disable */

const ecosystemConfig = {
  apps: [{
    name: "api.webbuniverse.com",
    script: 'node',
    args: './dist/bin/www.js',
    listen_timeout : 5000,
    kill_timeout : 5000,
    exp_backoff_restart_delay: 100,
    error_file: './logs/pm2.error.log',
    out_file: './logs/pm2.general.log',
    combine_logs: true,
    time: true,
  }],
};

module.exports = ecosystemConfig;
