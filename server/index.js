const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
// 使用cors中间件
app.use(cors({ origin: "*" }));
const port = 3000;

app.post("/chatStream", async (request, response) => {
  console.log(request.body);
  // 设置返回的响应头为流式传输
  response.setHeader("Content-type", "application/octet-stream");

  const stream = fs.createReadStream(path.join(__dirname, "../dist.zip"));
  stream.on("data", (res) => {
    console.log("data", res);
  });
  stream.on("end", (res) => {
    console.log("读取完成！！");
  });
  stream.pipe(response);

  // const data = "你好啊";
  // let count = 11;
  // const interval = setInterval(() => {
  //   if (count > 0) {
  //     response.write(data);
  //     count--;
  //   } else {
  //     response.end();
  //     count = 11;
  //   }
  // }, 3000);
});

app.post("/text", (req, res) => {
  res.end("11111");
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
