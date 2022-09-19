import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { FC } from 'react';
import { Entries } from '../../interfaces';

interface Props {
    entry: Entries;
}

export const EntryCard: FC<Props> = ({ entry }) => {
    return (
        <Card
            sx={{
                marginBottom: '10px',
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
