import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import React from 'react'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    // maxWidth: 500,
  },
})

interface Props {
  handleChange: (event: React.ChangeEvent<{}>, value: any) => void
  query: number
}

const ProfileTabs = ({ handleChange, query }: Props) => {
  const classes = useStyles()

  return (
    <div className="fixed bottom-0 z-50 w-full">
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
          <Tab
            icon={<PersonPinIcon />}
            label="ユーザーの投稿"
            style={{ outline: 'none' }}
          />
          <Tab
            icon={<FavoriteIcon />}
            label="いいねした投稿"
            style={{ outline: 'none' }}
          />
        </Tabs>
      </Paper>
    </div>
  )
}

export default ProfileTabs
