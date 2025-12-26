'use client';
import React, { useState } from 'react';
import axios from 'axios';

const ApiTester = () => {
    const [url, setUrl] = useState('');             // API URL
    const [method, setMethod] = useState('GET');    // HTTP method
    const [body, setBody] = useState('');           // Request body
    const [response, setResponse] = useState(null); // API response
    const [activeTab, setActiveTab] = useState('Body');
    const [responseTab, setResponseTab] = useState('Response');
    const [savedRequests, setSavedRequests] = useState([]); // ✅ Saved requests
    const [headers, setHeaders] = useState([{ key: '', value: '' }]);


    const sendRequest = async () => {
        try {
            const res = await axios({
                method,
                url,
                data: body ? JSON.parse(body) : null,
            });
            setResponse(res.data);
        } catch (error) {
            setResponse({ error: error.message });
        }
    };

    // ✅ Save request function
    const saveRequest = () => {
        const newRequest = { url, method, body };
        setSavedRequests([...savedRequests, newRequest]);
        alert('Request saved!');
        localStorage.setItem('savedRequests', JSON.stringify(savedRequests));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-mono p-6">
            {/* Hero Section */}
            <div className="text-center mb-10">
                <h1 className="text-5xl font-extrabold text-teal-400">🚀 API Testing Tool</h1>
                <p className="mt-2 text-gray-400">Test your APIs with speed, clarity, and style</p>
            </div>

            {/* Request Builder */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter API URL"
                        className="flex-1 bg-gray-700 text-white px-4 py-2 rounded focus:outline-none"
                    />
                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="bg-gray-700 text-white px-2 py-2 rounded focus:outline-none"
                    >
                        <option>GET</option>
                        <option>POST</option>
                        <option>PUT</option>
                        <option>DELETE</option>
                        <option>PATCH</option>
                    </select>
                    <button
                        onClick={sendRequest}
                        className="bg-teal-400 text-black font-bold px-4 py-2 rounded hover:bg-teal-300 transition"
                    >
                        Send
                    </button>
                    {/* ✅ New Save button */}
                    <button
                        onClick={saveRequest}
                        className="bg-orange-400 text-black font-bold px-4 py-2 rounded hover:bg-orange-300 transition"
                    >
                        Save
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-600 mb-4">
                    {['Headers', 'Auth', 'Body', 'Tests', 'Pre Run'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 ${activeTab === tab
                                ? 'border-b-2 border-teal-400 text-teal-400'
                                : 'text-gray-400'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Body Input */}
                {activeTab === 'Body' && (
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full bg-gray-700 text-white p-4 rounded h-40 resize-none focus:outline-none"
                    />
                )}
            </div>

            {/* Response Viewer */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex gap-4 border-b border-gray-600 mb-4">
                    {['Response', 'Headers', 'Cookies', 'Results', 'Docs'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setResponseTab(tab)}
                            className={`px-4 py-2 ${responseTab === tab
                                ? 'border-b-2 border-orange-400 text-orange-400'
                                : 'text-gray-400'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Response Display */}
                <div className="bg-gray-700 p-4 rounded overflow-auto max-h-96">
                    <pre className="text-sm text-green-300">
                        {response ? JSON.stringify(response, null, 2) : '// Response will appear here'}
                    </pre>
                </div>
            </div>

            {/* ✅ Saved Requests Viewer */}
            <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-orange-400 mb-4">📂 Saved Requests</h2>
                {savedRequests.length === 0 ? (
                    <p className="text-gray-400">No requests saved yet.</p>
                ) : (
                    <ul className="list-disc ml-6 text-gray-300">
                        {savedRequests.map((req, index) => (
                            <li key={index}>
                                <span className="text-teal-400">{req.method}</span> → {req.url}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Shortcuts */}
            <div className="mt-8 text-sm text-gray-500">
                <p><strong>Shortcuts:</strong></p>
                <ul className="list-disc ml-6">
                    <li>Send Request: <code>Ctrl + Enter</code></li>
                    <li>Import cURL: <code>Ctrl + U</code></li>
                    <li>Change Environment: <code>Ctrl + E</code></li>
                </ul>
            </div>
        </div>
    );
};

export default ApiTester;