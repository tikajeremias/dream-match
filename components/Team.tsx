import { teamsAtom } from '@/lib/store'
import { useAtom } from 'jotai'
import React from 'react'
import { Button } from './Button'
import Player, { PlayerType } from './Player'
import Subtitle from './Subtitle'
import { CiEdit } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";

export default function Team(props: { id: string }) {

    const [teams, setTeams] = useAtom(teamsAtom)
    const team = teams[props.id]
    interface Team {
        'team-id': string;
        'team-name': string;
        'players': any[] | null;
    }
    type Teams = Record<string, Team>;

    // State default de los equipos
    const defaultTeams: Teams = {
        one: {
            'team-id': 'one',
            'team-name': 'Team One F.C',
            'players': null,
        },
        two: {
            'team-id': 'two',
            'team-name': 'Team Two F.C',
            'players': null,
        },
    };
    // const defaultTeams = {
    //     one: {
    //         'team-id': 'one',
    //         'team-name': 'Team One F.C',
    //         'players': null,
    //     },
    //     two: {
    //         'team-id': 'two',
    //         'team-name': 'Team Two F.C',
    //         'players': null,
    //     },
    // };

    // Reset del team
    const resetTeam = (teamId: string) => {
        setTeams((prevTeams: any) => {
            if (!(teamId in defaultTeams)) {
                console.error(`Team ID ${teamId} not found in defaultTeams.`);
                return prevTeams; // Evita errores si el teamId no existe en defaultTeams
            }

            // Clonar el estado anterior
            const updatedTeams = { ...prevTeams };

            // Restablecer el equipo especificado a los valores por defecto
            updatedTeams[teamId] = { ...defaultTeams[teamId] };

            return updatedTeams;
            // // Clonar el estado anterior
            // const updatedTeams = { ...prevTeams };

            // // Restablecer el equipo especificado a los valores por defecto
            // updatedTeams[teamId] = { ...defaultTeams[teamId] };

            // return updatedTeams;
        });
    };


    return (
        <div className="flex flex-col justify-start items-center h-[50%] w-full gap-2">

            {/* Header & Titulo*/}
            <div className='flex w-full bg-white gap-2 p-2 justify-between rounded-md items-center'>
                <h1>{team["team-name"]}</h1>
                <div className='flex flex-row w-auto gap-4 h-full'>
                    <Button href={`/teams/${team["team-id"]}`} variant='secondary' icon={<CiEdit className='w-full h-full' />} />
                    <Button href='' variant='destructive' icon={<GrPowerReset className='w-full h-full' />} onClick={() => {
                        resetTeam(props.id);
                    }} />
                </div>
            </div>


            {/* Content */}
            <div className='w-full h-[100%] overflow-y-scroll no-scrollbar'>
                {team.players ? team.players.map((player: PlayerType
                ) => (
                    <div key={player.player_key} className='w-full flex flex-col justify-center items-center'>
                        <Player
                            player_key={player.player_key}
                            player_image={player.player_image}
                            player_name={player.player_name}
                        />
                        <div className='h-[0.25px] bg-neutral-800 opacity-25 w-[70%]'></div>
                    </div>
                )) : <Subtitle text='No players yet...' />}
            </div>

        </div>
    )
}