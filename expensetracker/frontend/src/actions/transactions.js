import {
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  GET_TRANSACTIONS,
  UPDATE_TRANSACTION,
  ADD_TRANSACTION_ERROR,
  GET_TRANSACTIONS_ERROR,
  UPDATE_TRANSACTION_ERROR,
} from "../actions/types";
import { tokenConfig } from "../common/auth-config";
import { errorMessage } from "./messages";
import axios from "axios";

export const getTransactions = () => (dispatch, getState) => {
  const config = tokenConfig(getState);
  axios
    .get("/api/v1/transactions", config)
    .then((res) => {
      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(errorMessage(GET_TRANSACTIONS_ERROR, err.response.data));
    });
};

export const deleteTransaction = (id) => (dispatch, getState) => {
  const config = tokenConfig(getState);
  axios
    .delete(`/api/v1/transactions/${id}`, config)
    .then((res) => {
      dispatch({
        type: DELETE_TRANSACTION,
        payload: id,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch(errorMessage(GET_TRANSACTIONS_ERROR, err.response.data));
      } else {
        console.log(err);
      }
    });
};

export const addTransaction = (transaction) => (dispatch, getState) => {
  const config = tokenConfig(getState);
  axios
    .post("/api/v1/transactions/", transaction, config)
    .then((res) => {
      dispatch({
        type: ADD_TRANSACTION,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response);
        dispatch(errorMessage(ADD_TRANSACTION_ERROR, err.response.data));
      } else {
        console.log(err);
      }
    });
};

export const updateTransaction = (transaction) => (dispatch, getState) => {
  const config = tokenConfig(getState);
  axios
    .put(`/api/v1/transactions/${transaction.id}/`, transaction, config)
    .then((res) => {
      dispatch({
        type: UPDATE_TRANSACTION,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response);
        dispatch(errorMessage(UPDATE_TRANSACTION_ERROR, err.response.data));
      } else {
        console.log(err);
      }
    });
};
