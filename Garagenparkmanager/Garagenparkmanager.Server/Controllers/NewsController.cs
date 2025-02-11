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

        //alle News laden
        [HttpGet("allNews")]
        public async Task<IActionResult> GetAllNews()
        {
            var results = await _newsRepository.GetAll();
            return Ok(results);
        }

        //einen News laden
        [HttpGet("news/{id}")]
        public async Task<IActionResult> GetNews(string id)
        {
            var results = await _newsRepository.GetNews(id);
            return Ok(results);
        }

        [HttpPut("updateNews")]
        public async Task<IActionResult> UpdateNews([FromBody] News news)
        {
            var results = await _newsRepository.UpdateNews(news);
            return Ok(results);
        }

        [HttpPost("addnews")]
        public async Task<IActionResult> AddNewNews([FromBody] News news)
        {
            if (news.title != "" && news.content != "")
            {
                news.Id = Guid.NewGuid().ToString();
                var result = await _newsRepository.CreateNews(news);
                return CreatedAtAction(nameof(GetAllNews), new { id = result.Id }, result);
            }
            else
            {
                return BadRequest("Fehler beim Erstellen der News");
            }
        }

        //News loeschen
        [HttpDelete("deleteNews/{id}")]
        public async Task<IActionResult> DeltetNews(string id)
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
