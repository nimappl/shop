using System.Collections.Generic;
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
        public void AddProduct(ProductDTO dto)
        {
            Product product = DTOConvert.ProductDTOToModel(dto);
            _context.Add(product);
        }

        public async Task DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            _context.Products.Remove(product);
        }

        public async Task<GridData<ProductDTO>> Get()
        {
            // var products = new GridData<ProductDTO>();
            // products.Data = await _context.Products.Select(p => (DTOConvert.ProductModelToDTO(p))).ToListAsync();
            // return products;
            IQueryable<ProductDTO> query = 
                from p in _context.Products
                from c in _context.Categories
                where p.CategoryId == c.Id
                select new ProductDTO
                {
                    Id = p.Id,
                    Name = p.Name,
                    Brand = p.Brand,
                    Price = p.Price,
                    CategoryId = p.CategoryId,
                    CategoryName = c.Name,
                    Stock = p.Stock,
                    Active = p.Active
                };

                query.Where(a => a.Brand.Contains("اپل"));

            return new GridData<ProductDTO>
            {
                Data = await query.ToListAsync(),
            };
        }

        public async Task<ProductDTO> GetById(int id)
        {
            return await (
                from p in _context.Products
                from c in _context.Categories
                where p.CategoryId == c.Id
                select new ProductDTO
                {
                    Id = p.Id,
                    Name = p.Name,
                    Brand = p.Brand,
                    Price = p.Price,
                    CategoryId = p.CategoryId,
                    CategoryName = c.Name,
                    Stock = p.Stock,
                    Active = p.Active
                }).FirstOrDefaultAsync();
        }

        public async Task UpdateProduct(int id, ProductDTO dto)
        {
            Product product = await _context.Products.FindAsync(id);
            product.Id = dto.Id;
            product.Name = dto.Name;
            product.CategoryId = dto.CategoryId;
            product.Price = dto.Price;
            product.Stock = dto.Stock;
            product.Active = dto.Active;
        }

        public bool ProductExists(int id)
        {
            return _context.Products.Any(p => p.Id == id);
        }
        
        public async Task<int> Save()
        {
            return await _context.SaveChangesAsync();
        }
    }
}