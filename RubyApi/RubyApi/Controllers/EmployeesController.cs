using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RubyApi.DAL;
using RubyApi.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace RubyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDBContext _appDBContext;

        public EmployeesController(AppDBContext appDBContext)
        {
            _appDBContext = appDBContext;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Employee employee)
        {
            await _appDBContext.Employees.AddAsync(employee);
            await _appDBContext.SaveChangesAsync();

            return Ok("Employee elave olundu");
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var datas = await _appDBContext.Employees.ToListAsync();
            if (datas == null) return NotFound();
            return Ok(datas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var data = await _appDBContext.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if (data == null) return NotFound();
            return Ok(data);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id) 
        {
            var data = await _appDBContext.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if (data == null) return NotFound();
            _appDBContext.Employees.Remove(data);
            await _appDBContext.SaveChangesAsync();
            return Ok("Employee Silindi");
        }

        [HttpPut]
        public async Task<IActionResult> Update(int id, Employee newEmployee)
        {
            var data = await _appDBContext.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if (data == null) return NotFound();
            data.FullName = newEmployee.FullName;
            data.Salary = newEmployee.Salary;
            data.Age = newEmployee.Age;
            await _appDBContext.SaveChangesAsync();
            return Ok("Employee update olundu");
        }




    }
}
