import { Box, List, Paper } from "@mui/material"
import { FC, useContext } from 'react';
import { EntriesContext } from "../../context/entries";
import { EntryStatus } from "../../interfaces"
import { EntryCard } from "./"

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries } = useContext(EntriesContext);
    const EntriesByStatus = entries.filter(entry => entry.status === status);
    return (
        <div>
            <Paper sx={{
                height: 'calc(100vh - 200px)',
            }}>
                <Box sx={{
                    backgroundColor: '#2b2b2b', height: 'calc(100vh - 200px)',
                    overflow: 'auto', overflowX: 'hidden',
                    "&::-webkit-scrollbar": {
                        width: "3px",
                        bgcolor: "#1a1a1a",

                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#fff",
                        border: "7px none #fffff",
                        borderRadius: "10px",
                    },

                }}>
                    <List sx={{ opacity: 1, padding: '10px' }}>
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
