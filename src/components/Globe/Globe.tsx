import React, { useMemo, useEffect } from "react";
import style from "./Globe.module.scss";
import { TextureLoader, MeshStandardMaterial, SphereBufferGeometry, PerspectiveCamera, Vector3 } from "three";
import { Canvas, useThree, useFrame } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import earthImage from "./earthmap1k.jpg";

const EARTH_RADIUS = 10;

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
    return new SphereBufferGeometry(radius, 64, 64);
  }, [radius]);
}

/**
 * Use orbit control.
 * @param target Focused coordinates.
 */
function useCameraControl(target: Vector3) {
  const {
    camera,
    gl: { domElement }
  } = useThree();

  const controls = useMemo(() => new OrbitControls(camera, domElement), [camera, domElement]);
  controls.rotateSpeed = 0.5;
  controls.minDistance = EARTH_RADIUS + 0.1;

  // Update focus target.
  useEffect(() => {
    controls.target = target;
  }, [controls, target]);

  useFrame(() => controls.update());
};

type Props = {
  position: [number, number, number]
};

/**
 * 3D Earth Object.
 */
function Earth(props: Props) {
  const earthMaterial = useMaterial(earthImage);
  const earthShape = useSphere(EARTH_RADIUS);

  useCameraControl(new Vector3(...props.position));

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
        <Earth position={[-20, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default Globe;
