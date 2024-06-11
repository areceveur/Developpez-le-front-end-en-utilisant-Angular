import { participations } from "./Participation";

export interface olympicsCountry {
    id: number;
    country: string;
    participations: participations[];
}