import { outSynchronize, getData } from "../../storesService.jsx";

// reducer --- обработсик изменений состояний

const sortOrder = ["isDiscount", "isUrgency", "isNew"];
export default function purchases(state = { allPurchases: [], filteredPurchases: [] }, action) {
  //
  const sortingPurchases = (purchases, filterPurchases) =>
    purchases.sort((a, b) => {
      var price = ["price", "price"];
      if (a.isDiscount) price[0] = "priceDiscount";
      if (b.isDiscount) price[1] = "priceDiscount";
      switch (filterPurchases.sortingID) {
        case 0: {
          return a[price[0]] > b[price[1]] ? 1 : -1;
        }
        case 1: {
          return a[price[0]] < b[price[1]] ? 1 : -1;
        }
        case 2: {
          return a["rating"] < b["rating"] ? 1 : -1;
        }
      }
    });
  //
  const filterPurchases = (data, filters) => {
    let purchases =
      filters["price"] !== undefined
        ? data.filter(e => {
          return e["isDiscount"]
            ? e["priceDiscount"] >= filters["price"][0] &&
            e["priceDiscount"] <= filters["price"][1]
            : e["price"] >= filters["price"][0] &&
            e["price"] <= filters["price"][1];
        })
        : data.slice();
    for (let i = 0; i < sortOrder.length; i++) {
      if (filters[sortOrder[i]] !== undefined && filters[sortOrder[i]].length)
        purchases = purchases.filter(e => {
          for (let j = 0; j < filters[sortOrder[i]].length; j++) {
            if (filters[sortOrder[i]][j] == e[sortOrder[i]]) return true;
          }
          return false;
        });
    }
    return purchases;
  };
  switch (action.type) {
    case "READ_PRODUCT": {
      outSynchronize();
      getData().readProduct(action.idList, action.id);
      state.allPurchases.filter((v, j) => {
        if (v.id === action.id)
          state.allPurchases[j].isRead = !state.allPurchases[j].isRead;
      });
      return state;
    }

    case "ADD_PRODUCT":
      {
        outSynchronize();
        let tmp = action.newPurchase;
        getData().addProduct(tmp.index, tmp.id, tmp.title, tmp.rating, tmp.numberRatings,
          tmp.price, tmp.percentageDiscount, tmp.priceDiscount, tmp.about, tmp.isUrgency, tmp.isDiscount, tmp.isNew);
        let allPurchases = [
          action.newPurchase,
          ...state.allPurchases
        ];
        allPurchases = sortingPurchases(allPurchases, action.filterPurchases);
        let filteredPurchases = allPurchases.slice();
        filteredPurchases = filterPurchases(
          filteredPurchases,
          action.filterPurchases
        );
        return { allPurchases, filteredPurchases };
      }
    case "REMOVE_PRODUCT": {
      outSynchronize();
      getData().deleteProduct(action.idList, action.id)
      let filteredPurchases = state.filteredPurchases.filter(e => {
        return e.id != action.id;
      });
      let allPurchases = state.allPurchases.filter(e => {
        return e.id != action.id;
      });
      return { allPurchases, filteredPurchases };
    }
    case "CHANGE_PRODUCT_POSITION": {
      let allPurchases = [...state.allPurchases];
      let filteredPurchases = action.list.slice();
      return { allPurchases, filteredPurchases };
    }
    case "CHANGE_SORTING": {
      let allPurchases = [...state.allPurchases];
      let filteredPurchases = [...state.filteredPurchases];
      filteredPurchases = sortingPurchases(
        filteredPurchases,
        action.filterPurchases
      );
      allPurchases = sortingPurchases(allPurchases, action.filterPurchases);
      return { allPurchases, filteredPurchases };
    }
    case "CHANGE_FILTERS": {
      let allPurchases = [...state.allPurchases];
      let filteredPurchases = allPurchases.slice();

      filteredPurchases = filterPurchases(filteredPurchases, action.filters);
      return { allPurchases, filteredPurchases };
    }
    case "CLEAR_FILTERS": {
      let allPurchases = [...state.allPurchases];
      let filteredPurchases = allPurchases.slice();
      return { allPurchases, filteredPurchases };
    }
    default: {
      return state;
    }
  }
}
