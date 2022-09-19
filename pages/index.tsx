import { Card, CardContent, CardHeader, Grid, Box } from '@mui/material';
import type { NextPage } from 'next'
import { Mainlayout } from '../components/layouts'
import { EntryList, NewEntry } from '../components/ui'


const Home: NextPage = () => {
  return (
    <Mainlayout>
      <Grid container spacing={1}>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: 'calc(100vh - 100px) !important', }}>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <CardHeader title='Pendientes' />
              <NewEntry />
            </Box>
            <CardContent>
              <EntryList status='pending' />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title='En Progreso' />

            <CardContent>
              <EntryList status='in-progress' />
            </CardContent>

          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title='Finalizadas' />

            <CardContent>
              <EntryList status='finished' />
            </CardContent>

          </Card>
        </Grid>

      </Grid>
    </Mainlayout>
  )
}

export default Home
