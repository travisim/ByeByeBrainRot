import axios from 'axios';

export async function checkBrainrotModel(image: string) {
    const url = 'https://api-inference.huggingface.co/models/your-model-name';
    const apiKey = 'your-huggingface-api-key';
    
    const response = await axios.post(url, image, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'image/png'
        }
    });

    return response.data;
}
