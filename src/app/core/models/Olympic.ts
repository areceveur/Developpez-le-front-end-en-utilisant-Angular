// TODO: create here a typescript interface for an olympic country

import { participations } from "./Participation";

export interface olympicsCountry {
    id: number;
    country: string;
    participations: participations[];
}