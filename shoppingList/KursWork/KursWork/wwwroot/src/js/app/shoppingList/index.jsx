import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import $ from "jquery";
//
import SortPurchases from "./sortPurchases.jsx";
import FiltersPurchases from "./filtersPurchases.jsx";
import Purchases from "./Purchases/index.jsx";
import reducers from "../../stores/storeWithShoppingList/index.jsx";
import AddPurchase from "./addPurchase.jsx";
import Cross from "../../svg/cross.jsx";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    if (props.lists === undefined) props.lists = []
    this.store = createStore(
      reducers,
      {
        "purchases": {
          "allPurchases": [...props.lists],
          "filteredPurchases": [...props.lists]
        },
        "filterPurchases": { sortingID: 0 }
      }
    );
    this.index;
  }

  render() {
    this.indexInitialization(this);
    return (
      <li className="app">
        <div className="title-list">
          {this.props.title}
          <div
            className="remove-list remove"
            onClick={this.animatedRemoveList.bind(this)}
          >
            <Cross />
          </div>
        </div>
        <div className="list">
          <Provider store={this.store}>
            <SortPurchases index={this.index} />
            <FiltersPurchases index={this.index} />
            <Purchases index={this.index} idList={this.props.id} />
            <AddPurchase index={this.index} idList={this.props.id} />
          </Provider>
        </div>
      </li>
    );
  }
  // Узнать индекс листа
  indexInitialization(e) {
    let { id } = e.props;
    e.props.shoppingLists.forEach((e, i) => {
      if (e.props.id === id) this.index = i;
    });
  }
  // Компонент появился
  componentDidMount() {
    this.animateAddList();
  }
  // Анимация добавления
  animateAddList() {
    $(`.app:eq(${this.index})`).slideDown({ duration: 400, queue: false });
    $(`.app:eq(${this.index})`).animate(
      { opacity: 1 },
      { duration: 600, queue: false }
    );
  }
  // Анимация при удалении
  animatedRemoveList() {
    let { dispatch, id } = this.props;
    $(`.app:eq(${this.index})`).animate(
      { opacity: 0 },
      { duration: 400, queue: false }
    );
    $(`.app:eq(${this.index})`).slideUp({
      duration: 600,
      queue: false,
      done: () => {
        dispatch({ type: "REMOVE_LIST", id });
      }
    });
  }
}

export default connect(shoppingLists => ({
  shoppingLists: shoppingLists
}))(ShoppingList);
