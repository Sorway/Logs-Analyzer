const fs = require('fs');
const fileUpload = require('express-fileupload');

exports.showLogs = (req, res) => {
    const logs = req.session.logs || [];
    res.render('index', { logs });
};

exports.uploadLog = (req, res) => {
    console.log('[Logs-Controller] Upload request received');

    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('[Logs-Controller] No files uploaded');
        return res.status(400).send('[Logs-Controller] Aucun fichier téléchargé.');
    }

    const file = req.files.fichier;
    console.log('[Logs-Controller] File received:', file.name);

    fs.readFile(file.tempFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('[Logs-Controller] Error reading file:', err);
            return res.status(500).send('[Logs-Controller] Erreur de lecture du fichier');
        }

        console.log('[Logs-Controller] File content length:', data.length);

        const regex = /(?<ip>\d{1,3}(?:\.\d{1,3}){3}) - - \[(?<date>[\w:/]+ \+\d{4})\] "(?<method>\w+) (?<path>[^\s]+) HTTP\/(?:\d\.\d|\d)" (?<status>\d{3}) (?<size>\d+)(?: "(?<referrer>[^\"]*)" "(?<userAgent>[^\"]*)")?/g;
        let logs = [];
        let match;
        let lineNumber = 1;

        while ((match = regex.exec(data)) !== null) {
            const userAgent = match.groups.userAgent;
            let browser = 'Inconnu';

            if (userAgent != null) {
                if (userAgent.includes('Firefox/')) {
                    browser = 'Firefox';
                } else if (userAgent.includes('Chrome/')) {
                    browser = 'Chrome';
                } else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome/')) {
                    browser = 'Safari';
                } else if (userAgent.includes('Edge/') || userAgent.includes('Edg/')) {
                    browser = 'Edge';
                } else if (userAgent.includes('Opera/') || userAgent.includes('OPR/')) {
                    browser = 'Opera';
                }
            }

            logs.push({
                id: lineNumber++,
                ...match.groups,
                browser: browser
            });
        }

        console.log('[Logs-Controller] Parsed logs:', logs.length);

        req.session.logs = logs;

        fs.unlink(file.tempFilePath, (unlinkErr) => {
            if (unlinkErr) {
                console.error('[Logs-Controller] Error deleting temp file:', unlinkErr);
            } else {
                console.log('[Logs-Controller] Temporary file deleted successfully');
            }
        });

        res.render('index', { logs: logs });
    });
};