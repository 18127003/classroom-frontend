import { useEffect, useState } from "react";

type SelectedItem = {
    key: number,
    value: boolean
}

const useCheckboxes = (list: any[])=>{
    const [selectedList, setSelectedList] = useState<SelectedItem[]>([])

    useEffect(()=>{
        setSelectedList(list.map(l=>{return {key: l.id, value:false}}))
    },[list])

    const select = (id:number, value: boolean)=>{
        let item = selectedList.find(i=>i.key===id)
        item.value = value
        setSelectedList([...selectedList])
    }

    const getSelected = ()=>{
        return selectedList.filter(item=>item.value===true)
    }

    const getSelectedAt = (id:number)=>{
        let item = selectedList.find(i=>i.key===id)
        if(item){
            return item.value
        }
        return false
    }

    const anySelected = ()=>{
        return selectedList.some(item=>item.value)
    }

    const allSelected = ()=>{
        return getSelected().length===selectedList.length
    }

    const selectAll = (value: boolean)=>{
        setSelectedList(selectedList.map(item=>{return{...item, value: value}}))
    }

    return {
        select,
        getSelected,
        allSelected,
        selectAll,
        anySelected,
        getSelectedAt
    }
}

export default useCheckboxes;