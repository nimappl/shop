using System.Threading.Tasks;
using TestBackend.DTOs;

namespace TestBackend.Services
{
    public interface IProductService
    {
        Task<ProductDTO> GetById(int id);
        Task<GridData<ProductDTO>> Get();
        void AddProduct(ProductDTO category);
        Task UpdateProduct(int id, ProductDTO category);
        Task DeleteProduct(int id);
        bool ProductExists(int id);
        Task<int> Save();
    }
}