/* eslint-disable no-use-before-define */
import React, { VFC,useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { setEditedPost, selectPost } from '../../../slices/postSlice'

const useStyles = makeStyles((theme) => ({
  root: {

    margin: 25,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export const FormAutoComp:VFC = () => {
  const classes = useStyles();
  const editedPost = useAppSelector(selectPost)
  const dispatch = useAppDispatch()

  // const [genre, setGenre] = useState<any>();

  const handleChange = (e:any,v:any) => {
    console.log(v)
    const genres = v.map((gen:any) =>  gen)
    // setGenre(genres)
    const genre = genres.join(',')
    dispatch(setEditedPost(
      { ...editedPost.post, genre: genre}))
  }
  
  return (
    <div className={classes.root}>

      <Autocomplete
        multiple
        id="tags-filled"
        options={genres.map((option) => option.title)}
        // defaultValue={[genre[13].title]}
        freeSolo
        onChange={(e,v) => handleChange(e,v)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => 
          
            (<Chip variant="outlined" label={option} {...getTagProps({ index })} 
            />                                    
            // console.log(option)          
          ))
        }
        
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="ジャンル" placeholder="Favorites" />
        )
        
      }
      />
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const genres = [
  { title: '映画館'},
  { title: '動物園'},
  { title: '遊園地'},
  { title: 'カラオケ'},
  { title: 'ショッピング'},
  { title: 'スポーツ観戦'},
  { title: 'サーカス'},
  { title: 'ライブ'},
  { title: 'フェス'},
  { title: 'お笑いライブ'},
  { title: 'クラブ'},
  { title: '競馬場'},
  { title: 'ドライブ'},
  { title: '夜景'},
  { title: 'バーベキュー'},
  { title: 'キャンプ'},
  { title: '温泉'},
  { title: 'スーパー銭湯'},
  { title: 'スカイダイビング'},
  { title: 'サウナ'},
  { title: '牧場'},
  { title: 'トランポリン'},
  { title: 'スラックライン'},
  { title: '公園'},
  { title: 'フットサル'},
  { title: '野球'},
  { title: 'バッティングセンター'},
  { title: 'プール'},
  { title: 'バスケ'},
  { title: '図書館'},
  { title: '博物館'},
  { title: '美術館'},
  { title: '体育館'},
  { title: '大学'},
  { title: 'ホテル'},
  { title: 'レストラン'},
  { title: 'バッティングセンター'},
  { title: 'バッティングセンター'},

];
