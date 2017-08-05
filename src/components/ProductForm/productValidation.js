import {createValidator, required, integer, positiveInteger} from 'utils/validation';

const widgetValidation = createValidator({
  quantity: [required, integer, positiveInteger]
});
export default widgetValidation;
