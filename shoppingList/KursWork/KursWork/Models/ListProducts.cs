namespace KursWork.Models
{
    // Класс который содержит данные списка а также елементы этого списка
    public class ListProducts
    {
        public ListProducts() {
            id = 0;
            title = "";
            products = new List<Product>();
        }
        public ListProducts(int i, string s, int k, List<Product> P)
        {
            id = i;
            key = k;
            title = s;
            products = P;
        }
        // Необходим для оптимизации react дурева
        public long key { get; set; }
        // Индитификатор объекта
        public long id { get; set; }
        // название списка
        public string title { get; set; }
        // продукты списка
        public List<Product> products { get; set; }
    }
}
