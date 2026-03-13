import { createStore } from "redux";

const products = [];

const productReducer = (state = products, action) => {
  const { type, payload } = action;

  switch (type) {
    case "add":
      return [...state, { id: payload.id, name: payload.name }];

    case "remove":
      return state.filter((product) => product.id !== payload.id);

    default:
      return state;
  }
};

const productStore = createStore(productReducer);

const addProduct = (id, name) => ({
  type: "add",
  payload: { id: id, name: name },
});

const removeProduct = (id) => ({
  type: "remove",
  payload: { id: id },
});

productStore.dispatch(addProduct(1, "Toffee"));
productStore.dispatch(addProduct(2, "Milk"));
productStore.dispatch(addProduct(3, "Rise"));
productStore.dispatch(addProduct(4, "Drink"));
productStore.dispatch(addProduct(5, "Lobster"));

productStore.dispatch(removeProduct(4));

console.log(productStore.getState());
