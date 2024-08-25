import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [inputData, setInputData] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleInputChange = (e) => {
        setInputData(e.target.value);
    };

    const handleFormSubmit = async () => {
        try {
            const jsonData = JSON.parse(inputData);
            const res = await axios.post('https://bajaj-pink-sigma.vercel.app/bfhl', jsonData);
            setResponse(res.data);
        } catch (error) {
            console.error("Invalid JSON or error in API call:", error);
        }
    };

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedOptions(
            e.target.checked ? [...selectedOptions, value] : selectedOptions.filter(item => item !== value)
        );
    };

    useEffect(() => {
        document.title = "ABCD123"; // Replace with your roll number
    }, []);

    return (
        <div>
            <h1>Frontend Interface</h1>
            <input type="text" value={inputData} onChange={handleInputChange} placeholder="Enter JSON" />
            <button onClick={handleFormSubmit}>Submit</button>

            <div>
                <label>
                    <input type="checkbox" value="alphabets" onChange={handleOptionChange} /> Alphabets
                </label>
                <label>
                    <input type="checkbox" value="numbers" onChange={handleOptionChange} /> Numbers
                </label>
                <label>
                    <input type="checkbox" value="highest_lowercase_alphabet" onChange={handleOptionChange} /> Highest Lowercase Alphabet
                </label>
            </div>

            {response && (
                <div>
                    <h2>Response:</h2>
                    <div>
                        {selectedOptions.includes("alphabets") && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                        {selectedOptions.includes("numbers") && <p>Numbers: {response.numbers.join(', ')}</p>}
                        {selectedOptions.includes("highest_lowercase_alphabet") && <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
