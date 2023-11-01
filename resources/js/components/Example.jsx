import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout';

function Example() {
    // useEffect(() => {
    //     console.log(props);
    // }, [])
    
    return (
        <Layout />
    );
}

export default Example;

if (document.getElementById('user-panel')) {
    const Index = ReactDOM.createRoot(document.getElementById("user-panel"));
    const data = document.getElementById('user-panel').getAttribute('data');
    Index.render(
        <React.StrictMode>
            <Example />
        </React.StrictMode>
    )
}
