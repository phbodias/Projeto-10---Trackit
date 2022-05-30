import { createContext, useState } from "react";

const ProgressContext = createContext()

export function ProgressProvider({children}) {
    const [progresso, setProgresso] = useState(0)

    return (
        <ProgressContext.Provider value={{progresso, setProgresso}}>
            {children}
        </ProgressContext.Provider>
    )
}

export default ProgressContext;