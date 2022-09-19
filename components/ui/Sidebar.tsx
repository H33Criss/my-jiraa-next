import { Drawer, Toolbar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FC, useContext } from 'react';
import { InboxRounded, MailOutlineSharp } from '@mui/icons-material';
import { UiContext } from '../../context/ui';

interface Props {
    maxWidth: string,
}

export const Sidebar: FC<Props> = ({ maxWidth }) => {

    const { openSideMenu, closeMenu } = useContext(UiContext)

    const contentDrawer = (
        <>
            <Toolbar sx={{ minWidth: maxWidth, color: 'transparent' }} />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxRounded /> : <MailOutlineSharp />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxRounded /> : <MailOutlineSharp />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <>
            <Drawer
                open
                variant='permanent'
                anchor='left'
                sx={{ display: { xs: 'none', md: 'block' }, border: 'none !important' }}
            >
                {contentDrawer}
            </Drawer>

            <Drawer
                open={openSideMenu}
                anchor='left'
                onClose={() => closeMenu()}
                sx={{ display: { md: 'none' }, border: 'none !important' }}
            >
                {contentDrawer}
            </Drawer>
        </>
    )
}
