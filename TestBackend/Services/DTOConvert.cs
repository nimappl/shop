using TestBackend.Models;
using TestBackend.DTOs;

namespace TestBackend.Services
{
    public static class DTOConvert
    {
        public static CategoryDTO CategoryModelToDTO(Category category) =>
            new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                Active = category.Active
            };
        
        public static Category CategoryDTOToModel(CategoryDTO dto) =>
            new Category
            {
                Id = dto.Id,
                Name = dto.Name,
                Active = dto.Active
            };

        public static ProductDTO ProductModelToDTO(Product product) =>
            new ProductDTO
            {
                Id = product.Id,
                Name = product.Name,
                Brand = product.Brand,
                Price = product.Price,
                Stock = product.Stock,
                CategoryId = product.CategoryId,
                Active = product.Active
            };

        public static Product ProductDTOToModel(ProductDTO dto) =>
            new Product
            {
                Id = dto.Id,
                Name = dto.Name,
                Brand = dto.Brand,
                Price = dto.Price,
                Stock = dto.Stock,
                CategoryId = dto.CategoryId,
                Active = dto.Active
            };
    }
}