import { createTheme } from "@nextui-org/react"

export const darkTheme = createTheme({
    type: "dark",
    theme: {
        colors: {
            white: '#fff',
            black: '#1A1A25',

            // primary: "#232532",
            secondary: "#343644",
            greyLetter: "#8b949e",

            background: "$black",

            backgroundContrast: "$secondary",
            text: "$white",

            link: "$white",
            selection: "$blue800",
            error: "#C22020",
        //     success: "#6daa37",
        },
        fonts: {
            sans: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
            mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono',
            'DejaVu Sans Mono', 'Bitstream Vera Sans Mono'`,
            mono: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
            mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono',
            'DejaVu Sans Mono', 'Bitstream Vera Sans Mono'`
        }
    }

})