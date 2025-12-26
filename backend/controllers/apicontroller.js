const axios = require("axios");

exports.testApi = async (req, res) => {
    const { url, method, headers, body } = req.body;

    if (!url || !method) {
    return res
        .status(400)
        .json({ success: false, error: "URL and method are required" });
    }

    const start = Date.now();
    try {
    const response = await axios({
        url,
        method,
        headers,
        data: body,
        timeout: 10000, // 10s timeout
    });

    const duration = Date.now() - start;

    res.json({
        success: true,
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers,
        responseTime: `${duration}ms`,
        size: JSON.stringify(response.data).length,
    });
    } catch (error) {
    const duration = Date.now() - start;
    res.json({
        success: false,
        status: error.response?.status || 500,
        error: error.message,
        data: error.response?.data || null,
        responseTime: `${duration}ms`,
    });
    }
};
