import React, { useEffect, useContext, useReducer, useState } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

// all_products => return to beginning products after clear filter
// filtered_products => to filter products
const initialState = {
  all_products: [],
  filtered_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
    max_price: 0,
    min_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

// ProductsProvider > FilterProvider

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductsContext();

  const updateSort = (e) =>
    dispatch({ type: UPDATE_SORT, payload: e.target.value });

  const setGridView = () => dispatch({ type: SET_GRIDVIEW });
  const setListView = () => dispatch({ type: SET_LISTVIEW });

  const updateFilters = (e) => {
    console.log("clicked", e.target);
    let { name, value } = e.target;

    if (e.target.type === "checkbox") value = e.target.checked;

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () =>
    dispatch({
      type: CLEAR_FILTERS,
    });

  // this will set products in filterProvider when ProductProvider fetch the result(actually rerun)
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  // sort when products initially load and sort state change
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateSort,
        setGridView,
        setListView,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
