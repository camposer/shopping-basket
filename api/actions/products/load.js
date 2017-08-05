import init from './init';

export function getProducts(req) {
  const products = req.session.products;
  if (!products) {
    return init(req);
  }
  return products;
}

export default function load(req) {
  return new Promise((resolve) => {
    resolve(getProducts(req));
  });
}
