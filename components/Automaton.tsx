import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ReactNode, useMemo } from 'react';

import { Coords2Index } from '../automata/helpers';
import { useSimulation } from '../context/Simulation';
import { Coords } from '../schema/types';
import Cell from './Cell';

const Automaton = () => {

  const { settings, simulator } = useSimulation();

  const toRender = useMemo(() => {
    const cells: Array<ReactNode> = [];
    const offset = Math.round(settings.dimension / 2);

    // Allocates all the needed automaton Cells
    for (let x = 0; x < settings.dimension; x++)
      for (let y = 0; y < settings.dimension; y++)
        for (let z = 0; z < settings.dimension; z++) {
          const coords: Coords = [x - offset, y - offset, z - offset];
          const id = Coords2Index([x, y, z], settings.dimension);
          cells.push(<Cell key={id} {...{ simulator, coords, id }} />);
        }

    return cells;
  }, [simulator, settings.dimension]);

  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000, position: [2, 1, settings.dimension + 5] }}
      style={{ height: '100vh' }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      {toRender}
    </Canvas>
  );
};

export default Automaton;
