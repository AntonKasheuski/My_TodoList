import React, {useState} from 'react';
import {AddItem} from "./AddItem";

type PropsType = {
    title: string
    renameItem: (title: string) => void
    disabled: boolean
}

export const EditableSpan = (props: PropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    const editModeOn = () => {
        !props.disabled && setEditMode(true)
    }
    const editModeOff = (title: string) => {
        setEditMode(false)
        props.renameItem(title)
    }

    return (
        editMode
            ? (<span>
                <AddItem title={props.title} addItem={editModeOff} disabled={props.disabled}/>
            </span>)
            : <span onDoubleClick={editModeOn}>{props.title}</span>
    );
};