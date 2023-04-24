import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/joy";
import {IMAGES_DB} from "../imagedb.js";
import Box from "@mui/joy/Box";

const createThumbnail = (imageData, width, height) =>  new Promise((resolve) => {
    const image = new window.Image();
    image.src = imageData;
    image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width, height);
        const result = canvas.toDataURL();
        resolve(result);
    };
});

const cache = {};
const imageLoader = async (id, isThumbnail, setImageData) => {
    const key = `${id}-${isThumbnail ? 'thumb' : 'full'}`;
    if (!cache[key]) {
        const file = await IMAGES_DB.getItem(id);

        if (!file) {
            console.error(`Image with id ${id} not found`);
            return;
        }

        if (isThumbnail) {
            cache[key] = await createThumbnail(file.data, 256, 256);
        } else {
            cache[key] = file.data;
        }
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
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
            }}
        >
            <CircularProgress />
        </Box>
    );
};