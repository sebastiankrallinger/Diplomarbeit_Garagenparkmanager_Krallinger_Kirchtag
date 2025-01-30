using Garagenparkmanager.Server.Models;
using Garagenparkmanager.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Garagenparkmanager.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class NewsController : Controller
    {
        private readonly INewsRepository _newsRepository;
        private readonly IConfiguration _configuration;


        public NewsController(INewsRepository newsRepository, IConfiguration configuration)
        {
            _newsRepository = newsRepository;
            _configuration = configuration;
        }

        [HttpGet("news")]
        public async Task<IActionResult> GetAllNews()
        {
            var results = await _newsRepository.GetAll();
            return Ok(results);
        }

        [HttpGet("getNews/{id}")]
        public async Task<IActionResult> GetNews(string id)
        {
            var results = await _newsRepository.GetNews(id);
            return Ok(results);
        }

        [HttpPost("news")]
        public async Task<IActionResult> AddNewNews(Models.News news)
        {
            var result = await _newsRepository.CreateNews(news);
            return CreatedAtAction(nameof(GetAllNews), new { id = result.Id }, result);
        }

        [HttpDelete("deleteNews/{id}")]
        public async Task<IActionResult> DeleteNews(string id)
        {
            var news = _newsRepository.GetNews(id);
            var result = await _newsRepository.DeleteNews(news.Result.Id);
            if (result)
            {
                return NoContent();
            }
            return BadRequest();
        }
    }
}
