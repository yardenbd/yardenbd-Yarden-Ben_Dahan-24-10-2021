import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import { removeCityFromLocalStorage } from '../../services/localStorage';

export default function OutlinedCard(props) {
  
  const cityInfo = props.cityInfo

  const key = cityInfo.cityKey

  const removeFromFav =()=>{
    removeCityFromLocalStorage(key)
  }
  return (
    <Box sx={{ minWidth: 300 }} >
      <Card variant="outlined" style={{backgroundColor:'lightgrey'}}><React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 50 }} color="text.secondary" gutterBottom>
       
      </Typography>
      <Typography variant="h5" component="div">
      
      </Typography>
      <Typography sx={{ mb: 2.5 }} color="text.secondary">
        {cityInfo.time}
      </Typography>
      <Typography variant="body2">
      {cityInfo.name}
        <br />
        
      </Typography>
    </CardContent>
    <CardActions>
    <Button size="small" onClick={()=>props.onRemove(cityInfo)}>Remove from favorites</Button>
      <Button size="small"><Link to={`/favorites/${key}`}>Learn More</Link></Button>
      
    </CardActions>
  </React.Fragment></Card>
    </Box>
  );
}