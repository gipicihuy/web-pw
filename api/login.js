// api/login.js

module.exports = (req, res) => {
    // Pastikan request method-nya POST
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    // Mengambil kata sandi dari body request
    const submittedPassword = req.body.password;
    const correctPassword = process.env.WEBSITE_PASSWORD;

    if (submittedPassword === correctPassword) {
        // Kata sandi benar, arahkan ke eberardos.my.id
        console.log('Kata sandi benar. Redirecting...');
        res.redirect('https://eberardos.my.id');
    } else {
        // Kata sandi salah
        console.log('Kata sandi salah.');
        res.status(401).send(`
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
                    <form id="loginForm" action="/api/login" method="post">
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
};
