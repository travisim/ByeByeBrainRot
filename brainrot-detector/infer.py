import io

import numpy as np
from keras.models import load_model
from PIL import Image


async def predict_image(contents):
    """
    Predict whether an image shows signs of brainrot using the trained model
    
    Parameters:
    model_path (str): Path to the .keras model file
    image (PIL.Image.Image): Input image as a PIL Image object
    
    Returns:
    tuple: (prediction label, confidence score)
    """
    model_path = 'BrainrotDetector-0.001-6conv-basic.keras'

    # Convert bytes to a PIL Image
    image = Image.open(io.BytesIO(contents))

    # Load the trained model
    model = load_model(model_path)
    
    # Image preprocessing - match the training process
    IMG_SIZE = 200
    
    # Convert to grayscale if needed
    if image.mode != 'L':
        image = image.convert('L')
    
    # Resize the image
    image = image.resize((IMG_SIZE, IMG_SIZE), Image.Resampling.LANCZOS)
    
    # Convert to numpy array and reshape
    img_array = np.array(image)
    img_array = img_array.reshape(-1, IMG_SIZE, IMG_SIZE, 1)
    
    # Normalize the image
    img_array = img_array.astype('float32') / 255.
    
    # Make prediction
    prediction = model.predict(img_array, verbose=0)[0]
    
    # Get the predicted class and confidence
    pred_label = 'Brainrot' if np.argmax(prediction) == 0 else 'Normal'
    confidence = prediction[np.argmax(prediction)]
    
    return {
        "prediction": pred_label,
        "confidence": float(str(confidence)),
    }

# Example usage
if __name__ == "__main__":
    
    try:
        # Load an example image
        test_image = Image.open('image.png')
        
        label, confidence = predict_image(test_image)
        print(f'Prediction: {label}')
        print(f'Confidence: {confidence:.2%}')
    except Exception as e:
        print(f'Error during prediction: {str(e)}')