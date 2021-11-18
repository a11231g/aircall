import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { fetchAllCalls,updateCall, reset } from '../../redux/calls'
import { groupByDate } from '../../lib/groupByDate'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import CallIcon from '@mui/icons-material/Call'
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback'
import ArchiveIcon from '@mui/icons-material/Archive'
import { makeStyles } from '@mui/styles'
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    background: 'white',
    marginBottom: 10,
    border: '1px solid #eee',
    borderRadius: 8
  },
  archivedRoot: {
    background: '#eee',
    marginBottom: 10,
    border: '1px solid #eee',
    borderRadius: 8
  },
  time: {
    fontSize: 10,
    color: '#888',
    marginTop: 5
  },
  listRoot: {
    margin: '0 10px !important'
  },
  date: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  cursor: {
    cursor: 'pointer'
  },
  emptyState: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  }
})

const allCallsComponent = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { archived } = props
  const calls = useSelector(state => state.calls.data)
  const grouped = groupByDate(calls, archived)
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchAllCalls())
  }, [])

  const resetCalls = () => {
    dispatch(reset())
  }
  const goToDetails = (id) => {
    history.push(`/activites/${id}`)
  }

  if(grouped.length === 0){
    return (
        <div className={classes.emptyState}>
          there is no {archived ? 'archived' : 'unarchived' } call
        </div>
    )
  }
  return (
    <div>
        <List dense={true} classes={{root: classes.listRoot, container: classes.listRoot}}>
          {grouped.length > 0 &&
            grouped.map((group, index) => {
              return group.calls.map((call, i) => {
                const callColor =
                  call.call_type === 'answered'
                    ? 'success'
                    : call.call_type === 'voicemail'
                    ? 'info'
                    : 'error'
                const inboundCall = call.direction === 'inbound'
                return (
                  <div key={`${index}_${i}`}>
                    {i === 0 && (
                      <div className={classes.date}>{moment(group.date).format('YYYY MM DD')}</div>
                    )}
                    <ListItem
                        dense
                      classes={{
                        root: archived ? classes.archivedRoot : classes.root
                      }}
                      secondaryAction={
                        <IconButton edge='end' aria-label='archive' onClick={() => {
                          dispatch(updateCall({id: call.id, is_archived: !archived}))
                        }}>
                          {archived ? <UnarchiveIcon color='success'/> : <ArchiveIcon color={'error'} />}
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        {inboundCall ? (
                          <PhoneCallbackIcon color={callColor} />
                        ) : (
                          <CallIcon color={callColor} />
                        )}
                        <div className={classes.time}>
                          {moment(call.created_at).format('hh:mm a')}
                        </div>
                      </ListItemAvatar>
                      <ListItemText
                          classes={{root: classes.cursor}}
                        primary={inboundCall ? call.from : call.to}
                        secondary={`tried to call on ${
                          inboundCall ? (call.to ? call.to : `...`) : call.from
                        }`}
                        onClick={() => {goToDetails(call.id)}}
                      />
                    </ListItem>
                  </div>
                )
              })
            })}
        </List>
      <Box mt={1}   display="flex"
           justifyContent="center"
           alignItems="center">
        <Button variant="contained" onClick={resetCalls}>Reset All calls</Button>
      </Box>
    </div>
  )
}

export default allCallsComponent
