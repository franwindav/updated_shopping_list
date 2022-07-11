using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

// Файл API, который передает все данные с вида в модель и наоборот
// Выполняет такие функции, как обновление всего списка
// Удаление всех объектов
// Позволяет возвращать файлы

namespace KursWork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // API для работы с "БД"
    public class ProductsListsController : ControllerBase
    {
        // Возвращает данные
        [HttpGet]
        public string Get()
        {
            List<Models.ListProducts>  tmp = Models.AccessDatabase.getList();
            // необходимо именно таким способом возвращать данные, иначе будут побочки
            return JsonSerializer.Serialize(tmp.ToArray());
        }

        // Получает данные
        [HttpPost]
        public bool Post(List<Models.ListProducts> list)
        {
            Models.AccessDatabase.copyListToDataBase(list);
            // Вернем что-то чтобы выполнился блок success
            return true;
            
        }

        // Удаляет все данные
        // Исполльзуем через id, т.к. обычный delete запрещен
        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            if (id == -1)
            {
                Models.AccessDatabase.RemoveDataBase();
                return 200;
            }
            return -1;
        }
    }
}
