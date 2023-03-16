import axios from 'axios';
import { setError, shippingAddressAdd, clearOrder } from '../slices/order';

export const setShippingAddress = (data) => (dispatch) => {
  dispatch(shippingAddressAdd(data));
};

export const setShippingAddressError = (value) => (dispatch) => {
  dispatch(setError(value));
};

export const createOrder = (order) => async (dispatch, getState) => {
  const {
    user: { userInfo },
    order: { shippingAddress },
  } = getState();

  const preparedOrder = { ...order, shippingAddress };
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('api/orders', preparedOrder, config);
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
      )
    );
  }
};

export const resetOrder = () => async (dispatch) => {
  dispatch(clearOrder());
};
