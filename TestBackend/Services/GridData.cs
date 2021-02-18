using System.Collections.Generic;

namespace TestBackend.Services
{
    public class GridData<T>
    {
        public List<T> Data { get; set; }
        public List<Filter> Filters { get; set; }
        public string SortBy { get; set; }
        public string SortType { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public int Count { get; set; }

    }
}

public class Filter
{
    public string Key { get; set; }
    public string Value { get; set; }
}

public enum SortType {
    Asc,
    Desc,
}