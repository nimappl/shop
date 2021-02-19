namespace TestBackend.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public long? Price { get; set; }
        public int? CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int? Stock { get; set; }
        public bool Active { get; set; }
    }
}