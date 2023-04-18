import {Button} from "@mui/joy";
import {useRef} from "react";

export const FileDialogButton = props => {
    const fileInput = useRef();

    const onClick = () => {
        fileInput.current.click();
    };

    const onChange = event => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            //console.log('File loaded: ', file.name, file.type, file.size, reader.result);
            props.onFileLoaded && props.onFileLoaded({
                name: file.name,
                type: file.type,
                size: file.size,
                data: reader.result,
            });
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <Button onClick={onClick}>{props.label}</Button>
            <input
                ref={fileInput}
                type="file"
                style={{ display: 'none' }}
                onChange={onChange}
            />
        </>
    )
};