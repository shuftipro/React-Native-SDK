export const mapStateToProps = state => {
  let store = state.userReducer;
  return {
    getReqPayload: store.requestPayload,
    getNetInfo:store.netInfo
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setDocumentPayload: data => {
      dispatch({ type: "SET_DOCUMENT", payload: data });
    },
    setAddressPayload: data => {
      dispatch({ type: "SET_ADDRESS", payload: data });
    },
    setConsentPayload: data => {
      dispatch({ type: "SET_CONSENT", payload: data });
    },
    setFacePayload: data => {
      dispatch({ type: "SET_FACE", payload: data });
    },
    setReqPayload: data => {
      dispatch({ type: "SET_REQUEST_PAYLOAD", payload: data });
    },
    setNetInfo: data => {
      dispatch({ type: "SET_NET_INFO", payload: data });
    },

  };
};