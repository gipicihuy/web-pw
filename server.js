const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk mem-parsing data dari form
app.use(express.urlencoded({ extended: true }));

// Serve file HTML statis
app.use(express.static(path.join(__dirname, '')));

// Endpoint untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint untuk memproses login
app.post('/login', (req, res) => {
    const submittedPassword = req.body.password;
    const correctPassword = process.env.WEBSITE_PASSWORD;

    if (submittedPassword === correctPassword) {
        // Kata sandi benar, arahkan ke eberardos.my.id
        console.log('Kata sandi benar. Redirecting...');
        res.redirect('https://eberardos.my.id');
    } else {
        // Kata sandi salah
        console.log('Kata sandi salah.');
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Halaman Login</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background-color: #f0f0f0;
                        margin: 0;
                        flex-direction: column;
                    }
                    .container {
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }
                    input[type="password"] {
                        padding: 10px;
                        margin: 10px 0;
                        width: 200px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                    }
                    button {
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                    button:hover {
                        background-color: #0056b3;
                    }
                    .message {
                        margin-top: 15px;
                        color: red;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Masukkan Kata Sandi</h2>
                    <form id="loginForm" action="/login" method="post">
                        <input type="password" name="password" placeholder="Kata Sandi" required>
                        <br>
                        <button type="submit">Masuk</button>
                    </form>
                    <p class="message" id="message">Kata sandi salah. Silakan coba lagi.</p>
                </div>
            </body>
            </html>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
