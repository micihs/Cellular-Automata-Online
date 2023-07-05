import { Card, Grid, Text } from '@nextui-org/react';
import { Close } from 'grommet-icons';
import { ReactNode } from 'react';

type Props = { isOpen: boolean; onClose: () => void; children: ReactNode };

const Style = {
  Drawer: {
    height: '97vh',
    maxWidth: '30em',
    position: 'fixed',

    zIndex: 5,
    top: '1.5vh',
    left: '0.5em',
    padding: '0px',
  },

  Subtitle: { color: '$accents8' },
};

const Drawer = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return <></>;

  return (
    <Card isHoverable css={Style.Drawer}>
      <Card.Header>
        <Grid.Container gap={1}>
          <Grid xs={12} direction="row" justify="space-between" alignItems="center">
            <Text h3>Simulation settings</Text>
            <Close onClick={onClose} />
          </Grid>

          <Grid xs={12}>
            <Text css={Style.Subtitle}>
              Here you will be able to tweak your simulation settings. <br />
              Different simulation settings with the same initial seed could generate
              radically different Cellular Automata.
              <br />
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Header>

      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default Drawer;
