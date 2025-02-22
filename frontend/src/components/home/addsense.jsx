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
        className='mt-0 md:mt-2 w-8/9 md:w-4/5 text-center border-1'
      >
        <img src="/demo-add.png" alt="Demo Ad" />
      </div>
    );
  }

  return (
    <div className='mt-25 md:mt-2 w-4/5 text-center border-1'
>
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
