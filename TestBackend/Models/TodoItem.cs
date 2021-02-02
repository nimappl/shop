using System.ComponentModel.DataAnnotations;

namespace TestBackend.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public bool IsComplete { get; set; }
    }
}
