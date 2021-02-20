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
            var products = await _context.Products.Where(p => p.CategoryId == id).ToListAsync();
            foreach (var p in products)
            {
                _context.Products.Remove(p);
            }
            _context.Categories.Remove(cat);
        }

        public async Task<GridData<CategoryDTO>> Get(GridData<CategoryDTO> queryParams)
        {
            var query = _context.Categories as IQueryable<Category>;
            int count;
            if (queryParams.Filters != null)
            {
                foreach (var filter in queryParams.Filters)
                {
                    if (filter.Key == "name")
                        query = query.Where(c => c.Name.Contains(filter.Value));
                }
            }

            count = await query.CountAsync();

            if (queryParams.SortBy == "id")
                query = query.OrderBy(c => c.Id );
            if (queryParams.SortBy == "name")
            {
                if (queryParams.SortType == SortType.Asc)
                    query = query.OrderBy(c => c.Name);
                else
                    query = query.OrderByDescending(c => c.Name);
            }

            query = query.Skip((queryParams.PageNumber - 1) * queryParams.PageSize).Take(queryParams.PageSize);
            
            return new GridData<CategoryDTO>
            {
                Data = await query.Select(c => DTOConvert.CategoryModelToDTO(c)).ToListAsync(),
                Filters = queryParams.Filters,
                SortBy = queryParams.SortBy,
                SortType = queryParams.SortType,
                PageSize = queryParams.PageSize,
                PageNumber = queryParams.PageNumber,
                Count = count
            };
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