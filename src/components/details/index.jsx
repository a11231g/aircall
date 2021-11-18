import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCallDetails } from '../../redux/callDetails'
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const styles = {
    container: {
      margin: '15px 10px'
    },
    value: {
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 12,
        color: '#000'
    },
    label: {
        color: '#666',
        fontSize: 13
    }
}

const CallDetails = (props) => {
    const { match, history } = props
    const dispatch = useDispatch()
    const id = match.params.id
    const detail = useSelector(state => state.callDetails.data)
    const loading = useSelector(state => state.callDetails.loading)

    const backToHome = () => {
        // we can use hook instead
        history.push('/')
    }

    useEffect(()=>{
        dispatch(fetchCallDetails(id))
    },[id])

    if(loading) {
        return (
            <Box mt={1}   display="flex"
                 justifyContent="center"
                 alignItems="center">
                <CircularProgress color="success" />
            </Box>
        )
    }
  return (
      <div>
          <Box mt={1}   display="flex"
               justifyContent="center"
               alignItems="center">
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={backToHome}>
                  back
              </Button>
          </Box>
          {Object.keys(detail).map((d, index) => {
              return (
                  <div key={index} style={styles.container}>
                      <span style={styles.value}>
                          {d} :
                      </span>
                      <span style={styles.label}>
                          {detail[d] === null ? '' : detail[d].toString()}
                      </span>
                  </div>
              )
          })}
      </div>
    )
}

export default CallDetails
