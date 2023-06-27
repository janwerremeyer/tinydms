import {useEffect, useRef, useState} from "react";
import AuthService from "../../service/AuthService.ts";
import jwt_decode from "jwt-decode";
import {DateTime} from "luxon"
import {TimeUnits} from "../../lib/datetime/time.ts";

export const SessionTimer = () => {

    const [left, setLeft] = useState<string | undefined>(undefined)
    const isUpdating = useRef(false)

    const calculateTime = () => {
        const token = AuthService.getToken()
        if (!token) {
            return
        }

        const decoded = jwt_decode(token) as any

        const exp = DateTime.fromSeconds(decoded.exp)
        const now = DateTime.now()

        const diffForDisplay = exp.diff(now, ["minutes", "second"])

        const diffForAuth = exp.diff(now, ["seconds"])
        if (diffForAuth.toObject()?.seconds as number <= 5) {
            if (!isUpdating.current) {
                isUpdating.current = true
                AuthService.updateToken(TimeUnits.MINUTE * 5, () => {
                    isUpdating.current = false
                })
            }
        }


        const formattedMinutes = diffForDisplay.toObject().minutes?.padStart(2) as string
        const formattedSeconds = Math.ceil(diffForDisplay.toObject()?.seconds as number).padStart(2) as string

        setLeft(`${formattedMinutes}:${formattedSeconds}`)


    }

    useEffect(() => {
        const intervalId = window.setInterval(calculateTime, 1000)

        return () => {
            window.clearInterval(intervalId)
        }
    }, [calculateTime])

    return <div>{left}</div>
}