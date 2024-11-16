import React, { useState } from 'react';
import { Logo } from './components/Logo';
import { ImageConverter } from './components/ImageConverter';
import { ImagePreview } from './components/ImagePreview';
import { SampleImages } from './components/SampleImages';
import { Feature } from './components/Feature';
import { ZoomModal } from './components/ZoomModal';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const convertImage = async () => {
    if (!imageUrl) {
      setError('Please enter an image URL');
      return;
    }

    setLoading(true);
    setError('');
    setResultImage(null);

    try {
      const response = await fetch('https://halftoneapi.p.rapidapi.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': '7218dfe3a4msh180731cfd269471p12a6fcjsnff72ea084ef8',
          'X-RapidAPI-Host': 'halftoneapi.p.rapidapi.com'
        },
        body: JSON.stringify({ imageUrl })
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const text = await response.text();
      const base64Match = text.match(/data:image\/png;base64,([^"]*)/);
      
      if (base64Match && base64Match[0]) {
        setResultImage(base64Match[0]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError('Failed to convert image. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Logo className="w-12 h-12" />
            <h1 className="text-4xl font-medium text-black">HalftoneAI</h1>
          </div>
          <p className="text-5xl font-medium text-black mb-4">
            Print perfection in one click.
          </p>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Transform your images into print-ready masterpieces with precision and ease.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <Feature
            title="Intelligent Processing"
            description="Advanced algorithms ensure perfect halftone patterns every time."
          />
          <Feature
            title="Enterprise Ready"
            description="Built for high-volume professional print operations."
          />
          <Feature
            title="Precision Control"
            description="Maintain complete fidelity from pixel to print."
          />
        </div>

        {/* Main Content */}
        <div className="bg-gray-50 rounded-3xl p-8 mb-16">
          <div className="space-y-12">
            <SampleImages onSelectImage={setImageUrl} />
            
            <ImageConverter
              imageUrl={imageUrl}
              loading={loading}
              error={error}
              onUrlChange={setImageUrl}
              onConvert={convertImage}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImagePreview
                title="Original"
                imageUrl={imageUrl}
                onError={() => setError('Invalid image URL')}
                onZoom={() => setZoomImage(imageUrl)}
              />
              <ImagePreview
                title="Halftone Result"
                imageUrl={resultImage}
                onZoom={() => setZoomImage(resultImage)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm">
          © 2024 HalftoneAI. All rights reserved.
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomImage && (
        <ZoomModal imageUrl={zoomImage} onClose={() => setZoomImage(null)} />
      )}
    </div>
  );
}

export default App;