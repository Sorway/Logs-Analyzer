const fs = require('fs');

function processLogs(logs) {
    const httpCodes = {};
    const ipAddresses = {};

    logs.forEach(log => {
        httpCodes[log.status] = (httpCodes[log.status] || 0) + 1;

        ipAddresses[log.ip] = (ipAddresses[log.ip] || 0) + 1;
    });

    const sortedIPs = Object.entries(ipAddresses)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([ip, count]) => ({ ip, count }));

    return {
        httpCodes,
        topIPs: sortedIPs
    };
}

exports.showStats = (req, res) => {
    if (!req.session.logs) {
        return res.redirect('/?error=no_logs');
    }

    const stats = processLogs(req.session.logs);
    res.render('stats', { stats });
};