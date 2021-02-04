using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TestBackend.Models
{
    public partial class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public int? Category { get; set; }
        public long? Price { get; set; }
        public int? Stock { get; set; }
        public bool Active { get; set; }
        public DateTime? Cdate { get; set; }
        public int? CuserId { get; set; }
        public DateTime? Mdate { get; set; }
        public int? MuserId { get; set; }
        public DateTime? Ddate { get; set; }
        public int? DuserId { get; set; }
        public DateTime? DaDate { get; set; }
        public int? DaUserId { get; set; }

        public virtual Category CategoryNavigation { get; set; }
    }
}
