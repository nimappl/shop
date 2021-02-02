using Microsoft.EntityFrameworkCore;

namespace TestBackend.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

        public DbSet<TodoItem> TodoList { get; set; }
    }
}
