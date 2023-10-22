const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

// Allow all CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/proxy', async (req, res) => {
    const targetURL = req.query.url;

    if (!targetURL) {
        return res.status(400).send({ error: 'URL is required.' });
    }

    const headersToForward = {
        'Authorization': req.headers.authorization,
        'Content-Type': req.headers['content-type']
    };

    try {
        const response = await axios.get(targetURL, {
            headers: headersToForward,
            maxRedirects: 10 // this ensures axios follows redirects
        });
        res.send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || {});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
