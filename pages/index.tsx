import { Button, Grid, theme } from '@nextui-org/react';
import { SettingsOption } from 'grommet-icons';
import type { NextPage } from 'next';
import { useCallback, useState } from 'react';

import Automaton from '../components/Automaton';
import Controls from '../components/Controls';
import Drawer from '../components/Drawer';
import Form from '../components/Form';
import { useSimulation } from '../context/Simulation';
import { Settings } from '../schema/types';

const Style = {
  // Fab button styling
  Fab: { width: '300px', position: 'fixed', top: '2em', left: '2em', zIndex: 1 },
};

const Home: NextPage = () => {
  // Retrieves the mutator function for the SimulationContext
  const { setSettings } = useSimulation();

  // Internal state to open/close the Drawer
  const [isOpen, setOpen] = useState(false);

  // Aggregate function that mutates the context and closes the modal onSave
  const onSaveSettings = useCallback(
    (newSettings: Settings) => {
      // Updates the context state (that, in turns, updates the Simulator)
      setSettings(newSettings);
      setOpen(prev => !prev); // Closes the modal upon completion
    },
    [setSettings]
  );

  return (
    <>

      <Grid.Container justify="space-around" css={Style.Fab}>
        <Button
          auto
          flat
          rounded
          color="primary"
          icon={<SettingsOption color={theme.colors.primary.value} />}
          onClick={() => setOpen(prev => !prev)}
        >
          Settings
        </Button>

        <Controls />
      </Grid.Container>

      <Drawer isOpen={isOpen} onClose={() => setOpen(prev => !prev)}>
        <Form onDiscard={() => setOpen(prev => !prev)} onSave={onSaveSettings} />
      </Drawer>

      {/* Three.js canvas with full automaton rendering */}
      <Automaton />
    </>
  );
};

export default Home;
