import axios from 'axios';

export async function checkBrainrotModel(dataUrl: string) {
    const url = 'http://localhost:8001';
    
    const response = await fetch(url, {
        method: "POST",
        body: dataUrl,
        headers: {
            'Content-Type': 'image/png',
            // Add these headers for CORS preflight requests
            'Access-Control-Allow-Origin': '*'
        },
        // Add this option to include credentials if needed
        // credentials: 'include', // or 'same-origin' or 'omit'
    });

    return response.json();
}

export async function checkWhisperModel(audio: string) {
    const url = 'https://api-inference.huggingface.co/models/your-model-name';
    
    const response = await axios.post(url, image, {
        headers: {
            'Content-Type': 'image/png'
        }
    });

    return response.data;
}
