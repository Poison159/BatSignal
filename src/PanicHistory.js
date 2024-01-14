import React, { useEffect, useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
    Select,
    MenuItem
} from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

const PanicHistory = () => {
    const [panicHistory, setPanicHistory] = useState([]);
    const authToken = localStorage.getItem('authToken');
    const [selectedStatus, setSelectedStatus] = useState('0');
    const statusOptions = {
        '0': 'All',
        '1': 'In Progress',
        '2': 'Cancelled',
        '3': 'Resolved',
    };

    useEffect(() => {
        const fetchPanicHistory = async () => {
            try {
                const response = await axios.get('https://batman-assessment.fusebox-prod.co.za/api/v1/panic/history', {
                    params: {
                        status_id: selectedStatus !== '0' ? selectedStatus : {},
                    },
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                });
                const responseData = response.data;

                if (responseData.status === 'success') {
                    setPanicHistory(responseData.data.panics);
                } else {
                    console.error('Failed to fetch panic history:', responseData.message);
                }
            } catch (error) {
                console.error('Error fetching panic history:', error.message);
            }
        };

        fetchPanicHistory();
    }, [selectedStatus]);

    const handleCancelPanic = async (panicId) => {
        try {
            const response = await axios.post('https://batman-assessment.fusebox-prod.co.za/api/v1/panic/cancel', { panic_id: panicId }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            });

            if (response.data.status === 'success') {
                setPanicHistory((prevHistory) => prevHistory.filter((panic) => panic.id !== panicId));
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert('Error cancelling panic:');
        }
    };

    const renderPanicListItem = (panic) => (
        <ListItem style={
            {
                backgroundColor: (panic.status.id === 1) ? "green" : (panic.status.id === 2) ? "red" : "orange",
                margin: 5,
                borderRadius:10
            }
        } key={panic.id}>
            <ListItemText
                primary={
                    <div>
                        <Typography variant="body1">
                            Panic Type: {panic.panic_type}
                        </Typography>
                        <Typography variant="body1">
                            Details: {panic.details}
                        </Typography>
                        <Typography variant="body1">
                            Location: ({panic.latitude} , {panic.longitude})
                        </Typography>
                    </div>
                }
                secondary={`Status: ${panic.status.name} | Create on  ${panic.created_at.split('T')[0]} @ ${panic.created_at.split('T')[1].substring(0, 5)}`}
            />
            {
                (panic.status.id === 1) &&
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        color="secondary"
                        aria-label="delete"
                        onClick={() => handleCancelPanic(panic.id)}
                    >
                        <CancelIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            }
        </ListItem>
    );

    return (
        <div>
            <Typography variant="h4">Panic History</Typography>
            <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{ marginBottom: '0px', marginTop: 5 }}
            >
                {Object.keys(statusOptions).map((statusId) => (
                    <MenuItem key={statusId} value={statusId}>
                        {statusOptions[statusId]}
                    </MenuItem>
                ))}
            </Select>

            <List>
                {
                    panicHistory
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .sort((a, b) => a.status.id - b.status.id)
                        .map((panic) => renderPanicListItem(panic))
                }
            </List>
        </div>
    );
};

export default PanicHistory;
