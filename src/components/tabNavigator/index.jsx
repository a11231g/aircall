import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Paper from '@mui/material/Paper'
import CallIcon from '@mui/icons-material/Call'
import ArchiveIcon from '@mui/icons-material/Archive'
import AllCalls from '../allCalls/allCalls.jsx'

const styles = {
    paper: { position: 'absolute', bottom: 0, left: 0, right: 0 }
}
const TabNavigation = () => {
  const [value, setValue] = React.useState('Calls')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
      <div>
        <AllCalls archived={value !== 'Calls'} />
        <Paper
            sx={styles.paper}
            elevation={3}
        >
          <BottomNavigation value={value} onChange={handleChange}>
            <BottomNavigationAction
                label='Calls'
                value='Calls'
                icon={<CallIcon />}
            />
            <BottomNavigationAction
                label='Archive'
                value='Archive'
                icon={<ArchiveIcon />}
            />
          </BottomNavigation>
        </Paper>
      </div>
  )
}

export default TabNavigation
