import {AspectRatio, Avatar} from "@mui/joy";
import {Image} from "./Image.jsx";

export const ImageAvatar = props => {
    return (
        <Avatar alt={props.title} sx={{mr: 2, borderRadius: 'sm'}}>
            {props.imageId && (
                <AspectRatio ratio="1" sx={{width: '100%'}}>
                    <Image id={props.imageId} width={52} isThumbnail={!props.isNotThumbnail}/>
                </AspectRatio>
            )}
            {!props.imageId && props.title && props.title[0]}
        </Avatar>
    );
};