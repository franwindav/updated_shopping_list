namespace KursWork.Models
{
    // класс определяющий специальные предложения
    public class SpecialOffers
    {
        public SpecialOffers()
        {

        }
        public SpecialOffers(bool isUrgency, bool isDiscount, bool isNew, bool isRead)
        {
            this.isDiscount = isDiscount;
            this.isUrgency = isUrgency;
            this.isNew = isNew;
            this.isRead = isRead;
        }
        // срочное ли
        public bool isUrgency { get; set; } = false;
        // по скидке ли 
        public bool isDiscount { get; set; } = false;
        // новое ли
        public bool isNew { get; set; } = false;
        // помеченное ли
        public bool isRead { get; set; } = false;
    }
}
