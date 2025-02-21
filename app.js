const express = require('express');
const app = express();

app.use(express.json());

const user_id = "john_doe_17091999";
const email = "john@xyz.com";
const roll_no = "ABCD123";

app.post('/bfhl', (req, res) => {
  try{
    if(!req.body || !req.body.data || !Array.isArray(req.body.data)){
      return res.status(400).json({
        is_sucess: false,
        message: "Invalid"
      });
    }
    const data = req.body.data;
    const num = [];
    const alph = [];

    data.forEach(item => {
      const strItem = String(item);
      if(/^\d+$/.test(strItem)){
        num.push(strItem);
      }else if(/^[a-zA-Z]$/.test(strItem)){
        alph.push(strItem);
      }
    });

    let hAlph = [];
    if(alph.length > 0){
      const high = alph.reduce((prev, curr) =>
        prev.toLowerCase() > curr.toLowerCase() ? prev : curr
      );
      hAlph.push(high);
    }
    const response = {
      is_success: true,
      user_id: user_id,
      email: email,
      roll_number: roll_no,
      numbers: num,
      alphabets: alph,
      highest_alphabet: hAlph
    };
    return res.status(200).json(response);
  } catch(error){
    return res.status(500).json({
      is_success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
})