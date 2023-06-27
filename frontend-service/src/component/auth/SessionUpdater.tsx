import {useEffect, useRef} from "react";
import AuthService from "../../service/AuthService.ts";
import {DateTime} from "luxon";
import {TimeUnits} from "../../lib/datetime/time.ts";


export const SessionUpdater = () => {

    const lastUpdate = useRef<DateTime>(DateTime.now())

    const handleMouseDown = () => {
        if (DateTime.now().diff(lastUpdate.current, "seconds").seconds > 10) {
            lastUpdate.current = DateTime.now()
            AuthService.updateToken(TimeUnits.MINUTE * 5)
        }
    }

    useEffect(() => {
        window.document.addEventListener("mousedown", handleMouseDown)

        return () => window.document.removeEventListener("mousedown", handleMouseDown)
    }, [])

    return <></>
}