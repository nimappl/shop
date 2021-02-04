using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestBackend.Models;
using TestBackend.DTOs;

namespace TestBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ShopContext _context;

        public CategoryController(ShopContext context)
        {
            _context = context;
        }

        // GET: api/CategoryList
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Category.ToListAsync();
        }

        // GET: api/CategoryList/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(long id)
        {
            var todo = await _context.Category.FindAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            return todo;
        }

        // PUT: api/Category/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(long id, Category todo)
        {
            if (id != todo.Id)
            {
                return BadRequest();
            }

            _context.Entry(todo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Category
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory(Category todo)
        {
            _context.Category.Add(todo);
            await _context.SaveChangesAsync();

            // return CreatedAtAction("GetCategoryItem", new { id = todo.Id }, todo);
            return CreatedAtAction(nameof(GetCategory), new { id = todo.Id }, todo);
        }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategory(int id)
        {
            var todo = await _context.Category.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.Category.Remove(todo);
            await _context.SaveChangesAsync();

            return todo;
        }

        private bool CategoryExists(long id)
        {
            return _context.Category.Any(e => e.Id == id);
        }
    }
}
