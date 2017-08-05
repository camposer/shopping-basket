import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as productActions from 'redux/modules/products';
import {isLoaded, load as loadProducts} from 'redux/modules/products';
import {initializeWithKey} from 'redux-form';
import { ProductForm } from 'components';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadProducts());
    }
  }
}])
@connect(
  state => ({
    products: state.products.data,
    editing: state.products.editing,
    error: state.products.error,
    loading: state.products.loading
  }),
  {...productActions, initializeWithKey })
export default class Products extends Component {
  static propTypes = {
    products: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    // load: PropTypes.func.isRequired,
    init: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  };

  calculateTotal(products) {
    return products.reduce((acc, product) => (acc + product.total), 0);
  }

  render() {
    const handleEdit = (product) => {
      const {editStart} = this.props; // eslint-disable-line no-shadow
      return () => editStart(String(product.id));
    };
    const {products, error, editing, loading, init} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Products.scss');
    return (
      <div className={styles.products + ' container'}>
        <h1>
          Products
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={init}>
            <i className={refreshClassName}/>
          </button>
        </h1>
        <Helmet title="Products"/>
        <p>
          Basic shopping basket calculator based on a list of fixed products and prices. There are no limits for the products' quantities.
        </p>
        <p>
          <em>Modify and press refresh button for cleaning actual values</em>
        </p>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        {products && products.length &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th className={styles.nameCol}>Name</th>
            <th className={styles.priceCol}>Price</th>
            <th className={styles.quantityCol}>Quantity</th>
            <th className={styles.totalCol}>Total</th>
            <th className={styles.buttonCol}></th>
          </tr>
          </thead>
          <tbody>
          {
            products.map((product) => editing[product.id] ?
              <ProductForm formKey={String(product.id)} key={String(product.id)} initialValues={product}/> :
              <tr key={product.id}>
                <td className={styles.nameCol}>{product.name}</td>
                <td className={styles.priceCol}>{product.price}</td>
                <td className={styles.quantityCol}>{product.quantity}</td>
                <td className={styles.totalCol}>{product.total}</td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-primary" onClick={handleEdit(product)}>
                    <i className="fa fa-pencil"/> Edit
                  </button>
                </td>
              </tr>)
          }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-right"><strong>Total</strong></td>
              <td className="text-center"><strong>{this.calculateTotal(products)}</strong></td>
              <td className="text-center"></td>
            </tr>
          </tfoot>
        </table>}
      </div>
    );
  }
}
