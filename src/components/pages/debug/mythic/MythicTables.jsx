import {Box} from "@mui/joy";

const input = `

`

export const MythicTables = props => {

    const split = input.split("\n");
    let currentHeading = "";
    const jsonVersion = split.reduce((acc, line) => {
        const splitColon = line.split(":");
        if (splitColon.length === 1 && splitColon[0].trim() !== "") {
            currentHeading = splitColon[0].trim().replaceAll(' ', '_');
            console.log(`Found new Heading: ${currentHeading}`);
            return {
                ...acc,
                [currentHeading]: {},
            };
        } else if(splitColon[0].trim() !== "") {
            return {
                ...acc,
                [currentHeading]: {
                    ...acc[currentHeading],
                    [splitColon[0]]: splitColon[1].trim(),
                },
            };
        }

        return acc;
    }, {});

    console.log(jsonVersion);

    const stringified = Object.keys(jsonVersion).reduce((acc, headingKey) => {
        const heading = jsonVersion[headingKey];
        return `
            ${acc}
            export const ELEMENTS_${headingKey} = {
                ${Object.keys(heading).map(key => `${key}: "${heading[key]}",`).join('\n')}
            };
        `
    }, '');

    console.log(stringified);

    return (
        <Box>
            {stringified}
        </Box>
    );
};