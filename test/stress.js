import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 100,
  duration: '180s',
};

const tests = {
  allQs: () => {
    const id = 922349 + Math.floor(Math.random() * 20000);
    const res = http.get(`http://localhost:3000/questions?product_id=${id}`);
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
    const res = http.post('http://localhost:3000/questions', JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
    });
    sleep(1);

    check(res, {
      'Created Status - 201': (r) => r.status === 201,
    });
  },
};

export default function () {
  tests.insertQ();
}
