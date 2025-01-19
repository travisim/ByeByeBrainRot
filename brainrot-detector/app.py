import base64

from fastapi import FastAPI, File, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from infer import predict_image

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/')
async def _file_upload(
        request: Request
):
    data_url = await request.body()

    if isinstance(data_url, bytes):
        # If it's already bytes, decode it to string first
        data_url = data_url.decode('utf-8')

    # Assuming data_url is your canvas.toDataURL() string
    # Remove the data URL prefix
    base64_data = data_url.replace('data:image/png;base64,', '')

    # Convert to bytes
    byte_data = base64.b64decode(base64_data)
    print(f"FILE: {type(byte_data)}")
    ans = await predict_image(byte_data)
    print(ans)
    return ans

@app.get('/')
async def index():
    return {"message": "Hello World"}