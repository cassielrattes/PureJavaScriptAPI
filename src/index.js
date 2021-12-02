const http = require("http");

const PORT = 3000;
const DEFAULT_HEADER = { "Content-Type": "application/json" };

const ArchiveFactory = require("./factories/archiveFactory");
const archiveService = ArchiveFactory.generateInstance();
const Archive = require("./entities/archive");

const handleError = (response) => {
  return (error) => {
    console.error("Deu ruim!***", error);
    response.writeHead(500, DEFAULT_HEADER);
    response.write(JSON.stringify({ error: "Internal Server Error!!!" }));
    return response.end();
  };
};

const routes = {
  "/archives:get": async (request, response) => {
    try {
      const { id } = request.queryString;
      const archives = await archiveService.find(id);
      response.write(JSON.stringify({ results: archives }));
      return response.end();
    } catch (error) {
      return handleError(response)(error);
    }
  },
  "/archives:post": async (request, response) => {
    for await (const data of request) {
      try {
        const item = JSON.parse(data);
        const archive = new Archive(item);
        const { error, valid } = archive.isValid();
        if (!valid) {
          response.writeHead(400, DEFAULT_HEADER);
          response.write(JSON.stringify({ error: error.join(",") }));
          return response.end();
        }
        const id = await archiveService.create(archive);
        response.writeHead(201, DEFAULT_HEADER);
        response.write(
          JSON.stringify({ success: "User Created with success!!", id })
        );
        return response.end();
      } catch (error) {
        return handleError(response)(error);
      }
    }
  },
  default: (request, response) => {
    response.write("Hello!");
    response.end();
  },
};

const handler = (request, response) => {
  const { url, method } = request;
  const [first, route, id] = url.split("/");
  request.queryString = { id: isNaN(id) ? id : Number(id) };
  const key = `/${route}:${method.toLowerCase()}`;
  response.writeHead(200, DEFAULT_HEADER);

  const chosen = routes[key] || routes.default;
  return chosen(request, response);
};

http
  .createServer(handler)
  .listen(PORT, () => console.log("Running on port", PORT));
