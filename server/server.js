const express = require('express');
const app = express();
const port = process.env.PORT || 5000; // Use environment variable or default to 5000

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});