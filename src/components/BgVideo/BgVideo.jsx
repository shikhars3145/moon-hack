import React from 'react';

import './BgVideo.scss';

export default function BgVideo() {
  return (
    <div className="bg-video">
      <video className="video-content" autoPlay muted loop>
        <source src="./assets/videos/bg.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
