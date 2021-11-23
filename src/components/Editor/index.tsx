import React, {useRef} from 'react';
import JoditEditor from "jodit-react";
import { EditorProps } from '@/@types/props';

const Editor: React.FC<EditorProps> = ({content, onChange}) => {
	const editor = useRef(null)
	
	const config = {
		readonly: false
	}
	
	return (
        <JoditEditor
            ref={editor}
            value={content}
            config={config}
		    // tabIndex={1} // tabIndex of textarea
		    onBlur={onChange} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => {}}
        />
    );
}

export default Editor;