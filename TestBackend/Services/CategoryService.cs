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
        
        public async Task AddCategory(CategoryDTO category)
        {
            Category cat = DTOConvert.CategoryDTOToModel(category);
            _context.Categories.Add(cat);
        }

        public async Task DeleteCategory(int id)
        {
            var cat = await _context.Categories.FindAsync(id);
            _context.Categories.Remove(cat);
        }

        public async Task<IEnumerable<CategoryDTO>> Get()
        {
            return await _context.Categories.Select(x => DTOConvert.CategoryModelToDTO(x)).ToListAsync();
        }

        public async Task<CategoryDTO> GetById(int id)
        {
            var cat = await _context.Categories.FindAsync(id);
            return DTOConvert.CategoryModelToDTO(cat);
        }

        public async Task UpdateCategory(int id,CategoryDTO category)
        {
            var cat = await _context.Categories.FindAsync(id);
            cat = DTOConvert.CategoryDTOToModel(category)
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