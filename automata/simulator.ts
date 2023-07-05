import { Coords, Settings } from '../schema/types';
import { Coords2Index, GetNeighbors, NewCellState } from './helpers';

export class Simulator {

  private generations: [Uint8Array, Uint8Array];
  private Coords2Index: (coords: Coords) => number;
  private GetNeighbors: (coords: Coords) => Coords[];
  private NewCellState: (cellAge: number, nAlive: number) => number;

  public constructor(settings: Settings, seed: Uint8Array) {
    this.generations = [seed.slice(), new Uint8Array(settings.dimension ** 3)];
    this.Coords2Index = (coords: Coords) => Coords2Index(coords, settings.dimension);
    this.GetNeighbors = (coords: Coords) => GetNeighbors(coords, settings);
    this.NewCellState = (cellAge: number, nAlive: number) =>
      NewCellState(cellAge, nAlive, settings);
  }

  public CurrentGeneration() {
    const [current] = this.generations;
    return current;
  }

  public NextGeneration() {
    const [older, newer] = this.generations;
    const dim_length = Math.cbrt(older.length);

    if (older.every(cState => cState === 0)) return older;

    for (let x = 0; x < dim_length; x++) {
      for (let y = 0; y < dim_length; y++) {
        for (let z = 0; z < dim_length; z++) {
          const neighbors = this.GetNeighbors([x, y, z]);
          const { length: nAlive } = neighbors.filter(c => older[this.Coords2Index(c)]);
          const cellIndex = this.Coords2Index([x, y, z]);
          newer[cellIndex] = this.NewCellState(older[cellIndex], nAlive);
        }
      }
    }
    this.generations.reverse();
  }
}
