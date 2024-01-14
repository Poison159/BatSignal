import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const ButtonAppBar = () => {
    const navigate = useNavigate(); 

    const logOut = () => {
        localStorage.setItem('authToken', null);
        navigate('./Login');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{backgroundColor:"rgb(111, 45, 114)"}} position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Bat Signal
                    </Typography>
                    <Button onClick={() => { logOut() }
                    } color="inherit">LOGOUT</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ButtonAppBar;