import * as yup from 'yup';
import { CreateRandomSeed } from '../automata/seed';
import { Mode, Settings } from './types';

/**
 * Default setting used on first load of the webpage
 * @constant
 */
export const InitSettings = {
  mode: 'conway',
  dimension: 15,
  lim_spawn: 4,
  lim_survive: 2,
  max_states: 15,
} as const;

export const InitSeed = CreateRandomSeed(InitSettings.dimension, InitSettings.max_states);

const Max = {
  Conway: 6, // Max number of possible alive neighbor in "conway" mode
  VonNeumann: 26,
  MatrixSize: 20,
};

export const SettingsSchema = yup.object({
  mode: yup
    .string()
    .required('The field is required')
    .oneOf(['conway', 'von-neumann'], 'Invalid simulation mode'),

  dimension: yup
    .number()
    .required('Field required')
    .max(Max.MatrixSize, `Max value is ${Max.MatrixSize} cells per dimension`),

  lim_spawn: yup
    .number()
    .required('Field required')
    .when('mode', {
      is: (mode: Mode) => mode === 'conway',
      then: yup.number().max(Max.Conway, 'Too big for "Conway" mode'),
      otherwise: yup.number().max(Max.VonNeumann, 'Too big for "Von Neumann" mode'),
    }),

  lim_survive: yup
    .number()
    .required('Field required')
    .when('mode', {
      is: (mode: Mode) => mode === 'conway',
      then: yup.number().max(Max.Conway, 'Too big for "Conway" mode'),
      otherwise: yup.number().max(Max.VonNeumann, 'Too big for "Von Neumann" mode'),
    }),

  max_states: yup.number().required('Field required'),
});
