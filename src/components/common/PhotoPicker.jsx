import React from "react";
// import { ReactDOM } from "react-dom";
import { createPortal } from 'react-dom';

function PhotoPicker({ onChange }) {

    const component = (<input type="file" hidden id="photo-picker" onChange={onChange} />);
    return createPortal(
        component,
        document.getElementById("photo-picker-element")
    );

}

export default PhotoPicker;