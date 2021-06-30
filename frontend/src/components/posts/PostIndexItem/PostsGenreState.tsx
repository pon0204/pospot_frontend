import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { resetQueryPostGenre, selectQueryPostGenre, setQueryPostGenre } from '../../../slices/postSlice';

interface ChipData {
  key: number;
  label: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
);

const aa = false
export default function PostsGenreState() {
  const dispatch = useAppDispatch()
  const query = useAppSelector(selectQueryPostGenre)
  const classes = useStyles();
  const chipData = [
    { key: 0, label: '映画館' },
    { key: 1, label: '遊園地' },
    { key: 2, label: 'ショッピング' },
    { key: 3, label: 'レストラン' },
    { key: 4, label: '温泉' },
  ]

  const handleClick = (data:any) => {
    // 同じジャンルを二度目のクリックで消去する
    if(query == data.target.innerText){
      dispatch(resetQueryPostGenre())
    }else{
      dispatch(setQueryPostGenre(data.target.innerText))
    }
  }

  return (
    <Paper component="ul" className={classes.root}>
        <Chip        
        label="すべて"  
        className={classes.chip}
        variant='outlined'
        clickable={true}
        onClick={() => dispatch(resetQueryPostGenre())}
        />
      {chipData.map((data) => {
        return (
          <li key={data.key}>
            <Chip
              label={data.label}
              // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
              onClick={(data) => handleClick(data)}
              className={classes.chip}
              variant='outlined'
              clickable={true}
            />
          </li>
        );
      })}

    </Paper>
  );
}