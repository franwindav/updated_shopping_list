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
          <InteractionServer key={"InteractionServer"}/>
          <ShoppingLists />
      </Provider>
    );
  }
  animation()
  {
    let inputCreateList = $(".inputCreateList");
    $(".hat").offset({left: inputCreateList.offset().left + 10, top: inputCreateList.offset().top - 38})
    let controlPanel = $(".controlServer");
    $(".FirstBalls").offset({top: controlPanel.offset().top + 76, left: controlPanel.offset().left + 10})
    $(".FirstBalls").width(40 * Math.floor((controlPanel.width()+ 35 )/40))
  }
  componentDidMount()
  {
    this.animation()
  }
  componentDidUpdate()
  {
    this.animation()
  }
}

export default App;
