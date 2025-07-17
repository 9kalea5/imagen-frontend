import { useState } from 'react';
import axios from 'axios';

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);

  const generateImage = async () => {
    try {
      const response = await axios.post('http://localhost:8000/generate-image/', { prompt });
      const img = `data:image/png;base64,${response.data.image}`;
      setImage(img);
    } catch (error) {
      alert('Image generation failed.');
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2">AI Image Generator</h1>
      <input
        className="w-full border p-2 mb-2"
        type="text"
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={generateImage}>
        Generate
      </button>
      {image && <img src={image} alt="Generated" className="mt-4 border" />}
    </div>
  );
}

export default ImageGenerator;
