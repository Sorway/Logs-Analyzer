const bcrypt = require('bcryptjs');
const db = require('../database/database');

exports.showLogin = (req, res) => {
    res.render('authentication/login', { error: req.query.error });
};

exports.showRegister = (req, res) => {
    res.render('authentication/register', { error: req.query.error });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
        const user = users[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.redirect('/login?error=' + encodeURIComponent('Email ou mot de passe incorrect'));
        }

        req.session.user = {
            id: user.id,
            email: user.email
        };

        res.redirect('/');
    } catch (error) {
        console.error('Erreur de connexion:', error.message);
        res.redirect('/login?error=' + encodeURIComponent('Erreur lors de la connexion'));
    }
};

exports.register = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.redirect('/register?error=' + encodeURIComponent('Les mots de passe ne correspondent pas'));
    }

    try {
        const [existingUsers] = await db.query('SELECT id FROM Users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.redirect('/register?error=' + encodeURIComponent('Cet email est déjà utilisé'));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'INSERT INTO Users (email, password, created_at) VALUES (?, ?, NOW())',
            [email, hashedPassword]
        );

        req.session.user = {
            id: result.insertId,
            email: email
        };

        res.redirect('/');
    } catch (error) {
        console.log(error);
        console.error('Erreur d\'inscription:', error.message);
        res.redirect('/register?error=' + encodeURIComponent('Erreur lors de l\'inscription'));
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erreur lors de la déconnexion:', err);
        }
        res.redirect('/login');
    });
};