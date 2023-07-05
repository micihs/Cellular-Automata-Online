import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Input, Radio, theme } from '@nextui-org/react';
import { Checkmark, Close } from 'grommet-icons';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { CreateRandomSeed, ExportSeed, ImportSeed } from '../automata/seed';
import { useSimulation } from '../context/Simulation';
import { SettingsSchema } from '../schema/constant';
import { Settings } from '../schema/types';

type Props = { onDiscard: () => void; onSave: (settings: Settings) => void };

const Style = {
  Section: { mb: '$10' },
  Footer: { fg: '1', ai: 'flex-end' },
};

const Form = ({ onDiscard, onSave }: Props) => {
  const { settings, setSeed } = useSimulation();

  const { control, register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    defaultValues: settings,
    resolver: yupResolver(SettingsSchema),
  });

  const isValid = useCallback(
    (name: keyof Settings, defaultMsg: string) => {
      if (!formState.errors[name])
        return { helperText: defaultMsg, color: 'primary' } as const;

      return { helperText: formState.errors[name]?.message, color: 'error' } as const;
    },
    [formState.errors]
  );

  const SeedRandom = useCallback(
    () => setSeed(CreateRandomSeed(settings.dimension, settings.max_states)),
    [setSeed, settings.dimension, settings.max_states]
  );
  const SeedImport = useCallback(() => ImportSeed(setSeed), [setSeed]);
  const SeedExport = useCallback(
    () => setSeed(current => (ExportSeed(current), current)),
    [setSeed]
  );

  return (
    <>
      <Grid.Container gap={2} css={Style.Section}>
        <Grid xs={4} justify="center">
          <Button color="primary" flat auto onClick={SeedRandom}>
            Random seed
          </Button>
        </Grid>
        <Grid xs={4} justify="center">
          <Button color="primary" flat auto onClick={SeedImport}>
            Import seed
          </Button>
        </Grid>
        <Grid xs={4} justify="center">
          <Button color="primary" flat auto onClick={SeedExport}>
            Export seed
          </Button>
        </Grid>
      </Grid.Container>

      <Grid.Container gap={2} css={Style.Section}>
        <Grid xs={12}>
          <Controller
            name="mode"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Radio.Group label="Simulation mode" value={value} onChange={onChange}>
                <Radio
                  size="sm"
                  value="conway"
                  description="Evaluates only the 6 face adjacent neighbors"
                >
                  Conway
                </Radio>
                <Radio
                  size="sm"
                  value="von-neumann"
                  description="Evaluates the whole 26 neighbors"
                >
                  Von Neumann
                </Radio>
              </Radio.Group>
            )}
          />
        </Grid>
      </Grid.Container>

      <Grid.Container gap={2} css={Style.Section}>
        <Grid xs={6}>
          <Input
            type="number"
            label="Matrix size"
            {...register('dimension')}
            {...isValid('dimension', 'The number of cell per side in the matrix')}
          />
        </Grid>
        <Grid xs={6}>
          <Input
            type="number"
            label="Life states"
            {...register('max_states')}
            {...isValid('max_states', 'The max age reachable by any given cell')}
          />
        </Grid>
        <Grid xs={6}>
          <Input
            type="number"
            label="Spawn threshold"
            {...register('lim_spawn')}
            {...isValid('lim_spawn', 'Number of alive neighbor for a cell to spawn')}
          />
        </Grid>
        <Grid xs={6}>
          <Input
            type="number"
            label="Survive threshold"
            {...register('lim_survive')}
            {...isValid('lim_survive', 'Number of alive neighbor for a cell to survive')}
          />
        </Grid>
      </Grid.Container>

      <Grid.Container gap={2} css={Style.Footer}>
        <Grid xs={6}>
          <Button
            flat
            color="error"
            icon={<Close color={theme.colors.error.value} />}
            onClick={onDiscard}
          >
            Discard
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button
            flat
            color="success"
            icon={<Checkmark color={theme.colors.success.value} />}
            onClick={handleSubmit(onSave)}
          >
            Save
          </Button>
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Form;
