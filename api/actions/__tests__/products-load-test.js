import {expect} from 'chai';
import load from '../products/load';
import {initialProducts} from '../products/init';

describe('products load', () => {
  it('uses the products from the session', () => {
    const tempProducts = ['a', 'b', 'c'];

    return load({session: {products: tempProducts}}).then(products => {
      expect(products).to.deep.equal(tempProducts);
    });
  });

  it('initializes the products ', () => {
    return load({session: {}}).then(products => {
      expect(products).to.deep.equal(initialProducts);
    });
  });
});
