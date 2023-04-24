import {AspectRatio, Button, Grid, List, ListItem, Modal, ModalClose, ModalDialog, Stack, Typography} from "@mui/joy";
import {useEffect, useState} from "react";
import {Image} from "./Image.jsx";
import {IMAGES_DB} from "../imagedb.js";

export const ImageGalleryButton = props => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [images, setImages] = useState([]);

    const onGalleryOpenClick = () => setIsGalleryOpen(true);
    const onGalleryClose = () => setIsGalleryOpen(false);

    useEffect(() => {
        const loadImages = async () => {
            const images = await IMAGES_DB.store.keys();
            setImages(() => images);
        };
        loadImages();
    });

    const onImageClick = id => () => {
        props.onImageSelected && props.onImageSelected(id);
        onGalleryClose();
    };

    return (
        <>
            <Button onClick={onGalleryOpenClick}>{props.label || 'Open Image Gallery'}</Button>

            <Modal open={isGalleryOpen} onClose={onGalleryClose}>
                <ModalDialog
                    layout="fullscreen"
                    aria-labelledby="dialog-title"
                    aria-describedby="dialog-description"
                >
                    <ModalClose />
                    <Typography level="h4">Gallery</Typography>
                    <Grid container spacing={1} sx={{overflow: 'scroll', height: '100%', pb: 2}}>
                        {images.map(image => (
                            <Grid item xs={6} key={image}>
                                <AspectRatio ratio="1" onClick={onImageClick(image)}>
                                    <Image id={image} isThumbnail={true}/>
                                </AspectRatio>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Button onClick={onGalleryClose}>Close</Button>
                        </Grid>
                    </Grid>
                </ModalDialog>
            </Modal>
        </>
    )
}