import {Button} from "@mui/joy";
import {useRef, useState} from "react";

export const FileDialogButton = props => {
    const [loading, setLoading] = useState(false);
    const fileInput = useRef();

    const onClick = () => {
        fileInput.current.click();
    };

    const onChange = event => {
        if (event.target.files.length === 0) return;

        setLoading(true);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            //console.log('File loaded: ', file.name, file.type, file.size, reader.result);
            setLoading(false);
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
            <Button onClick={onClick} loading={loading}>{props.label}</Button>
            <input
                ref={fileInput}
                type="file"
                style={{ display: 'none' }}
                onChange={onChange}
            />
        </>
    )
};