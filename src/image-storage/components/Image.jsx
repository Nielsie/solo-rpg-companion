import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/joy";
import {IMAGES_DB} from "../imagedb.js";

const cache = {};
const imageLoader = async (id, isThumbnail, setImageData) => {
    const key = `${id}-${isThumbnail ? 'thumb' : 'full'}`;
    if (!cache[key]) {
        const file = await IMAGES_DB.getItem(id);

        if (!file) {
            console.error(`Image with id ${id} not found`);
            return;
        }

        // todo thumbnail data creation if necessary
        cache[key] = file.data;
    }

    setImageData(cache[key]);
};

export const Image = props => {
    const [imageData, setImageData] = useState(null);
    const {id, isThumbnail, ...rest} = props;

    useEffect(() => {
        if (props.id) {
            imageLoader(props.id, props.isThumbnail, setImageData);
        }
    }, [props.id, props.isThumbnail]);

    if (!props.id) {
        return null;
    }

    if (imageData) {
        return (
            <img
                src={imageData || ''}
                {...rest}
            />
        );
    }

    return (
        <CircularProgress />
    );
};