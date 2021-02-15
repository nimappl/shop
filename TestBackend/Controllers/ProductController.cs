using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestBackend.Models;
using TestBackend.DTOs;
using TestBackend.Services;

namespace TestBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductController(IProductService service)
        {
            _service = service;
        }

        // GET: api/ProductList
        [HttpGet]
        public async Task<ActionResult<GridData<ProductDTO>>> GetProducts()
        {
            return await _service.Get();
        }

        // GET: api/ProductList/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetProduct(int id)
        {
            var product = await _service.GetById(id);
            
            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Product/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductDTO dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            await _service.UpdateProduct(id, dto);

            try
            {
                await _service.Save();
            }
            catch (DbUpdateConcurrencyException) when (!_service.ProductExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Product
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(ProductDTO dto)
        {
            _service.AddProduct(dto);
            await _service.Save();

            // return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
            return NoContent();
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            await _service.DeleteProduct(id);
            await _service.Save();

            return NoContent();
        }
    }
}