const initialState = {
  sortingID: 0
};

// reducer --- обработсик изменений состояний

export default function filterProducts(state = initialState, action) {
  switch(action.type){
  case "CHANGE_FILTERS": 
  {
    return Object.assign({}, action.filters);
  }
   case "CHANGE_SORTING": 
   {
    let data = Object.assign({}, state);
    data.sortingID = action.filterPurchases.sortingID;
    return data;
  } 
  case "CLEAR_FILTERS":
    {
    return { sortingID: state.sortingID };
    }
  } 
  return state;
}
