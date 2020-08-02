import React, { useMemo, useEffect, useState } from "react";
import style from "./Globe.module.scss";
import { TextureLoader, MeshStandardMaterial, SphereBufferGeometry, Vector3, ConeBufferGeometry } from "three";
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
 * Make a cone geometry.
 * @param radius Cone radius
 * @param height Cone height
 * @param radialSegment Number of segments
 */
function useCone(radius: number, height: number, radialSegment: number = 12) {
  return useMemo(() => {
    return new ConeBufferGeometry(radius, height, radialSegment);
  }, [radius, height, radialSegment]);
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

type MarkerProps = {
  longitude: number,
  latitude: number
}

function degToRad(deg: number) {
  return deg * Math.PI / 180;
}

function Marker({longitude, latitude}: MarkerProps) {
  const geometry = useCone(0.1, 0.5);

  // Convert coordinates to cartesian.
  const position = useMemo<[number, number, number]>(() => {
    return [
      EARTH_RADIUS * Math.cos(degToRad(latitude)) * Math.cos(degToRad(longitude)),
      EARTH_RADIUS * Math.sin(degToRad(latitude)),
      -EARTH_RADIUS * Math.cos(degToRad(latitude)) * Math.sin(degToRad(longitude))
    ];
  }, [longitude, latitude]);

  const rotation = useMemo<[number, number, number]>(() => {
    return [
      0,
      longitude * Math.PI / 180,
      (latitude + 90) * Math.PI / 180
    ];
  }, [longitude, latitude]);

  const [hovered, setHover] = useState(false);
  return (
    <mesh
      position={position}
      rotation={rotation}
      geometry={geometry}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <meshStandardMaterial attach="material" color={hovered ? "hotpink" : "orange"} />
    </mesh>
  )
}

type EarthProps = {
  position: [number, number, number]
};

/**
 * 3D Earth Object.
 */
function Earth(props: EarthProps) {
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
        <Earth position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default Globe;
