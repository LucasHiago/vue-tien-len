const data = require('./mock-users');

const LATENCY = 16;

// fetch fake users
export function getUsers(cb) {
  setTimeout(() => {
    cb(data);
  }, LATENCY);
}

