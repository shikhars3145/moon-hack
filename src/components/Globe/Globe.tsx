import React, { useMemo, useEffect } from "react";
import style from "./Globe.module.scss";
import { TextureLoader, MeshStandardMaterial, SphereBufferGeometry } from "three";
import { Canvas, useThree } from "react-three-fiber";
import earthImage from "./earthmap1k.jpg";

/**
 * Make an image material.
 * @param imageUrl URL of an image to be used as texture.
 */
function useMaterial(imageUrl: string) {
  return useMemo(() => {
    const loader = new TextureLoader();
    const texture = loader.load(imageUrl);
    const material = new MeshStandardMaterial();
    material.map = texture;
    material.needsUpdate = true;
    return material;
  }, [imageUrl])
}

/**
 * Make a spheric geometry.
 * @param radius Radius of the sphere.
 */
function useSphere(radius: number) {
  return useMemo(() => {
    return new SphereBufferGeometry(radius, 32, 32);
  }, [radius]);
}

type Props = {
  position: [number, number, number]
};

/**
 * 3D Earth Object.
 */
function Earth(props: Props) {
  const earthMaterial = useMaterial(earthImage);
  const earthShape = useSphere(10);
  const { camera } = useThree();

  // Reset camera on load.
  useEffect(() => {
    camera.position.x = 10;
    camera.position.z = 0;
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <mesh
      {...props}
      material={earthMaterial}
      geometry={earthShape}>
    </mesh>
  )
}

function Globe() {
  return (
    <div className={style.container}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Earth position={[-20, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default Globe;
