import React, { useLayoutEffect, useState } from 'react'

async function fetchData(url, property) {
    const response = await fetch(url);
    const data = await response.json();
    return data[property];
}

function App() {
    const [message, setMessage] = useState('');

    useLayoutEffect(() => {
        async function fetchMessage() {
            const message = await fetchData('/api', 'message');
            setMessage(message);
        }
        fetchMessage();
    }, []);

    return (
        <div>
            {(typeof (message) === "undefined") ? (
                <p>Loading...</p>
            ) : (
                    <p>{message}</p>
            )}
            <p>Text</p>
        </div>
    )
}

export default App
