import React, { useState, useEffect } from 'react';

const NotificationBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the banner after a certain time if needed
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); // Hide after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="welcome-banner">
      <p>Welcome! To properly use the website, please go to site settings and allow insecure content.</p>
      <button onClick={() => setIsVisible(false)}>Close</button>
    </div>
  );
};

export default NotificationBanner;
