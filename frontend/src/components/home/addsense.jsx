import React, { useEffect } from 'react';

const SmartMartAd = () => {
  useEffect(() => {
    // Only attempt to push the ad if running in production mode
    // This helps prevent errors during development since AdSense may not serve ads on localhost
    if (process.env.NODE_ENV === 'production') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  // You can also show a placeholder in development mode
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div
        style={{
          width: '100%',
          margin: '0 auto',
          padding: '20px',
          textAlign: 'center',
          border: '1px dashed #ccc',
        }}
      >
        SmartMart Ad 
      </div>
    );
  }

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1214967166731024"
        data-ad-slot="3485258943"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default SmartMartAd;
