export const PAPAYA_ID = 4;

export const initialProducts = [
  {id: 1, name: 'Apple', price: 25, quantity: 0, total: 0},
  {id: 2, name: 'Orange', price: 30, quantity: 0, total: 0},
  {id: 3, name: 'Banana', price: 15, quantity: 0, total: 0},
  {id: PAPAYA_ID, name: 'Papaya', price: 50, quantity: 0, total: 0}
];

export default function init(req) {
  return new Promise((resolve) => {
    const products = [...initialProducts];
    req.session.products = products;
    resolve(products);
  });
}
