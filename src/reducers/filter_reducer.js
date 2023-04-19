import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  const { type } = action;

  // ... => to break reference
  if (type === LOAD_PRODUCTS) {
    const max_price = Math.max(...action.payload.map((el) => el.price));

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: max_price,
        price: max_price,
      },
    };
  }

  if (type === SET_GRIDVIEW) return { ...state, grid_view: true };
  if (type === SET_LISTVIEW) return { ...state, grid_view: false };

  if (type === UPDATE_SORT) return { ...state, sort: action.payload };

  if (type === SORT_PRODUCTS) {
    const { filtered_products, sort } = state;
    let tempProducts = [...filtered_products];

    if (sort === "price-lowest")
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    if (sort === "price-highest")
      tempProducts = tempProducts.sort((a, b) => -(a.price - b.price));
    if (sort === "name-a")
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-z")
      tempProducts = tempProducts.sort((a, b) => -a.name.localeCompare(b.name));

    return { ...state, filtered_products: tempProducts };
  }

  if (type === FILTER_PRODUCTS) {
    const { text, category, company, color,price, shipping } = state.filters;

    let tempProducts = [...state.all_products];

    if (text !== "") {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().startsWith(text.toLowerCase())
      );
    }

    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (company !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.company.toLowerCase() === company.toLowerCase()
      );
    }

    if (color !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.colors.some(prd=>prd.color===color)
      );
    }


    if (price) {
      tempProducts = tempProducts.filter(
        (product) => product.price<= price
      );
    }
    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping=== shipping
      );
    }


    return {...state,filtered_products:tempProducts}
  }
  if (type === UPDATE_FILTERS) {
    let { name, value } = action.payload;

    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        price: state.filters.max_price,
        text: "",
        category: "all",
        company: "all",
        color: "all",
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
