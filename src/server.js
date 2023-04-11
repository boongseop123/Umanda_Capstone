const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.post("/register", (req, res) => {
  const { username, password, password1, name, birthdate, gender } = req.body;

  console.log(req.body);

  res.send("회원가입이 완료되었습니다.");
});

app.listen(5000, () => {
  console.log("서버가 시작되었습니다.");
});
