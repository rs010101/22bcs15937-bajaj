const express = require('express');
const app = express();
app.use(express.json());

const USER_ID = "radhika_s01";
const EMAIL = "radhika01singhal04@gmail.com";
const ROLL_NUMBER = "22bcs15937";

app.get('/bfhl', (req, res) => {
  return res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
  try {
    if (!req.body || !req.body.data || !Array.isArray(req.body.data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid request. 'data' field must be an array."
      });
    }

    const inputData = req.body.data;
    const numbers = [];
    const alphabets = [];

    inputData.forEach(item => {
      const strItem = String(item);
      if (/^\d+$/.test(strItem)) {
        numbers.push(strItem);
      }
      else if (/^[a-zA-Z]$/.test(strItem)) {
        alphabets.push(strItem);
      }
    });

    let highest_alphabet = [];
    if (alphabets.length > 0) {
      const highest = alphabets.reduce((prev, curr) =>
        prev.toLowerCase() > curr.toLowerCase() ? prev : curr
      );
      highest_alphabet.push(highest);
    }

    const response = {
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      is_success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});