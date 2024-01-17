// Create web server application
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');
const port = 3000;
const commentsPath = path.join(__dirname, 'comments.json');
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files
app.use('/', express.static(path.join(__dirname, 'public')));
// GET /comments
app.get('/comments', (req, res) => {
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        } else {
            res.send(data);
        }
    });
});
// POST /comments
app.post('/comments', (req, res) => {
    // Read comments file
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        } else {
            // Parse comments file
            const comments = JSON.parse(data);
            // Add new comment
            comments.push(req.body);
            // Write comments file
            fs.writeFile(commentsPath, JSON.stringify(comments), err => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal server error');
                } else {
                    res.send(comments);
                }
            });
        }
    });
});
// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));
