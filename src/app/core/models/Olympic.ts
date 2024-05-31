// TODO: create here a typescript interface for an olympic country

import { participations } from "./Participation";

/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
export interface olympicsCountry {
    id: number;
    country: string;
    participation: participations[];
}