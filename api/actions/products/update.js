import {PAPAYA_ID} from './init';
import load from './load';

export default function update(req) {
  return new Promise((resolve, reject) => {
    load(req).then(data => {
      const products = data;
      const product = req.body;
      product.total = product.price * product.quantity;
      if (product.id === PAPAYA_ID) {
        product.total -= Math.floor(product.quantity / 3) * product.price;
      }
      if (product.id) {
        for (const idx in products) {
          if (products[idx].id === product.id) {
            products[idx] = product;
            req.session.products = products;
            resolve(product);
          }
        }
      }
      reject('Internal error');
    });
  });
}
