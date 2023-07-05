import { useFrame } from '@react-three/fiber';
import { MutableRefObject, useState } from 'react';

import { Simulator } from '../automata/simulator';
import { Coords } from '../schema/types';

type Props = { id: number; coords: Coords; simulator: MutableRefObject<Simulator> };

// ! NOTE: age_matrix must be passed as props since React doesn't support context in canvas
const Cell = ({ id, coords, simulator }: Props) => {
  // Multiplier constant to compute the cell's color code from the its age
  const colorBaseMultiplier = 100_000_000;

  const [color, setColor] = useState<number | undefined>(undefined);

  useFrame(() => {
    const cellAge = simulator.current.CurrentGeneration().at(id) ?? 0;
    const cellColor = cellAge * colorBaseMultiplier || undefined;
    color !== cellColor && setColor(cellColor);
  });

  return (
    <mesh scale={0.9} position={coords}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial visible={color !== undefined} color={color} />
    </mesh>
  );
};

export default Cell;
