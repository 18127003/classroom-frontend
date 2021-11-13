import { useState } from "react";


const useChipEditor = ()=>{
    const [values, setValues]= useState<string[]>([])
    const [currentValue, setValue]= useState("")

    const handleDelete = (chipToDelete: string) => () => {
        setValues((chips) => chips.filter((chip) => chip !== chipToDelete));
      };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>)=>{
        if([ 'Space','Enter'].includes(event.code)){
            event.preventDefault();

            var chip= currentValue.trim()
            if(chip){
                setValues([...values, chip])
                setValue("")
            } 
        }
    }

    const handleChange =(event)=>{
        setValue(event.target.value)
    }

    return {
        values,
        currentValue,
        handleDelete,
        handleChange,
        handleKeyDown
    }
}

export default useChipEditor;