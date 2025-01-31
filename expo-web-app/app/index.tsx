import * as React from 'react';
import { View } from 'react-native';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import { useQuery} from '@apollo/client';
import Accounts from '@/components/Accounts';
import { GET_ACCOUNTS } from '@/graphql/queries';
import AccountForm from '@/components/AccountForm';

interface Props {
  children?: React.ReactElement;
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

export default function Index(props: Props) {
  const [accountModalOpen, setAccountOpen] = React.useState(false);
  
  const { loading, data: accounts, refetch } = useQuery(GET_ACCOUNTS);

  return (
    <View>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            GraphQL - Expo
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      
      <Accounts accounts={accounts?.accounts} loading={loading} />
      
      <Grid sx={{ flexGrow: 1, justifyContent: 'flex-end', position: 'fixed', bottom: 20, right: 20 }} container spacing={2}>
          <Grid item>
            <Button size="medium" variant="contained" onClick={() => setAccountOpen(true)}>Create Account</Button>
          </Grid>
      </Grid>
      <Modal
        open={accountModalOpen}
        onClose={() => setAccountOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AccountForm 
            close={() => setAccountOpen(false)} 
            accountCreated={() => {
              setAccountOpen(false);
              refetch();
            }}
          />
        </Box>
      </Modal>
    </View>
  );
}