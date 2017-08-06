import {expect} from 'chai';
import update from '../products/update';
import * as load from '../products/load';
import sinon from 'sinon';

describe('products update', () => {
  afterEach(()=> {
    if ('restore' in load.default) {
      load.default.restore();
    }
  });

  it('updates a product', () => {
    const price = 25;
    const quantity = 4;

    const products = [
      {id: 1, name: 'Apple', price, quantity: 0, total: 0},
      {id: 2, name: 'Orange', price, quantity: 0, total: 0}
    ];
    sinon.stub(load, 'default').returns(new Promise((resolve) => {
      resolve(products);
    }));

    const product = {id: 2, name: 'Orange', price, quantity, total: 0};
    const expected = {...product, total: price * quantity};

    return update({session: {}, body: product}).
    then(
      (res)=> {
        expect(res).to.deep.equal(expected);
        expect(products[1]).to.deep.equal(expected);
      });
  });

  it('ignores invalid product', () => {
    const price = 25;

    const products = [
      {id: 1, name: 'Apple', price, quantity: 0, total: 0},
      {id: 2, name: 'Orange', price, quantity: 0, total: 0}
    ];
    sinon.stub(load, 'default').returns(new Promise((resolve) => {
      resolve(products);
    }));

    const product = {id: 99, name: 'Orange', price, quantity: 55, total: 0}; // invalid ID

    return update({session: {}, body: product}).
    then(
      undefined,
      (res)=> {
        expect(res).equal('Internal error');
      });
  });

});
