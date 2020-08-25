import createReducer from "../Library/createReducer";
import * as types from "./../Actions/types";
import { initialState } from "./initialState";

export const userReducer = createReducer(initialState, {
  [types.SET_DOCUMENT](state, action) {
    return {
      ...state,
      requestPayload:{
        ...state.requestPayload,
        document:{
          ...state.requestPayload.document,
          ...action.payload,
        }
      }
    };
  },
  [types.SET_FACE](state, action) {
    return {
      ...state,
      requestPayload:{
        ...state.requestPayload,
        face:{
          ...state.requestPayload.face,
          ...action.payload,
        }
      }
    };
  },
  [types.SET_ADDRESS](state, action) {
    return {
      ...state,
      requestPayload:{
        ...state.requestPayload,
        address:{
          ...state.requestPayload.address,
          ...action.payload,
        }
      }
    };
  },
  [types.SET_CONSENT](state, action) {
    return {
      ...state,
      requestPayload:{
        ...state.requestPayload,
        consent:{
          ...state.requestPayload.consent,
          ...action.payload,
        }
      }
    };
  },
  [types.SET_REQUEST_PAYLOAD](state, action) {
    return {
      ...state,
      requestPayload: action.payload
    };
  },
  [types.SET_NET_INFO](state, action) {
    return {
      ...state,
      netInfo: action.payload
    };
  },

});