using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestBackend.Models;

namespace TestBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ShopContext _context;

        public TodoController(ShopContext context)
        {
            _context = context;
        }

        // GET: api/TodoList
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodoItems()
        {
            return await _context.Todo.ToListAsync();
        }

        // GET: api/TodoList/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodoItem(long id)
        {
            var todo = await _context.Todo.FindAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            return todo;
        }

        // PUT: api/Todo/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, Todo todo)
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
                if (!TodoItemExists(id))
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

        // POST: api/Todo
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodoItem(Todo todo)
        {
            _context.Todo.Add(todo);
            await _context.SaveChangesAsync();

            // return CreatedAtAction("GetTodoItem", new { id = todo.Id }, todo);
            return CreatedAtAction(nameof(GetTodoItem), new { id = todo.Id }, todo);
        }

        // DELETE: api/Todo/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Todo>> DeleteTodoItem(int id)
        {
            var todo = await _context.Todo.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.Todo.Remove(todo);
            await _context.SaveChangesAsync();

            return todo;
        }

        private bool TodoItemExists(long id)
        {
            return _context.Todo.Any(e => e.Id == id);
        }
    }
}
