const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Habilita CORS para todas las rutas
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.json());

// Configuración del servicio de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'urianwebdeveloper@gmail.com',
    pass: 'tcgsaaiuilyreuzc',
  },
});

// Ruta para enviar correos electrónicos
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'urianwebdeveloper@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
      return res.status(200).send('Correo electrónico enviado');
    }
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
