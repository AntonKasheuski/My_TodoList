import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    renameItem: (title: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [spanValue, setSpanValue] = useState<string>(props.title)

    const editModeOn = () => {
        setEditMode(true)
    }
    const editModeOff = () => {
        setEditMode(false)
        props.renameItem(spanValue)
    }
    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setSpanValue(e.currentTarget.value)
    }

    return (
        editMode
            ? (<span>
                <input
                    value={spanValue}
                    onChange={onChangeValue}
                />
                <button onClick={editModeOff}>{'>'}</button>
            </span>)
            : <span onDoubleClick={editModeOn}>{props.title}</span>
    );
};