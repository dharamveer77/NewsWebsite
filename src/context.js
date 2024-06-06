import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./Reducer";

let API = "https://hn.algolia.com/api/v1/search?";

const intitalState = {
  isLoading: true,
  query: "",
  nbPages: 0,
  page: 0,
  hits: [],
};
//Context
const AppContext = React.createContext();

//Provider function
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intitalState);

  const fetchApiData = async (url) => {
    dispatch({
      type: "SET_LOADING",
    });
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      dispatch({
        type: "GET_NEWS",
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Remove News
  const removePost = (Post_ID) => {
    dispatch({ type: "REMOVE_POST", payload: Post_ID });
  };
  //Search News
  const searchPost = (searchQuery) => {
    dispatch({ type: "SEARCH_POST", payload: searchQuery });
  };
  //Previous Page
  const getPrevPage = () => {
    dispatch({ type: "PREV_PAGE" });
  };
  //Next Page
  const getNextPage = () => {
    dispatch({ type: "NEXT_PAGE" });
  };

  //API calling
  useEffect(() => {
    fetchApiData(`${API}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);
  return (
    <AppContext.Provider
      value={{ ...state, removePost, searchPost, getPrevPage, getNextPage }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook
const useGlobleContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobleContext };
