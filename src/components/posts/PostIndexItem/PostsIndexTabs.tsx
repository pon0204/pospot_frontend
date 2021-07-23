import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import React from 'react'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    // maxWidth: 500,
  },
})

const PostsIndexTabs = ({ handleChange, tabState }: any) => {
  const classes = useStyles()

  return (
    <div className="fixed bottom-0 w-full z-50">
      <Paper square className={classes.root}>
        <Tabs
          value={tabState}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab
            icon={<AutorenewIcon />}
            label="新着投稿一覧"
            style={{ outline: 'none' }}
          />
          <Tab
            icon={<AccessibilityNewIcon />}
            label="フォロー投稿一覧"
            style={{ outline: 'none' }}
          />
        </Tabs>
      </Paper>
    </div>
  )
}

export default PostsIndexTabs
