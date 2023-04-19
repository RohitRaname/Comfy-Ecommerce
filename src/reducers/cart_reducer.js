import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;

    const tempItem = state.cart.find((cart) => cart.id === id + color);
    if (tempItem) {
      // loop find cartItem
      // when find cal newAmount= cartAmount + selected amount
      // if newAmount > stock then set it to back to max (stock)

      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) newAmount = cartItem.max;
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });

      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };

      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  if (action.type === CLEAR_CART) return { ...state, cart: [] };

  if (action.type === COUNT_CART_TOTALS) {
    const total = state.cart.reduce(
      (prev, cur) => {
        prev.items = prev.items + cur.amount;
        prev.price = prev.price + cur.price * cur.amount;
        return prev;
      },
      { items: 0, price: 0 }
    );

    return {...state, total_items: total.items, total_amount: total.price };
  }

  if (action.type === REMOVE_CART_ITEM) {
    
    const newCart = state.cart.filter((item) => item.id !== action.payload.id);

    return { ...state, cart: newCart };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;

    const newCart = state.cart.map((cartItem) => {
      if (cartItem.id === id) {
        if (value === "inc") {
          const newAmount = cartItem.amount + 1;
          if (newAmount > cartItem.max) return cartItem;

          return { ...cartItem, amount: newAmount };
        }
        if (value === "dec") {
          const newAmount = cartItem.amount - 1;
          if (newAmount < 1) return cartItem;
          return { ...cartItem, amount: newAmount };
        }
      }

      return cartItem;
    });

    return { ...state, cart: newCart };
  }

  throw new Error(`No Matching "${action.type}" - action.type type`);
};

export default cart_reducer;
