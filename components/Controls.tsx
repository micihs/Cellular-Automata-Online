import { Button, theme } from '@nextui-org/react';
import { Pause, Play, Redo, RotateLeft } from 'grommet-icons';
import { useCallback, useMemo, useState } from 'react';

import { useSimulation } from '../context/Simulation';

const Controls = () => {
  const { simulator, setSeed } = useSimulation();

  const [simulationId, setSimulationId] = useState<NodeJS.Timer | undefined>();

  const [ButtonProps, IconProps] = useMemo(() => {
    const button = { auto: true, flat: true, rounded: true, color: 'primary' as const };
    const icon = { color: theme.colors.primary.value };
    return [button, icon];
  }, []);

  const start = useCallback(() => {
    const intervalId = setInterval(() => simulator.current.NextGeneration(), 100);
    setSimulationId(intervalId);
  }, [simulator]);

  const stop = useCallback(() => {
    if (simulationId === undefined) return;

    clearInterval(simulationId);
    setSimulationId(undefined);
  }, [simulationId]);

  const step = useCallback(() => {
    stop(); 
    simulator.current.NextGeneration();
  }, [simulator, stop]);

  const restart = useCallback(() => {
    stop();
    setSeed(prev => prev.slice());
  }, [setSeed, stop]);

  return (
    <>
      {!!simulationId ? (
        <Button {...ButtonProps} icon={<Pause {...IconProps} />} onClick={stop} />
      ) : (
        <Button {...ButtonProps} icon={<Play {...IconProps} />} onClick={start} />
      )}

      <Button {...ButtonProps} icon={<RotateLeft {...IconProps} />} onClick={restart} />
      <Button {...ButtonProps} icon={<Redo {...IconProps} />} onClick={step} />
    </>
  );
};

export default Controls;
