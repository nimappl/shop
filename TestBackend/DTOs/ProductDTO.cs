namespace TestBackend.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public int? Category { get; set; }
        public long? Price { get; set; }
        public int? Stock { get; set; }
        public bool Active { get; set; }
    }
}