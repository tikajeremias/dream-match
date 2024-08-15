import { atom } from "jotai";

// State para controlar informacion de los equipos
export const teamsAtom = atom<any>({
    one: {
        'team-id': 'one',
        'team-name': "Team One F.C",
        'players': null,
    },
    two: {
        'team-id': "two",
        'team-name': "Team Two F.C",
        'players': null,
    }
})