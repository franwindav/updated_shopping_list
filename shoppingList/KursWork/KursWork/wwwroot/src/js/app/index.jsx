import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import ShoppingLists from "./shoppingLists.jsx";
import reducer from "../stores/storeWithShoppingLists/index.jsx";
import InteractionServer from "./interactionServer/index.jsx"

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// Создает первый store а также создает панель управления приложения сервером
// а также основную яасть приожения
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <InteractionServer key={"InteractionServer"} />
        <ShoppingLists />
      </Provider>
    );
  }
}

export default App;
