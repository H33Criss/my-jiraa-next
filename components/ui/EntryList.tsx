import { Box, List, Paper } from "@mui/material"
import { DragEvent, FC, useContext, useMemo } from 'react';
import { EntriesContext } from "../../context/entries";
import { UiContext } from "../../context/ui";
import { EntryStatus } from "../../interfaces"
import { EntryCard } from "./"
import styles from './Entry.module.css'

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, setDragging } = useContext(UiContext);

    const EntriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [ entries ]);

    const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
        const entry = entries.find(entry => entry._id === e.dataTransfer.getData('text'))!;
        entry.status = status;
        updateEntry(entry);
        setDragging(false);
    }
    const dragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={dragOver}
        >
            <Paper sx={{
                height: 'calc(100vh - 200px)',
                borderRadius: '10px',
            }}>
                <Box
                    className={`${styles.entryList}  ${isDragging ? styles.dragging : styles.entryBg}`}>
                    <List sx={{ opacity: isDragging ? 0.5 : 1, padding: '10px' }}>
                        {
                            EntriesByStatus.map(entry => (
                                <EntryCard key={entry._id} entry={entry} />
                            ))
                        }
                    </List>
                </Box>
            </Paper>
        </div >
    )
}
