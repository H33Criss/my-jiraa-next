import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography, Box } from "@mui/material";
import { GetServerSideProps } from 'next'
import { Mainlayout } from "../../components/layouts";
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import { ChangeEvent, FC, PropsWithChildren, useContext, useMemo, useState } from "react";
import { EntryStatus } from "../../interfaces";
import { dbActions } from "../../database";
import { Entries } from '../../interfaces/entries';
import { EntriesContext } from "../../context/entries";
import { useRouter } from 'next/router';
import { dateFunctions } from "../../utils";


const statusEntries = ['pending', 'in-progress', 'finished'];


interface Props extends PropsWithChildren {
    entry: Entries,
}

const EntryPage: FC<Props> = ({ entry }) => {
    const router = useRouter();
    const { updateEntry } = useContext(EntriesContext)
    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false);
    const isNotValid = useMemo(() => inputValue.length < 1 && touched, [inputValue, touched]);



    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value as EntryStatus);
    }

    const onSaveData = () => {
        if (inputValue.trim().length < 1) return;
        updateEntry({
            ...entry,
            status: status,
            description: inputValue,
        });
        router.replace('/');
    }

    return (
        <Mainlayout title="Editar entry">
            <Grid container justifyContent='center'>

                <Grid item xs={12} sm={7} lg={6} >
                    <Card>
                        <CardHeader
                            sx={{ paddingBottom: '0px' }}
                            title='Descripción:'
                            // title={`Entrada: '${id}'`}
                            subheader={`"${inputValue.substring(0, 93)}${inputValue.length > 93 ? '...' : ''}"`}

                        />

                        <CardContent sx={{ paddingTop: '0px' }}>
                            <Box display='flex' justifyContent='end' sx={{ marginBottom: '10px' }} >
                                <Typography fontStyle={'italic'}>- {dateFunctions.dateFormat(entry.createdAt)}</Typography>
                            </Box>
                            <TextField
                                multiline
                                value={inputValue}
                                onChange={onInputChange}
                                helperText={isNotValid && 'Ingrese nuevo contenido.'}
                                error={isNotValid}
                                label='Contenido'
                                InputLabelProps={{ color: 'info' }}
                                onBlur={() => setTouched(true)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            border: '1px solid #fff !important',
                                        },
                                    },
                                }}
                                fullWidth />
                            <FormControl sx={{ marginLeft: '5px', marginTop: '10px' }}>
                                <FormLabel sx={{ color: 'white !important' }}>Estado:</FormLabel>
                                <RadioGroup value={status} onChange={onStatusChange}>
                                    {
                                        statusEntries.map((status) => (
                                            <FormControlLabel
                                                key={status}
                                                value={status}
                                                label={capitalize(status)}
                                                control={<Radio />}

                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button disabled={inputValue.length < 1} onClick={onSaveData} startIcon={<SaveAsOutlinedIcon />}
                                variant="contained" fullWidth sx={{
                                    marginBottom: '10px',
                                }}> GUARDAR</Button>
                        </CardActions>

                    </Card>
                </Grid>



            </Grid>
        </Mainlayout>
    )

}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.params as { id: string };
    const entry = await dbActions.getEntryByID(id);


    // !entry -> es nulo?
    // !!entry -> dejo de ser nulo?
    if (!entry) return {
        redirect: {
            destination: '/',
            permanent: false,
        }
    }
    return {
        props: {
            entry,
        }
    }
}

export default EntryPage;


