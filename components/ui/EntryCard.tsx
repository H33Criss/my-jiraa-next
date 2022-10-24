import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { DragEvent, FC } from 'react';
import { Entries } from '../../interfaces';
import { useContext } from 'react';
import { UiContext } from '../../context/ui';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

interface Props {
    entry: Entries;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { setDragging, isDragging } = useContext(UiContext);
    const router = useRouter();

    const handleOnDrag = (e: DragEvent) => {
        e.dataTransfer.setData('text', entry._id);
        setDragging(true);
    }

    const onClickToEdit = () => {
        router.push(`/entries/${entry._id}`)
    }

    return (
        <Card
            draggable
            onDragStart={handleOnDrag}
            sx={{
                marginBottom: '10px',
            }}
            onDragEnd={() => {
                setDragging(false)
            }}
        >
            <CardActionArea onClick={onClickToEdit}>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Typography variant='body2' fontStyle={'italic'} sx={{ whiteSpace: 'pre-line' }}>
                        {dateFunctions.dateFormat(entry.createdAt)}
                    </Typography>

                </CardActions>
            </CardActionArea>
        </Card>
    )
}
