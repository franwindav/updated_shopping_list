import "jquery";
export function synchronize() { $(".synchronization").removeClass("false"); }

export function outSynchronize() { $(".synchronization").addClass("false"); }

// класс который содержит данные необходимые для связи с сервером

class Data{
    constructor()
    {
        this.clear();
    }
    clear()
    {
        this.res = [];
        this.cnt = 0;
        this.cntLists = [];
    }
    // добавить данные списка
    addList(id, title, key, products = []) {
        // из чего должен состоять list
        this.res[this.cnt] = { id, title, key, products: [] }
        // говорим что пока у нас кол-во эл-ов 0
        this.cntLists[this.cnt] = 0;
        // Запускаем добавление элементов (чтобы было копироваие)
        products.forEach(e => { this.addProduct(id, e.id, e.title, e.rating, e.numberRatings, e.price, e.percentDiscount, e.priceDiscount,
            e.about, e.isUrgency, e.isDiscount, e.isNew, e.isRead);
        });
        // кол-во листов увеличиваем
        this.cnt++;
        console.log("add_list to data", this.res);
    }
    // добавить элемент списка
    addProduct(index, id, title, rating, numberRatings, price, percentDiscount, priceDiscount, about, isUrgency, isDiscount, isNew, isRead=false) 
    {
        this.res.forEach((v, i) =>{
            if(v.id === index){
                this.res[i].products[this.cntLists[i]] = { id, title, rating, numberRatings, price, percentDiscount, priceDiscount, about, specialOffers: { isUrgency, isDiscount, isNew, isRead }};
                this.cntLists[i]++;
            }
        });

    }
    // помечает продукт как выбранный
    readProduct(index, id)
    {
        this.res.forEach((v, i) =>{
            if(v.id === index)
                this.res[i].products.forEach((e, j) => {
                    if(e.id === id)
                        this.res[i].products[j].specialOffers.isRead = !this.res[i].products[j].specialOffers.isRead;
                });
        });
        console.log("Read", this.res);
    }
    // удалить все списки на сервере и на клиенте
    deleteList(id)
    {
        this.res = this.res.filter((e, i) => {
            if (e.id === id)
                this.cntLists.filter((ee, ii) => { return ii !== i })
            return e.id !== id;
        });
        this.cnt--;
    }
    // удалить отдельный элемент списка
    deleteProduct(index, id)
    {
        this.res.forEach((v, i) =>{
            if(v.id === index){
                this.res[i].products = this.res[i].products.filter(e => { return e.id !== id; });
                this.cntLists[i]--;
            }
        });

    }
}

const data = new Data();
export function getData() {return data};
