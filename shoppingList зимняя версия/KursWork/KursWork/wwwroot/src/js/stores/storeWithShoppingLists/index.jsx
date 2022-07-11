import {synchronize, outSynchronize, getData} from "../storesService.jsx";

// reducer --- ���������� ��������� ���������

export default function shoppingLists(state = [], action) {
  switch (action.type) {
    case "ADD_LIST": {
      outSynchronize();
      let data = [action.newShoppingList, ...state];
      console.log("ADD_LIST", action.newShoppingList.props)
      getData().addList(action.newShoppingList.props.id, action.newShoppingList.props.title, action.newShoppingList.props.keyy);
      return data;
    }
    case "REMOVE_LIST": {
      outSynchronize();
      getData().deleteList(action.id);
      return state.filter(e => {
        return e.props.id !== action.id;
      });
    }
    case "LOAD_DATA_FROM_SERVER": {
      synchronize();
      state = action.e;
      return state;
    }
    case "LOAD_DATA_TO_SERVER": {
      synchronize();
      return state;
    }
    case "DELETE_DATA_TO_SERVER": {
      synchronize();
      getData().clear();
      return [];
    }
    default: {
      return state;
    }
  }
}