import * as React from 'react';
import { View } from 'react-native';
import { Account } from "@/types";
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useLazyQuery } from '@apollo/client';
import { GET_ACCOUNT_DEVICES } from '@/graphql/queries';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Devices from '@/components/Devices';
import DeviceForm from './DeviceForm';

interface Props {
    accounts: Account[],
    loading: boolean;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 250,
    maxWidth: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Accounts(props: Props) {
    const [open, setOpen] = React.useState(false);
    const [selectedAccount, setAccountForDevice] = React.useState<Account | null>(null);
    const [getAccountDevices, { data: accountDevices, loading }] = useLazyQuery(GET_ACCOUNT_DEVICES, {
        fetchPolicy: 'network-only'
    });

    const viewAccountDevices = (id: string) => {
        setOpen(true);
        getAccountDevices({ variables: { id } });
    }

    const handleDeviceCreateEvent = () => {
        setAccountForDevice(null)
    }
    
    return (
        <View>
            <Container>
                <Typography sx={{ mt: 2, mb: 2 }} variant="h5" component="div">
                    Accounts
                </Typography>
            </Container>
            <Container sx={{ height: 'calc(100vh - 200px)', overflow: 'scroll' }}>
                <Grid container spacing={1}>
                    { props?.accounts && props?.accounts.map((account: Account) => (<Grid item xs={12} md={4} key={account._id}>
                    <Card>
                        <CardContent>
                        <Typography variant="h5" component="div">
                            { account.name }
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{account.email}</Typography>
                        </CardContent>
                        <CardActions sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                            <Button size="medium" variant="outlined" onClick={() => viewAccountDevices(account._id)}>View Devices</Button>
                            <Button size="medium" variant="contained" onClick={() => setAccountForDevice(account)}>Add Device</Button>
                        </CardActions>
                    </Card> 
                    </Grid>)) }
                    { props.loading && <Typography sx={{ m: 1 }} variant="h5" component="div">
                        Fetching Accounts....
                    </Typography> }
                    { (!props.loading && !props?.accounts) && <Typography sx={{ m: 1 }} variant="h5" component="div">
                        No Account Found!
                    </Typography> }
                </Grid>
            </Container>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Devices 
                        account={accountDevices?.account} 
                        loading={loading}
                        close={() => setOpen(false)} 
                    />
                </Box>
            </Modal>
            <Modal
                open={!!selectedAccount}
                onClose={() => setAccountForDevice(null)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <DeviceForm 
                        account={selectedAccount} 
                        deviceCreated={() => setAccountForDevice(null)}
                        close={handleDeviceCreateEvent} 
                    />
                </Box>
            </Modal>
        </View>
    );
}