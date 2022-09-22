import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useContext } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { EntriesContext } from '../../context/entries';

interface Props {
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

export const ModalAdd: FC<Props> = ({ openModal, setOpenModal }) => {

    const { addNewEntry } = useContext(EntriesContext);
    const [inputValue, setInputValue] = useState('');
    const [touched, setTouch] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleCloseModal = () => {
        setOpenModal(!openModal);
        setTouch(false);
    }

    const onSaveEntry = () => {
        handleCloseModal();
        addNewEntry(inputValue);
        setInputValue('');
    }

    return (
        <Modal
            open={openModal}
            // onClose={() => handleCloseModal()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: '#2b2b2b',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography variant='h6' sx={{ marginBottom: '20px', marginLeft: '2px' }}>
                    Añade tu entrada
                </Typography>
                <TextField
                    fullWidth
                    placeholder='Nueva entrada'
                    value={inputValue}
                    label='Nueva entrada'
                    onChange={handleInputChange}
                    error={inputValue.length <= 0 && touched}
                    helperText={inputValue.length <= 0 && touched && '*Campo obligatorio'}
                    onBlur={() => setTouch(true)}
                    InputLabelProps={{ color: 'info' }}
                    multiline
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                border: '1px solid #fff !important',
                            },
                        },

                    }}

                />
                <Box display='flex' justifyContent='space-between' sx={{ marginTop: '20px' }}>
                    <Button onClick={() => handleCloseModal()} startIcon={<CloseIcon />} variant='outlined' color='error'>Cancelar</Button>
                    <Button onClick={() => onSaveEntry()} startIcon={<SaveIcon />} variant='lighter'>Guardar</Button>
                </Box>
            </Box>
        </Modal>
    )
}
