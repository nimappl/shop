using System.Collections.Generic;
using System.Threading.Tasks;
using TestBackend.DTOs;

namespace TestBackend.Services
{
    public interface ICategoryService
    {
        Task<CategoryDTO> GetById(int id);
        Task<GridData<CategoryDTO>> Get();
        Task AddCategory(CategoryDTO category);
        Task UpdateCategory(int id, CategoryDTO category);
        Task DeleteCategory(int id);
        bool CategoryExists(int id);
        Task<int> Save();
    }
}