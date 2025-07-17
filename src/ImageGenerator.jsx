import { useState } from "react";
import axios from "axios";

function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/generate/", { prompt });
      setImage(`data:image/png;base64,${res.data.image}`);
      setText(res.data.text);
    } catch (err) {
      alert("Error generating image");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Gemini AI Image Generator</h1>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Generate
      </button>
      {text && <p className="mt-4">{text}</p>}
      {image && <img className="mt-4 rounded shadow" src={image} alt="AI generated" />}
    </div>
  );
}

export default ImageGenerator;
