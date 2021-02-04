using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace TestBackend.Models
{
    public partial class ShopContext : DbContext
    {
        public ShopContext()
        {
        }

        public ShopContext(DbContextOptions<ShopContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Todo> Todo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=Shop;Integrated Security=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Brand).HasMaxLength(100);

                entity.Property(e => e.Cdate)
                    .HasColumnName("CDate")
                    .HasColumnType("date");

                entity.Property(e => e.CuserId).HasColumnName("CUserID");

                entity.Property(e => e.DaDate).HasColumnType("date");

                entity.Property(e => e.DaUserId).HasColumnName("DaUserID");

                entity.Property(e => e.Ddate)
                    .HasColumnName("DDate")
                    .HasColumnType("date");

                entity.Property(e => e.DuserId).HasColumnName("DUserID");

                entity.Property(e => e.Mdate)
                    .HasColumnName("MDate")
                    .HasColumnType("date");

                entity.Property(e => e.MuserId).HasColumnName("MUserID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.CategoryNavigation)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.Category)
                    .HasConstraintName("FK_Product_Category");
            });

            modelBuilder.Entity<Todo>(entity =>
            {
                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
