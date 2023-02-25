/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep, check } from 'k6';

const opts = {
  soak: {
    vus: 200,
    duration: '20m',
  },
  ramp: {
    stages: [
      { duration: '1m', target: 200 },
      { duration: '3m', target: 200 },
      { duration: '30s', target: 0 },
    ],
  },
  spike: {
    stages: [
      { duration: '1m', target: 100 },
      { duration: '15s', target: 1000 },
      { duration: '1m', target: 900 },
      { duration: '15s', target: 100 },
    ],
  },
};

export const options = opts.spike;
const url = 'http://184.169.243.99';

const tests = {
  allQs: () => {
    const id = 922349 + Math.floor(Math.random() * 20000);
    const res = http.get(`${url}/questions?product_id=${id}`);
    sleep(1);

    check(res, {
      'Good Status - 200': (r) => r.status === 200,
    });
  },
  insertQ: () => {
    const id = 922349 + Math.floor(Math.random() * 20000);
    const body = {
      body: 'IM GOING TO STRESS YOU OUT',
      name: 'GOLIATH',
      email: 'x',
      product_id: id,
    };
    const res = http.post(`${url}/questions`, JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
    });
    sleep(1);

    check(res, {
      'Created Status - 201': (r) => r.status === 201,
    });
  },
  helpfulQ: () => {
    const id = 3250000 + Math.floor(Math.random() * 25000);
    const res = http.put(`${url}/questions/${id}/helpful`);
    sleep(1);

    check(res, {
      'Good Status - 204': (r) => r.status === 204,
    });
  },
  reportQ: () => {
    const id = 3250000 + Math.floor(Math.random() * 25000);
    const res = http.put(`${url}/questions/${id}/report`);
    sleep(1);

    check(res, {
      'Good Status - 204': (r) => r.status === 204,
    });
  },
  allAs: () => {
    const id = 3000000 + Math.floor(Math.random() * 25000);
    const res = http.get(`${url}/questions/${id}/answers`);
    sleep(1);

    check(res, {
      'Good Status - 200': (r) => r.status === 200,
    });
  },
  insertA: () => {
    const id = 3000000 + Math.floor(Math.random() * 25000);
    const body = {
      body: 'IM GOING TO STRESS YOU OUT',
      name: 'GOLIATH',
      email: 'x',
      photos: [],
    };
    const res = http.post(`${url}/questions/${id}/answers`, JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
    });
    sleep(1);

    check(res, {
      'Created Status - 201': (r) => r.status === 201,
    });
  },
  helpfulA: () => {
    const id = 6500000 + Math.floor(Math.random() * 300000);
    const res = http.put(`${url}/answers/${id}/helpful`);
    sleep(1);

    check(res, {
      'Good Status - 204': (r) => r.status === 204,
    });
  },
  reportA: () => {
    const id = 6500000 + Math.floor(Math.random() * 300000);
    const res = http.put(`${url}/answers/${id}/report`);
    sleep(1);

    check(res, {
      'Good Status - 204': (r) => r.status === 204,
    });
  },
};

export default function () {
  tests.allQs();
  // tests.insertQ();
  // tests.helpfulQ();
  // tests.reportQ();
  // tests.allAs();
  // tests.insertA();
  // tests.helpfulA();
  // tests.reportA();
}
