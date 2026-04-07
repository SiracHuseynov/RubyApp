using Microsoft.EntityFrameworkCore;
using RubyApi.Models;

namespace RubyApi.DAL
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
         
    }
}
