const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const CLAVE_SECRETA = "super_secreto_empresarial";

app.get('/sso-login', (req, res) => {
    const urlDeRetorno = req.query.redirect; 
    const credencialesCorrectas = true; // Simulación de login exitoso

    if (credencialesCorrectas) {
        const token = jwt.sign({ username: 'oscar', rol: 'ADMIN' }, CLAVE_SECRETA);
        res.redirect(`${urlDeRetorno}?token=Bearer ${token}`);
    } else {
        res.send("Credenciales incorrectas");
    }
});

app.get('/api/security/token/validate', (req, res) => {
    const token = req.query.token.replace('Bearer ', '');
    try {
        const usuarioDecodificado = jwt.verify(token, CLAVE_SECRETA);
        res.json({ ok: true, body: usuarioDecodificado });
    } catch (error) {
        res.status(401).json({ ok: false, message: "Token inválido" });
    }
});
