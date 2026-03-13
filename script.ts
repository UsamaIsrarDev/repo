import { createStore } from "redux";

interface Product {
  id: number;
  name: string;
}

type Products = Product[];

interface AddProductAction {
  type: "add";
  payload: Product;
}

interface RemoveProductAction {
  type: "remove";
  payload: {
    id: number;
  };
}

type Action = AddProductAction | RemoveProductAction;

const products: Products = [];

const productReducer = (
  state: Products = products,
  action: Action,
): Products => {
  const { type, payload } = action;

  switch (type) {
    case "add":
      return [...state, payload];

    case "remove":
      return state.filter((product) => product.id !== payload.id);

    default:
      return state;
  }
};

const productStore = createStore(productReducer);

const addProduct = (id: number, name: string): AddProductAction => ({
  type: "add",
  payload: { id, name },
});

const removeProduct = (id: number): RemoveProductAction => ({
  type: "remove",
  payload: { id },
});

productStore.dispatch(addProduct(1, "Toffee"));
productStore.dispatch(addProduct(2, "Milk"));
productStore.dispatch(addProduct(3, "Rice"));
productStore.dispatch(addProduct(4, "Drink"));
productStore.dispatch(addProduct(5, "Lobster"));

productStore.dispatch(removeProduct(4));

console.log(productStore.getState());
