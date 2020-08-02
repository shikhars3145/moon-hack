import React, { useState } from 'react';
import Globe, { ImageData } from "../../components/Globe/Globe";

const dummy_image_data: ImageData[] = [
  {
    url: "http://discovertajima.com/upimg/a91936126b087216c4caec1bf90c778a/720x720.jpg",
    timestamp: 0,
    latitude: 37,
    longitude: 127
  },
  {
    url: "http://discovertajima.com/upimg/a91936126b087216c4caec1bf90c778a/720x720.jpg",
    timestamp: 0,
    latitude: 40,
    longitude: -74
  },
  {
    url: "http://discovertajima.com/upimg/a91936126b087216c4caec1bf90c778a/720x720.jpg",
    timestamp: 0,
    latitude: 43,
    longitude: -79
  },
  {
    url: "http://discovertajima.com/upimg/a91936126b087216c4caec1bf90c778a/720x720.jpg",
    timestamp: 0,
    latitude: 51,
    longitude: 0
  },
  {
    url: "http://discovertajima.com/upimg/a91936126b087216c4caec1bf90c778a/720x720.jpg",
    timestamp: 0,
    latitude: 30,
    longitude: 31
  },
  {
    url: "http://discovertajima.com/upimg/a91936126b087216c4caec1bf90c778a/720x720.jpg",
    timestamp: 0,
    latitude: -34,
    longitude: 151
  },
];

function ExplorePage() {
  const [images, setImages] = useState<ImageData[]>(dummy_image_data);
  return (
    <div className="explore-page">
      <Globe images={images} />
    </div>
  );
}

export default ExplorePage;
