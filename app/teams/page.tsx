'use client'

import { Button } from "@/components/Button";
import Subtitle from "@/components/Subtitle";
import Team from "@/components/Team";
import AppLogo from "@/components/AppLogo";
import { teamsAtom } from "@/lib/store";
import { useAtom } from "jotai";
import Toast from "@/components/Toast";
import { SetStateAction, useState } from "react";

export default function Page() {

    const [teams, setTeams] = useAtom(teamsAtom)

    // State del Toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("")
    const handleOpen = (message: SetStateAction<string>) => {
        setShowToast(true);
        setToastMessage(message)
    };
    const handleClose = () => {
        setShowToast(false);
    };

    return (
        <div className="lg:h-auto h-[95%] bg-neutral-50 gap-2.5 lg:gap-4 backdrop-blur-sm bg-opacity-20 px-6 py-6 lg:px-16 lg:py-12 rounded-md flex flex-col justify-center items-center">
            <div className="flex flex-col gap-4 lg:gap-8 justify-between items-center h-full">

                {/* Title */}
                <div className="flex w-full h-[10%] flex-col justify-center items-center">
                    <AppLogo />
                    <Subtitle text="Select and Edit Teams" />
                </div>

                {/* Teams */}
                <div className="w-full h-[70%] flex flex-col lg:flex-row justify-start items-start gap-2">
                    <Team id={"one"} />
                    <Team id={"two"} />
                </div>

                {/* Navigation */}
                <div className="w-full h-[10%] flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-2">
                    <Button label="Go back" href="/" />
                    <Button
                        label={teams['one'].players?.length === 5 && teams['two'].players?.length === 5 ? 'ready' : 'Missing Players'}
                        variant={teams['one'].players?.length === 5 && teams['two'].players?.length === 5 ? 'ready' : 'disabled'}
                        href=""
                        onClick={() => teams['one'].players?.length === 5 && teams['two'].players?.length === 5 ? handleOpen('Gracias por tenerme en cuenta!😉🥳') : handleOpen('Please, Complete both teams.')}
                    />
                </div>

                {
                    showToast && (<Toast message={toastMessage} onClose={handleClose} />)
                }

            </div>
        </div>
    )
}