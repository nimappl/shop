using System.Collections.Generic;

namespace TestBackend.DTOs
{
    public class GridData<T>
    {
        public List<T> Data { get; set; }
        public int Count { get; set; } = 0;
    }
}