import { useState } from "react"

export const useInput = (init) => {
    const [value, setValue] = useState(init)

    const onChange = (event) => {
        setValue(event.target.value)
    }
    const clear = () => {
        setValue(init)
    }


    return {
        bind:{value, onChange},
        value,
        clear
    }
}