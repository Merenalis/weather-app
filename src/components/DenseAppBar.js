import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {createTheme} from '@mui/system';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar/>
            <Divider/>
            <List>
                {props.fav.map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const themeAppBar = createTheme({
        width: {sm: `100%`},
        ml: {sm: `${drawerWidth}px`},
        zIndex: (theme) => theme.zIndex.drawer + 1,
    });
    const themeBox = createTheme({
        width: {sm: drawerWidth},
        flexShrink: {sm: 0}
    });
    const themeDrawerTemp = createTheme({
        display: {xs: 'block', sm: 'none'},
        paper: {boxSizing: 'border-box', width: drawerWidth}
    });
    const themeDrawerPerm = createTheme({
        display: {xs: 'none', sm: 'block'},
        paper: {boxSizing: 'border-box', width: drawerWidth}

    });
    return (
        <div>
            <CssBaseline/>
            <AppBar
                position='fixed'
                sx={{
                    width: themeAppBar.width,
                    ml: themeAppBar.ml,
                    zIndex: themeAppBar.zIndex
                }}

            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Weather App </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{width: themeBox.width, flexShrink: {sm: themeBox.flexShrink}}}
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: themeDrawerTemp.display,
                        '& .MuiDrawer-paper': themeDrawerTemp.paper,
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: themeDrawerPerm.display,
                        '& .MuiDrawer-paper': themeDrawerPerm.paper,
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

        </div>
    );
}

export default ResponsiveDrawer;