import React from "react";
import {ThemeProvider} from "styled-components";
import {CSSReset} from "../src/components/CSSRReset";
import {ColorModeContext, ColorModeProvider} from "../src/components/Menu/components/ColorMode";

const theme = {
    light: {
        backgroundBase: "#f9f9f9",
        backgroundLevel1: "#ffffff",
        backgroundLevel2: "#f0f0f0",
        borderBase: "#e5e5e5",
        textColorBase: "#222222",
    },
    dark: {
        backgroundBase: "#181818",
        backgroundLevel1: "#202020",
        backgroundLevel2: "#313131",
        borderBase: "#383838",
        textColorBase: "#FFFFFF",
    }
};

function ProviderWrapper(props) {
    return (
        <ColorModeProvider initialMode={"light"}>
            {props.children}
        </ColorModeProvider>
    )
}

// _app.js -> Definições globais do NextJS
//themeProvider -> Prover o tema para a app toda, estrutura global que amarra a apllicação
//ColorModeProvider -> Prove o state de light ou dark mode para td mundo
function MyApp({Component, pageProps}) {
    const contexto = React.useContext(ColorModeContext);
    return (
        <ThemeProvider theme={theme[contexto.mode]}>
            <CSSReset/>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default function _App(props) {
    return (
        <ProviderWrapper>
            <MyApp {...props}/>
        </ProviderWrapper>
    )
};

