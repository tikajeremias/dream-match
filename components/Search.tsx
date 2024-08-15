import { teamsAtom } from '@/lib/store';
import { useAtom } from 'jotai';
import React, { SetStateAction, useState } from 'react'
import { Button } from './Button';
import Player, { PlayerType } from './Player';
import Toast from './Toast';

function Search(props: { teamId: string }) {

    // State de informacion de los equipos
    const [teams, setTeams] = useAtom(teamsAtom)
    const handleSelectPlayer = (teamId: string, newPlayer: any) => {
        if (teams[teamId].players?.length >= 5) { return null } // Prohibe agregar mas de 5 jugadores

        setTeams((prevTeams) => {
            // Clonar el estado anterior
            const updatedTeams = { ...prevTeams };

            // Actualizar el array de players para el equipo especificado
            const currentPlayers = updatedTeams[teamId].players || [];
            const currentPlayers_TeamOne = updatedTeams["one"].players || [];
            const currentPlayers_TeamTwo = updatedTeams["two"].players || [];

            const playerExists_TeamOne = currentPlayers_TeamOne.some(player => player.player_id === newPlayer.player_id);
            const playerExists_TeamTwo = currentPlayers_TeamTwo.some(player => player.player_id === newPlayer.player_id);

            if (!playerExists_TeamOne && !playerExists_TeamTwo) {
                // Si el jugador no existe, lo agregamos
                updatedTeams[teamId].players = [...currentPlayers, newPlayer];
            } else {
                // Mostrar Toast
                handleOpen('Already in the match!')
            }
            return updatedTeams;
        });
    }

    // Valor del input
    const [inputValue, setInputValue] = useState('');
    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setInputValue(event.target.value);
    };

    // State del Toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("")
    const handleOpen = (message) => {
        setShowToast(true);
        setToastMessage(message)
    };
    const handleClose = () => {
        setShowToast(false);
    };

    // API Response
    const [data, setData] = useState(null)

    async function getPlayers() {
        if (inputValue === "") { handleOpen('Please type a player name!') }
        const res = await fetch(`/api/searchPlayer?name=${inputValue}`);
        const data = await res.json();
        console.log(data)
        if (!data.error) {
            setData(data)
        } else {
            setData([])
        }
    }


    return (
        <div className="w-full h-auto lg:h-full gap-2 flex flex-col overflow-scroll no-scrollbar">

            {/* SEARCH */}
            <div className="flex w-full bg-white gap-2 p-2 justify-between rounded-md items-center ">
                <input
                    placeholder="Search..."
                    className="w-full h-auto"
                    value={inputValue}
                    onChange={handleChange} />
                <Button onClick={getPlayers} variant={'secondary'} label='Search' href='' />
            </div>

            {/* LISTA */}
            <div className="flex flex-col gap-2 rounded-md lg:h-full overflow-scroll no-scrollbar">
                {data && (data.map((player: PlayerType, index: number) => (
                    <div key={player.player_key || index} onClick={() => handleSelectPlayer(props.teamId, player)}>
                        <Player
                            player_key={player.player_key}
                            player_image={player.player_image}
                            player_name={player.player_name}
                        />
                    </div>
                )))}
                {data !== null && data?.length == 0 && (<p className='text-white'>No results...</p>)}
            </div>

            {
                // Toast
                showToast && (<Toast message={toastMessage} onClose={handleClose} />)
            }

        </div>
    )
}

export default Search