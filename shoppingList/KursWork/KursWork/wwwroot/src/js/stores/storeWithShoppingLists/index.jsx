import { synchronize, outSynchronize, getData } from "../storesService.jsx";
//synchronize\outSynchronize --- методы которые изменяют значек состояния
//getData --- получение данных с локального хранилища (используется для взаимодействия со сервером)


// reducer

export default function shoppingLists(state = [], action) {
  switch (action.type) {
    // изменение состояния добавления листа
    case "ADD_LIST": {
      outSynchronize();
      let data = [action.newShoppingList, ...state];
      getData().addList(action.newShoppingList.props.id, action.newShoppingList.props.title, action.newShoppingList.props.keyy);
      return data;
    }
    // состояние удаления листа
    case "REMOVE_LIST": {
      outSynchronize();
      getData().deleteList(action.id);
      return state.filter(e => {
        return e.props.id !== action.id;
      });
    }
    // состояние загрузки данных с сервера
    case "LOAD_DATA_FROM_SERVER": {
      synchronize();
      state = action.e;
      return state;
    }
    // состояние загрузки данных на сервер
    case "LOAD_DATA_TO_SERVER": {
      synchronize();
      return state;
    }
    // состояние удаления данных с сервера
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