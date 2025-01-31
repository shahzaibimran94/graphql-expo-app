import * as React from 'react';
import { View } from 'react-native';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { CREATE_DEVICE } from '@/graphql/mutations';
import { useMutation } from '@apollo/client';
import { Account } from "@/types";

interface Props {
    account: Account;
    close: () => void;
    deviceCreated: () => void;
}

export default function DeviceForm(props: Props) {
    const [form, setForm] = React.useState({
        name: '',
        type: '',
    });

    const [createDevice] = useMutation(CREATE_DEVICE, {
        onCompleted: () => {
            props.close();
        },
    });

    const handleChange = (e: any) => setForm(form => ({
        ...form,
        [e.target.name]: e.target.value
    }));

    const _createDevice = async () => {
        try {
            await createDevice({ 
                variables: {
                    name: form.name,
                    type: form.type,
                    accountId: props.account._id
                }
            });

            alert("Device created successfully!");
        } catch (error: any) {
            alert(error.message);
        }
    }

    return (
        <View>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                Create a Device for { props.account?.name }
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >

                <Grid sx={{ flexGrow: 1, justifyContent: 'center' }} container spacing={2}>
                    <Grid item xs={12}>
                        <TextField sx={{ width: '100%' }} id="outlined-basic" label="Name" variant="outlined" name="name" value={form.name} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField sx={{ width: '100%' }} id="outlined-basic" label="Type" variant="outlined" name="type" value={form.type} onChange={handleChange} />
                    </Grid>
                </Grid>

                <Grid sx={{ flexGrow: 1, justifyContent: 'flex-end', mt: 1 }} container spacing={2}>
                    <Grid item>
                        <Button size="medium" variant="outlined" onClick={() => props.close()}>Cancel</Button>
                    </Grid>
                    <Grid item>
                        <Button size="medium" variant="contained" onClick={_createDevice}>Submit</Button>
                    </Grid>
                </Grid>

            </Box>
        </View>
    )
}