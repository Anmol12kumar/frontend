'use client';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const ApiTester = () => {
    
    const [url, setUrl] = useState('');                             // State for API URL
    const [method, setMethod] = useState('GET');                    // State for HTTP method
    const [body, setBody] = useState('');                           // State for request body
    const [response, setResponse] = useState(null);                 // State for API response  
    const [activeTab, setActiveTab] = useState('Body');             // State for active request tab
    const [responseTab, setResponseTab] = useState('Response');     // State for active response tab

    const sendRequest = async () => {                               // Function to send API request
        try {                                                       // Function to send API request 
            const res = await axios({                               // Axios request configuration
                method: method,                                     // HTTP Method          
                url: url,                                                  
                data: body ? JSON.parse(body) : null,               // Request body (parsed as JSON)   
            });
            setResponse(res.data);                                  // Set response data
        } catch (error) {                                           // Handle errors
            setResponse({ error: error.message });                  // Set error message in response
        }
    }

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
                        onChange={e => setUrl(e.target.value)}  // Update URL state on change
                        placeholder="Enter API URL"
                        className="flex-1 bg-gray-700 text-white px-4 py-2 rounded focus:outline-none"
                    />
                    <select
                        value={method}
                        onChange={e => setMethod(e.target.value)}
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
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-600 mb-4">
                    {['Headers', 'Auth', 'Body', 'Tests', 'Pre Run'].map(tab => (  // Mapping through tabs
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}                      // Set active tab on click
                            className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-teal-400 text-teal-400' : 'text-gray-400'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Body Input */}
                {activeTab === 'Body' && (                                          // Only show body input for 'Body' tab
                    <textarea
                        value={body}                                                // Controlled component for request body
                        onChange={e => setBody(e.target.value)}                     // Update body state on change
                        className="w-full bg-gray-700 text-white p-4 rounded h-40 resize-none focus:outline-none"
                    />
                )}
            </div>

            {/*Response Viewer*/}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex gap-4 border-b border-gray-600 mb-4">
                    {['Response', 'Headers', 'Cookies', 'Results', 'Docs'].map(tab => (// Mapping through response tabs
                        <button
                            key={tab}                                                  // Set response tab on click
                            onClick={() => setResponseTab(tab)}                        // Set response tab on click
                            className={`px-4 py-2 ${responseTab === tab ? 'border-b-2 border-orange-400 text-orange-400' : 'text-gray-400'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/*Response Display*/}
                <div className="bg-gray-700 p-4 rounded overflow-auto max-h-96">
                    <pre className="text-sm text-green-300">
                        {response ? JSON.stringify(response, null, 2) : '// Response will appear here'}
                    </pre>
                </div>
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
    )
}

export default ApiTester;