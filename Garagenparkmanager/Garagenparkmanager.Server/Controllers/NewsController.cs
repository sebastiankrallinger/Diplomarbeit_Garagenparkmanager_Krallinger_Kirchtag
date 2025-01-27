using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Garagenparkmanager.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class NewsController : Controller
    {
        
    }
}
