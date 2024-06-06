const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_NEWS":
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };
    case "REMOVE_POST":
      return {
        ...state,
        hits: state.hits.filter(
          (currElem) => currElem.objectID !== action.payload
        ),
      };
    case "SEARCH_POST":
      return {
        ...state,
        query: action.payload,
      };
    case "PREV_PAGE":
      let pageNum = state.page - 1;
      if (pageNum <= 0) {
        pageNum = 0;
      }
      return {
        ...state,
        page: pageNum,
      };
    case "NEXT_PAGE":
      let NxtPageNum = state.page + 1;
      if (NxtPageNum >= state.nbPages) {
        NxtPageNum = 0;
      }
      return {
        ...state,
        page: NxtPageNum,
      };
  }
  return state;
};

export default reducer;
