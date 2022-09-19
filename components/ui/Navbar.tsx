import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { FC, useContext } from 'react';
import { UiContext } from '../../context/ui';
import QueueIcon from '@mui/icons-material/Queue';

interface Props {
    maxWidth: string,
}
export const Navbar: FC<Props> = ({ maxWidth }) => {

    const { openMenu } = useContext(UiContext);
    return (
        <AppBar position='sticky' sx={{

            paddingLeft: { md: maxWidth },

        }}>
            <Toolbar>
                <IconButton onClick={() => openMenu()} sx={{ display: { md: 'none' } }}>
                    <MenuOutlinedIcon />
                </IconButton>
                <Typography variant='h5' sx={{ marginLeft: '10px' }}>MyJiraa</Typography>
                <QueueIcon sx={{ marginLeft: '10px' }} />
            </Toolbar>
        </AppBar>
    )
}
