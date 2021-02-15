using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TestBackend.DTOs;
using TestBackend.Models;

namespace TestBackend.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ShopContext _context;
        public CategoryService(ShopContext context)
        {
            _context = context;
        }
        
        public void AddCategory(CategoryDTO dto)
        {
            Category cat = DTOConvert.CategoryDTOToModel(dto);
            _context.Categories.AddAsync(cat);
        }

        public async Task DeleteCategory(int id)
        {
            var cat = await _context.Categories.FindAsync(id);
            _context.Categories.Remove(cat);
        }

        public async Task<GridData<CategoryDTO>> Get()
        {
            var data = new GridData<CategoryDTO>();
            data.Data = await _context.Categories.Select(x => DTOConvert.CategoryModelToDTO(x)).ToListAsync();
            
            return data;
        }

        public async Task<CategoryDTO> GetById(int id)
        {
            return DTOConvert.CategoryModelToDTO(await _context.Categories.FindAsync(id));
        }

        public async Task UpdateCategory(int id, CategoryDTO dto)
        {
            Category cat = await _context.Categories.FindAsync(id);
            cat.Id = dto.Id;
            cat.Name = dto.Name;
            cat.Active = dto.Active;
        }

        public bool CategoryExists(int id)
        {
            return _context.Categories.Any(c => c.Id == id);
        }

        public async Task<int> Save()
        {
            return await _context.SaveChangesAsync();
        }
    }
}