const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors(
    origin: '*',
));

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data || [];
        
        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        
        // Find the highest lowercase alphabet
        const lowercaseAlphabets = alphabets.filter(ch => ch === ch.toLowerCase());
        const highestLowercase = lowercaseAlphabets.length ? Math.max(...lowercaseAlphabets.map(ch => ch.charCodeAt(0))) : null;
        
        const response = {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercase ? [String.fromCharCode(highestLowercase)] : []
        };

        res.json(response);
    } catch (error) {
        res.status(400).json({ is_success: false, message: error.message });
    }
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
