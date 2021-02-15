using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestBackend.Models;
using TestBackend.DTOs;
using TestBackend.Services;

namespace TestBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoryController(ICategoryService service)
        {
            _service = service;
        }

        // GET: api/CategoryList
        [HttpGet]
        public async Task<ActionResult<GridData<CategoryDTO>>> GetCategories()
        {
            // return await _context.Categories.Select(x => ConvertToDTO(x)).ToListAsync();
            return await _service.Get();
        }

        // GET: api/CategoryList/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>> GetCategory(int id)
        {
            var category = await _service.GetById(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Category/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, CategoryDTO categoryDTO)
        {
            if (id != categoryDTO.Id)
            {
                return BadRequest();
            }

            await _service.UpdateCategory(id, categoryDTO);

            try
            {
                await _service.Save();
            }
            catch (DbUpdateConcurrencyException) when (!_service.CategoryExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Category
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory(CategoryDTO categoryDTO)
        {
            _service.AddCategory(categoryDTO);
            await _service.Save();

            // return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
            return NoContent();
        }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategory(int id)
        {
            await _service.DeleteCategory(id);
            await _service.Save();

            return NoContent();
        }
    }
}