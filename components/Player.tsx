import Image from "next/image";

export type PlayerType = {
    player_key: string;
    player_image: string;
    player_name: string;
}

function Player({ ...props }: PlayerType) {
    return (
        <div className="flex flex-row items-center justify-start p-2 w-full gap-2 p-2" key={props.player_key}>

            {props.player_image === '' ? (
                <div className="w-8 h-8 bg-neutral-800 rounded-lg" />
            ) : <Image width={100} height={100} className="w-8 h-8 rounded-[50%]" src={props.player_image} alt={"Player image"} />}

            <p className='text-white'>{props.player_name}</p>
        </div>
    )
}

export default Player