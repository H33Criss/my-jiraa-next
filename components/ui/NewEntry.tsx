import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useContext, useState } from 'react';
import { ModalAdd } from "./";
import { UiContext } from "../../context/ui";



export const NewEntry = () => {
    const [openModal, setOpenModal] = useState(false);
    const { isAdding } = useContext(UiContext);
    return (
        <Box sx={{ paddingRight: '20px' }}>
            <ModalAdd openModal={openModal} setOpenModal={setOpenModal} />
            <Button disabled={isAdding} size='small' variant="contained" color='primary' onClick={() => setOpenModal(!openModal)} startIcon={<AddIcon />}>Nueva</Button>
            {/* <Button size='small' onClick={() => setOpenModal(!openModal)} startIcon={<AddIcon />} variant="lighter">Añadir</Button> */}
        </Box>
    )
}
