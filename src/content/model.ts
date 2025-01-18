import axios from 'axios';

export async function checkBrainrotModel(image: string) {
    const url = 'https://api-inference.huggingface.co/models/your-model-name';
    
    const response = await axios.post(url, image, {
        headers: {
            'Content-Type': 'image/png'
        }
    });

    return response.data;
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
