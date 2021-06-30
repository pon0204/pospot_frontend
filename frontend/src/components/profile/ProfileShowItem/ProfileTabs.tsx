import React from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    // maxWidth: 500,
  },
});


const ProfileTabs = ({handleChange,query}:any) => {
  const classes = useStyles();

  return (
    <div className='fixed bottom-0 w-full z-50'>
          <Paper square className={classes.root}>
      <Tabs
        value={query}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        {/* <Tab icon={<PhoneIcon />} label="RECENTS" /> */}
        <Tab icon={<PersonPinIcon />} label="ユーザーの投稿" style={{outline: 'none'}} />
        <Tab icon={<FavoriteIcon />} label="いいねした投稿" style={{outline: 'none'}} />
      </Tabs>
    </Paper>
    </div>
  )
}

export default ProfileTabs
