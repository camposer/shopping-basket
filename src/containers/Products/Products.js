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
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  };

  render() {
    const handleEdit = (widget) => {
      const {editStart} = this.props; // eslint-disable-line no-shadow
      return () => editStart(String(widget.id));
    };
    const {products, error, editing, loading, load} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Products.scss');
    return (
      <div className={styles.widgets + ' container'}>
        <h1>
          Products
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}>
            <i className={refreshClassName}/> {' '} Reload
          </button>
        </h1>
        <Helmet title="Products"/>
        <p>
          Lorem ipsum
        </p>
        <p>
          This products are stored in your session, so feel free to edit it and refresh.
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
            <th className={styles.idCol}>ID</th>
            <th className={styles.colorCol}>Color</th>
            <th className={styles.sprocketsCol}>Sprockets</th>
            <th className={styles.ownerCol}>Owner</th>
            <th className={styles.buttonCol}></th>
          </tr>
          </thead>
          <tbody>
          {
            products.map((product) => editing[product.id] ?
              <ProductForm formKey={String(product.id)} key={String(product.id)} initialValues={product}/> :
              <tr key={product.id}>
                <td className={styles.idCol}>{product.id}</td>
                <td className={styles.colorCol}>{product.color}</td>
                <td className={styles.sprocketsCol}>{product.sprocketCount}</td>
                <td className={styles.ownerCol}>{product.owner}</td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-primary" onClick={handleEdit(product)}>
                    <i className="fa fa-pencil"/> Edit
                  </button>
                </td>
              </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}
