import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { DragEvent, FC } from 'react';
import { Entries } from '../../interfaces';
import { useContext } from 'react';
import { UiContext } from '../../context/ui';

interface Props {
    entry: Entries;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { toggleDragging } = useContext(UiContext);

    const handleOnDrag = (e: DragEvent) => {
        e.dataTransfer.setData('text', entry._id);
        toggleDragging();
    }

    return (
        <Card
            draggable
            onDragStart={handleOnDrag}
            sx={{
                marginBottom: '10px',
            }}
            onDragEnd={() => {
                toggleDragging()
            }}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Typography variant='body2' sx={{ whiteSpace: 'pre-line' }}>Hace 30 minutos</Typography>

                </CardActions>
            </CardActionArea>
        </Card>
    )
}
