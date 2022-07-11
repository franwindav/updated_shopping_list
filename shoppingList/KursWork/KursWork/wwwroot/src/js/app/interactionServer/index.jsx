import React, { Component } from "react";
import { connect } from "react-redux";

import ShoppingList from "../shoppingList/index.jsx"
import { getData } from "../../stores/storesService.jsx";
import Synchronization from "../../svg/synchronization.jsx"
import evalEnv from "node-less/lib/evalEnv";

// Компонента отвечающая за панель взаимодействия 
// с сервером, а также делающая запросы к серверу
class InteractionServer extends Component {
  render() {
    return (
      <section className="controlServer">
        <ul
          className="listControlServer"
        >
          <li>
            <button
              onClick={() => {
                this.loadDataFromServer();
              }}
              className="loadDataFromServer"
            >
              Загрузить данные с сервера
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                this.loadDataToServer();
              }}
              className="loadDataToServer"
            >
              Загрузить данные на сервер
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                this.deleteAllDataInServer();
              }}
              className="deleteAllDataInServer"
            >
              Удалить все на сервере и на клиенте
            </button>
          </li>
        </ul>

        <ul
          className="listIndicationServer"
        >
          <li className="liSynchronization">
            <div class >
              <Synchronization />
            </div>
          </li>
        </ul>

      </section>
    );
  }
  // Метод делающий запрос на сервер для запроса данных, а также 
  //вызывает перестраивание всего дерева react приложения
  loadDataFromServer() {
    jQuery.ajax({
      'type': 'GET',
      'url': '/api/ProductsLists',
      'error': () => {
        alert("Any error!");
      },
      'success': (e) => {
        e = JSON.parse(e);
        let state = []
        getData().clear()
        for (let i = 0; i < e.length; i++) {
          e[i].key = new Date().getTime() + i * 10;
          let products = [];
          e[i].products.forEach((v, j) => {
            products[j] = { id: v.id, title: v.title, rating: v.rating, numberRatings: v.numberRatings, price: v.price, percentDiscount: v.percentDiscount, priceDiscount: v.priceDiscount, about: v.about, isUrgency: v.specialOffers.isUrgency, isDiscount: v.specialOffers.isDiscount, isNew: v.specialOffers.isNew, isRead: v.specialOffers.isRead }
          });
          state[i] = <ShoppingList id={e[i].id} key={e[i].key} keyy={e[i].key} index={i} title={e[i].title} lists={products} />
          getData().addList(e[i].id, e[i].title, e[i].key, products);
        }
        this.props.onLoadDataFromServer(state);
      }
    });
  }
  // Метод делающий запрос на сервер для отправки данных, а также 
  //вызывает перестраивание всего дерева react приложения
  loadDataToServer() {
    let list = getData().res;
    jQuery.ajax({
      'type': 'POST',
      'url': '/api/ProductsLists',
      'contentType': 'application/json',
      'data': JSON.stringify(list),
      'dataType': 'json',
      'error': () => {
        alert("Any error!");
      },
      'success': () => {
        this.props.onLoadDataToServer();
      }
    });
  }
  // Метод делающий запрос на сервер для удаления данных на сервере, а также 
  //вызывает перестраивание всего дерева react приложения
  deleteAllDataInServer() {
    jQuery.ajax({
      'type': 'DELETE',
      'url': '/api/ProductsLists/-1',
      'error': () => {
        alert("Any error!");
      },
      'success': () => {
        this.props.onDeleteAllDataInServer();
      }
    });
  }


}

// обеспечивает взаимосвязь с store
export default connect(
  null,
  dispatch => ({
    onLoadDataFromServer: (e) => {
      dispatch({ type: "LOAD_DATA_FROM_SERVER", e });
    },
    onLoadDataToServer: () => {
      dispatch({ type: "LOAD_DATA_TO_SERVER" });
    },
    onDeleteAllDataInServer: () => {
      dispatch({ type: "DELETE_DATA_TO_SERVER" });
    }
  })
)(InteractionServer);
