import { View } from 'react-native';
import { Account, Device } from "@/types";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
    account: Account;
    loading: boolean;
    close: () => void;
}

export default function Devices(props: Props) {
    console.log(props);
    return <View>
        { props.account?.devices && props.account?.devices.length > 0 && <Typography sx={{ m: 1 }} variant="h5" component="div">
            { props.account?.name } Devices
        </Typography> }
        { props.loading && <Typography sx={{ m: 1 }} variant="h5" component="div">
            Fetching Devices....
        </Typography>}
        <List>
            { props.account?.devices && props.account?.devices.length && props.account.devices.map((device: Device, index: number) => (<ListItem key={index}>
                <ListItemText
                    primary={device.name}
                    secondary={device.type}
                />
            </ListItem>)) || '' }
            { !props.loading && props.account?.devices.length === 0 &&  <Typography sx={{ m: 1 }} variant="h5" component="div">
                No Device Found for { props.account?.name }!
            </Typography> }
        </List>
        <Grid container sx={{ justifyContent: 'flex-end' }}>
            <Grid item>
                <Button size="medium" variant="outlined" onClick={() => props.close()}>Close</Button>
            </Grid>
        </Grid>
    </View>
}