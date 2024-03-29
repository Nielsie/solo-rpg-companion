import {AspectRatio, Card, FormControl, FormLabel, IconButton, Input, Sheet, Stack, Switch, Typography} from "@mui/joy";
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import {useState} from "react";
import {FileDialogButton} from "../../../../../../layout/inputs/FileDialogButton";
import {IMAGES_DB} from "../../../../../../../image-storage/imagedb.js";
import {Image} from "../../../../../../../image-storage/components/Image.jsx";
import {ImageGalleryButton} from "../../../../../../../image-storage/components/ImageGalleryButton.jsx";

export const CharacterEditor = props => {
    const [name, setName] = useState(props.name || '');
    const [description, setDescription] = useState(props.description || '');
    const [imageId, setImageId] = useState(props.imageId || null);
    const [isPlayer, setIsPlayer] = useState(props.isPlayer || false);
    const [isActive, setIsActive] = useState(props.isActive);

    const onNameChange = event => setName(event.target.value);
    const onDescriptionChange = event => setDescription(event.target.value);
    const onImageDataLoaded = async (file) => {
        const id = await IMAGES_DB.setItem(file);
        setImageId(id);
    };
    const onImageSelected = id => setImageId(id);
    const onIsPlayerToggleClick = event => setIsPlayer(event.target.checked);
    const onIsActiveToggleClick = event => setIsActive(event.target.checked);

    const onSubmitClick = () => props.onSubmitClick && props.onSubmitClick({
        name,
        description,
        imageId,
        isPlayer,
        isActive,
    });
    const onCancelClick = () => props.onCancelClick && props.onCancelClick();


    return (
        <Card
            variant="outlined"
            sx={{width: '100%'}}
        >
            <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={1}>
                    <Stack direction="column" spacing={1}>
                        <Typography level="body3">Image Url</Typography>
                        <FileDialogButton label="Upload Image" onFileLoaded={onImageDataLoaded}/>
                        <ImageGalleryButton onImageSelected={onImageSelected} />
                    </Stack>
                    <AspectRatio ratio="1" sx={{width: '100%'}}>
                        <Image id={imageId} isThumbnail={false}/>
                    </AspectRatio>
                </Stack>
                <Stack direction="column" spacing={1}>
                    <Typography level="body3">Character Name</Typography>
                    <Input onChange={onNameChange} value={name}/>
                </Stack>
                <Stack direction="column" spacing={1}>
                    <Typography level="body3">Description</Typography>
                    <Input onChange={onDescriptionChange} value={description}/>
                </Stack>
                <Stack direction="column" spacing={1}>
                    <Typography level="body3">Is Player Character?</Typography>
                    <Stack direction="row">
                        <Switch
                            checked={isPlayer}
                            color="primary"
                            size="sm"
                            variant="solid"
                            startDecorator={<Typography level="body3">NPC</Typography>}
                            endDecorator={<Typography level="body3">Player</Typography>}
                            onChange={onIsPlayerToggleClick}
                        />
                    </Stack>
                </Stack>
                <Stack direction="column" spacing={1} sx={{flexWrap: 'wrap', alignContent: 'flex-start'}}>
                    <Typography level="body3">Is Active?</Typography>
                    <Stack direction="row" sx={{width: '100%'}}>
                        <Switch
                            checked={isActive}
                            color="primary"
                            size="sm"
                            variant="solid"
                            onChange={onIsActiveToggleClick}
                        />
                        <Stack direction="row" sx={{ml: 'auto'}} spacing={1}>
                            <IconButton variant="solid" color="success" onClick={onSubmitClick}>
                                <CheckIcon/>
                            </IconButton>
                            <IconButton variant="solid" color="danger" sx={{ml: 'auto'}} onClick={onCancelClick}>
                                <CancelIcon/>
                            </IconButton>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    );
};