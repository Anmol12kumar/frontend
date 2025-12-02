export default function ResponseViewer({ response }) {  // PULSECHECK/frontend/src/components/responseviewer.jsx
    return (
        <div>
            <h4>Response</h4> 
            <pre>{JSON.stringify(response, null, 2)}</pre> 
        </div>
    );
}