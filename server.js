const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Enable CORS
app.use(cors());

// Proxy endpoint for Piston API
app.post('/piston/execute', async (req, res) => {
  const { language, version, files } = req.body;

  try {
    const response = await axios.post('https://emkc.org/api/v1/piston/execute', {
      language,
      version,
      files,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing the files.' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
