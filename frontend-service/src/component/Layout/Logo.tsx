import {createStyles} from "@mantine/core";


const useStyles = createStyles(theme => ({
    logo: {
        fontWeight: "bolder",
        fontSize: "120%"
    }
}))

export const Logo = () => {
    const {classes} = useStyles()

    return <div className={classes.logo}>TinyDMS</div>
}