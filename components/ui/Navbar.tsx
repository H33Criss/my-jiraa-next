import { AppBar, IconButton, Toolbar, Link, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { FC, useContext } from 'react';
import { UiContext } from '../../context/ui';
import QueueIcon from '@mui/icons-material/Queue';
import NextLink from 'next/link';

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
                <NextLink href={'/'} passHref>
                    <Link underline='none' color='white'>
                        <Typography variant='h5' sx={{ marginLeft: '10px' }}>MyJiraa</Typography>
                    </Link>
                </NextLink>

                <QueueIcon sx={{ marginLeft: '10px' }} />
            </Toolbar>
        </AppBar>
    )
}
