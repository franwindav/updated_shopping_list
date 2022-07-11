namespace KursWork.Models
{
    // Статический класс для работы с базой данных
    // реализует паттерн синглтон
    public static class AccessDatabase
    {
        // база данных
        private static DataBase _dataBase;
        // заблокировнный ли объект
        static private object __lock;
        static AccessDatabase()
        {
            _dataBase = new DataBase();
            __lock = new object();

        }
        // функция копирования элементов из лдного листа в другой
        public static List<ListProducts> copyList(List<ListProducts> list)
        {
                List<ListProducts> newList = new List<ListProducts>();
                for (int i = 0; i < list.Count; i++)
                {
                    ListProducts tmp = new ListProducts();
                    tmp.title = list[i].title;
                    tmp.id = list[i].id;
                    tmp.key = list[i].key;
                    tmp.products = new List<Product>();
                    for (int j = 0; j < list[i].products.Count; j++)
                    {
                        Product product = new Product();
                        product.about = list[i].products[j].about;
                        product.id = list[i].products[j].id;
                        product.numberRatings = list[i].products[j].numberRatings;
                        product.percentDiscount = list[i].products[j].percentDiscount;
                        product.price = list[i].products[j].price;
                        product.priceDiscount = list[i].products[j].priceDiscount;
                        product.rating = list[i].products[j].rating;
                        product.specialOffers = new SpecialOffers(list[i].products[j].specialOffers.isUrgency, list[i].products[j].specialOffers.isDiscount, list[i].products[j].specialOffers.isNew, list[i].products[j].specialOffers.isRead);
                        product.title = list[i].products[j].title;
                        tmp.products.Add(product);
                    }
                    newList.Add(tmp);
                }
                return newList;
      
        }
        // Скопировать лист в базу данных
        public static void copyListToDataBase(List<ListProducts> list)
        {
            lock (__lock)
            {
                List<ListProducts> tmp = copyList(list);
                _dataBase = new DataBase();
                _dataBase.update(tmp);
            }
        }
        // получить базу данных в виде листа
        public static List<ListProducts> getList()
        {
            lock (__lock)
            {
                List<ListProducts> l = _dataBase.get();
                return copyList(l);
            }
        }
        // удалить базу данных
        public static void RemoveDataBase()
        {
            lock (__lock)
            {
                _dataBase = new DataBase();
            }
        }
    }
    // Основной класс базы данных
    class DataBase
    {
        private List<ListProducts> _products;
        
        public DataBase()
        {
            _products = new List<ListProducts>();
        }
        // выгрузить базу данных
        public List<ListProducts> get()
        {
            return _products;
        }
        // добавление элемента
        public void add(ListProducts list)
        {
            _products.Add(list);
        }
        // обновление бызы данных
        public void update(List<ListProducts> list)
        {
            _products = list;
        }

    }
}
