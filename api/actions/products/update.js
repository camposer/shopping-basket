import load from './load';

export default function update(req) {
  return new Promise((resolve) => {
    load(req).then(data => {
      const products = data;
      const product = req.body;
      product.total = product.price * product.quantity;
      if (product.id) {
        for (const idx in products) {
          if (products[idx].id === product.id) {
            products[idx] = product;
            req.session.products = products;
          }
        }
      }
      resolve(product);
    });
  });
}
