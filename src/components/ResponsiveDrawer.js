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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const drawerWidth = 240;


let themes = createTheme({
    components: {
        MuiAppBar: {
            defaultProps: {
                sx: {
                    width: '100%',
                    ml: {sm: `${drawerWidth}px`},
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }
            }
        },
        MuiIconButton: {
            defaultProps: {
                sx: {
                    mr: 2,
                    display: {sm: 'none'}
                }
            },
        },
        MuiDrawer: {
             defaultProps: {
                 sx: {
                     display: {xs: 'block', sm: 'none'},
                     '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
                 }
             },
        },

    },
});


function ResponsiveDrawer(props) {
    const {window} = props
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    };

    const drawer = (
        <div>
            <Toolbar/>
            <Divider/>
            <List>
                {props.fav.map((text, index) => (
                    <ListItem button key={index}>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={themes}>
            <CssBaseline/>
            <AppBar
                position='fixed'
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Weather App </Typography>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{
                    width: {sm: drawerWidth},
                    flexShrink: {sm: 0},
                }}
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>


        </ThemeProvider>

    );
}

export default ResponsiveDrawer;