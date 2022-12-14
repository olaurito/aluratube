import React from "react";

// troca o mode,definindo, envolve a aplicacao toda.
export const ColorModeContext = React.createContext({
    mode: "",
    setMode: () => {
        alert("Você precisa me configurar primeiro!")
    },
    toggleMode: () => {
        alert("Você precisa me configurar primeiro!")
    },
});

export function ColorModeProvider(props) {
    const [mode, setMode] = React.useState(props.initialMode);

    function toggleMode() {
        if (mode === "dark") setMode("light");
        if (mode === "light") setMode("dark");
    }

    return (
        <ColorModeContext.Provider value={{ mode: mode, setMode: setMode, toggleMode: toggleMode }}>
            {props.children}
        </ColorModeContext.Provider>
    );
}