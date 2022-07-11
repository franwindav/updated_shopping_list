namespace KursWork.Models
{
    // класс определяющий вид продукта
    public class Product
    {
        public Product()
        {
            specialOffers = new SpecialOffers();
            title = "";
            about = "";
        }
        public long id { get; set; }
        // название продукта
        public string title { get; set; }
        // рейтинг продукта от 0 до 1
        public double rating { get; set; }
        // кол-во отзывов
        public long numberRatings { get; set; }
        // цена
        public long price { get; set; }
        // Кол-во процентов скидки
        public long percentDiscount { get; set; }
        // цена по скидке
        public long priceDiscount { get; set; }
        // описание
        public string about { get; set; }
        // специальные предложения
        public SpecialOffers specialOffers { get; set; }
        
    }
}
