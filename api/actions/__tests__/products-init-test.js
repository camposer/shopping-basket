import {expect} from 'chai';
import init from '../products/init';
import {initialProducts} from '../products/init';

describe('products init', () => {
  it('set initialProducts in session and returns them', () => {
    return init({session: {products: ['a', 'b', 'c']}}).then(products => {
      expect(products).to.deep.equal(initialProducts);
    });
  });
});
