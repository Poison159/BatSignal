// PanicForm.js
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
    TextField,
    Button,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import axios from 'axios';

const PanicForm = ({ onClose }) => {
    const [responseMessage, setResponseMessage] = useState('');
    const authToken = localStorage.getItem('authToken');

    const formik = useFormik({
        initialValues: {
            longitude: '',
            latitude: '',
            panic_type: '',
            details: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await axios.post('https://batman-assessment.fusebox-prod.co.za/api/v1/panic/send', values, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                });
                const responseData = response.data;
                if (responseData.status === 'validation failure') {
                    setResponseMessage("Incorrect values provided");
                }
                if (responseData.status === 'success') {
                    setResponseMessage(responseData.message);
                } else {
                    setResponseMessage('Failed to raise panic');
                }
            } catch (error) {
                setResponseMessage('Failed to raise panic');
            }
        },
    });

    const handleDialogClose = () => {
        onClose();
        setResponseMessage('');
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
             
                <Grid item xs={6}>
                    <TextField
                        label="Longitude"
                        name="longitude"
                        value={formik.values.longitude}
                        onChange={formik.handleChange}
                        required
                        fullWidth
                        style={{ margin: 5 }}
                    />
                    <TextField
                        label="Panic Type"
                        name="panic_type"
                        value={formik.values.panic_type}
                        onChange={formik.handleChange}
                        fullWidth
                        style={{ margin: 5 }}
                    />
                </Grid>

               
                <Grid item xs={6}>
                    <TextField
                        label="Latitude"
                        name="latitude"
                        value={formik.values.latitude}
                        onChange={formik.handleChange}
                        required
                        fullWidth
                        style={{ margin: 5 }}
                    />
                    <TextField
                        label="Details"
                        name="details"
                        value={formik.values.details}
                        onChange={formik.handleChange}
                        multiline
                        rows={4}
                        fullWidth
                        style={{ margin: 5 }}
                    />
                </Grid>
            </Grid>

            <Button type="submit" variant="contained" color="primary">
                Send Panic
            </Button>

            <Dialog open={!!responseMessage} onClose={handleDialogClose}>
                <DialogTitle>Response</DialogTitle>
                <DialogContent>
                    <p>{responseMessage}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </form>
    );
};

export default PanicForm;
