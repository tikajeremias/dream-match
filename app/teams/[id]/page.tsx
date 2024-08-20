"use client"

import AppLogo from "@/components/AppLogo"
import { Button } from "@/components/Button"
import Player, { PlayerType } from "@/components/Player"
import Search from "@/components/Search"
import Subtitle from "@/components/Subtitle"
import { teamsAtom } from "@/lib/store"
import { useAtom } from "jotai"
import { redirect } from "next/navigation"
import { SetStateAction, useState } from "react"

export default function Page({ params }: { params: { id: string } }) {

    if (params.id !== "one" && params.id !== "two") {
        redirect('/')
    }

    const [teams, setTeams] = useAtom(teamsAtom)
    const team = teams[params.id]

    const [teamName, setTeamName] = useState(team["team-name"])
    const [inputDisabled, setInputDisabled] = useState(true)

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setTeamName(event.target.value);
    };

    const handleSaveTeamName = () => {
        setInputDisabled(!inputDisabled)
        setTeams((prevTeams: any) => {
            const updatedTeams = { ...prevTeams };

            // Actualizar el nombre del equipo especificado
            updatedTeams[params.id]['team-name'] = teamName;

            return updatedTeams;
        })
    }

    const handleSelectPlayer = (teamId: string, newPlayer: any) => {
        setTeams((prevTeams: any) => {
            // Clonar el estado anterior
            const updatedTeams = { ...prevTeams };

            // Actualizar el array de players para el equipo especificado
            const currentPlayers = updatedTeams[teamId].players || [];
            const playerExists = currentPlayers.some((player: { player_id: any }) => player.player_id === newPlayer.player_id);
            if (playerExists) { updatedTeams[teamId].players = currentPlayers.filter((player: { player_id: any }) => player.player_id !== newPlayer.player_id); }

            return updatedTeams;
        });
    }

    return (
        <div className="lg:h-auto lg:max-h-[95%] h-[95%] bg-neutral-50 gap-2.5 lg:gap-4 backdrop-blur-sm bg-opacity-20 px-6 py-6 lg:px-16 lg:py-12 rounded-md flex flex-col justify-center items-center">
            <div className="flex flex-col gap-4 justify-between items-center w-full h-full overflow-scroll no-scrollbar">

                {/* Title */}
                <div className="w-full h-auto">
                    <AppLogo />
                    <Subtitle text="Search and select your players" />
                </div>

                {/* Input de editar nombre */}
                <div className="flex h-auto w-full bg-white gap-2 pr-2 justify-between rounded-md items-center">
                    <input className={inputDisabled ? "w-full h-full bg-neutral-400 text-neutral-200 p-2" : "w-full h-full p-2"} disabled={inputDisabled} onChange={handleChange} type="text" value={teamName}></input>
                    <Button href="" label={inputDisabled ? "Edit" : "Save"}
                        variant={"secondary"}
                        onClick={handleSaveTeamName} />
                </div>

                {/* Jugadores seleccionados y Search */}
                <div className="w-full lg:h-full h-[70%] flex flex-col justify-start items-start no-scrollbar overflow-scroll">
                    {
                        team.players ? team.players.map((player: PlayerType) => (
                            <div key={player.player_key} className="w-full h-auto lg:h-full"
                                onClick={() => handleSelectPlayer(params.id, player)}>
                                <Player
                                    player_key={player.player_key}
                                    player_image={player.player_image}
                                    player_name={player.player_name}
                                />
                            </div>
                        )) : (<Subtitle text="No players yet..." />)
                    }
                    <Search teamId={params.id} />
                </div>

                {/* Boton de completar */}
                <div className="w-full h-[10%] flex flex-col lg:flex-row justify-center lg:justify-end items-center gap-2">
                    <Button href={'/teams'} label="Complete" />
                </div>

            </div>
        </div>
    )
}