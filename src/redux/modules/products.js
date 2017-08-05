const LOAD = 'shopping-basket/products/LOAD';
const LOAD_SUCCESS = 'shopping-basket/products/LOAD_SUCCESS';
const LOAD_FAIL = 'shopping-basket/products/LOAD_FAIL';
const EDIT_START = 'shopping-basket/products/EDIT_START';
const EDIT_STOP = 'shopping-basket/products/EDIT_STOP';
const SAVE = 'shopping-basket/products/SAVE';
const SAVE_SUCCESS = 'shopping-basket/products/SAVE_SUCCESS';
const SAVE_FAIL = 'shopping-basket/products/SAVE_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = [...state.data];
      data[action.result.id - 1] = action.result;
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.products && globalState.products.loaded;
}

export function init() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/products/init')
  };
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/products/load')
  };
}

export function save(product) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: product.id,
    promise: (client) => client.post('/products/update', {
      data: product
    })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
