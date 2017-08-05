import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import productValidation from './productValidation';
import * as productActions from 'redux/modules/products';

@connect(
  state => ({
    saveError: state.products.saveError
  }),
  dispatch => bindActionCreators(productActions, dispatch)
)
@reduxForm({
  form: 'product',
  fields: ['id', 'name', 'price', 'quantity', 'total'],
  validate: productValidation
})
export default class ProductForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired
  };

  render() {
    const { editStop, fields: {name, price, quantity, total}, formKey, handleSubmit, invalid,
      pristine, save, submitting, saveError: { [formKey]: saveError }, values } = this.props;
    const styles = require('containers/Products/Products.scss');
    return (
      <tr className={submitting ? styles.saving : ''}>
        <td className={styles.nameCol}>{name.value}</td>
        <td className={styles.priceCol}>{price.value}</td>
        <td className={styles.quantityCol}>
          <input type="number" className="form-control" {...quantity}/>
          {quantity.error && quantity.touched && <div className="text-danger">{quantity.error}</div>}
        </td>
        <td className={styles.totalCol}>{total.value}</td>
        <td className={styles.buttonCol}>
          <button className="btn btn-default"
                  onClick={() => editStop(formKey)}
                  disabled={submitting}>
            <i className="fa fa-ban"/> Cancel
          </button>
          <button className="btn btn-success"
                  onClick={handleSubmit(() => save(values)
                    .then(result => {
                      if (result && typeof result.error === 'object') {
                        return Promise.reject(result.error);
                      }
                    })
                  )}
                  disabled={pristine || invalid || submitting}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
          </button>
          {saveError && <div className="text-danger">{saveError}</div>}
        </td>
      </tr>
    );
  }
}
