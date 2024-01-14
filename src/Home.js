// PanicButton.js
import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import PanicForm from './PanicForm';
import './Home.css'
import PanicHistory from './PanicHistory';
import ButtonAppBar from './AppBar';

const PanicButton = () => {
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(null);

    const handleClose = () => {
        setOpen(false);
        setSuccess(null);
    };

    const handleSubmit = (isSuccess) => {
        setSuccess(isSuccess);
        setOpen(true);
    };

    return (
        <div className='blurred-background'>
            <ButtonAppBar/>
            <div className='container'>
                
                <div className="center">
                    <Button onClick={() => setOpen(true)} variant="contained" color="secondary">
                        Panic Button
                    </Button>
                    <hr />
                </div>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Panic Form</DialogTitle>
                    <DialogContent>
                        <PanicForm onClose={handleClose} onSubmit={handleSubmit} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={success !== null} onClose={handleClose}>
                    <DialogTitle>{success ? 'Panic Raised Successfully' : 'Failed to Raise Panic'}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className='center-history'>
                    <PanicHistory />
                </div>
        </div>


    );
};

export default PanicButton;
