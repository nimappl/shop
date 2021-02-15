using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TestBackend.DTOs;
using TestBackend.Models;

namespace TestBackend.Services
{
    public class ProductService : IProductService
    {
        private readonly ShopContext _context;
        public ProductService(ShopContext context)
        {
            _context = context;
        }
        public async Task AddProduct(ProductDTO category)
        {
            throw new System.NotImplementedException();
        }

        public bool ProductExists(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task DeleteProduct(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<GridData<ProductDTO>> Get()
        {
            var products = new GridData<ProductDTO>();
            products.Data = await _context.Products.Select(p => (DTOConvert.ProductModelToDTO(p))).ToListAsync();
            return products;
        }

        public async Task<ProductDTO> GetById(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<int> Save()
        {
            throw new System.NotImplementedException();
        }

        public async Task UpdateProduct(int id, ProductDTO category)
        {
            throw new System.NotImplementedException();
        }
    }
}