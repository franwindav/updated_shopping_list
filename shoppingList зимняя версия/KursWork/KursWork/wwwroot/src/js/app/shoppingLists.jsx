import React, { Component } from "react";
import { connect } from "react-redux";

import CreateNewShoppingList from "./createNewShoppingList.jsx";

// Компонента являющаяся контейнером для всех списков
class ShoppingLists extends Component {
  render() {
    return (
      <section>
        <CreateNewShoppingList key={"CreateNewShoppingList"} />
        <ul key="ul">{this.props.shoppingLists}</ul>
      </section>
    );
  }
}

// Взаимосвязь со store позволяет получать данные
export default connect(
  shoppingLists => ({
  shoppingLists: shoppingLists
}),
dispatch => ({
  onAddNewShoppingList: newShoppingLists => {
    dispatch({ type: "ADD_LISTS", newShoppingLists });
  }
})
)(ShoppingLists);
