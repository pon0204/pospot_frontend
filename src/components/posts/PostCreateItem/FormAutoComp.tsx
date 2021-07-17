/* eslint-disable no-use-before-define */
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { VFC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectPost, setEditedPost } from '../../../slices/postSlice';

export const FormAutoComp:VFC = () => {
  const editedPost = useAppSelector(selectPost)
  const dispatch = useAppDispatch()

  const handleChange = (e:any,v:any) => {
    const genres = v.map((genre:string) =>  genre)
    const genre = genres.join(',')
    dispatch(setEditedPost(
      { ...editedPost, genre: genre}))
  }
  const genreLength = editedPost.genre.split(',').length
  
  return (
    <div className='full-width'>
      {genreLength >= 2 ? 
      // <div>
      <Autocomplete
        multiple
        id="tags-filled"
        freeSolo
        options={genres.map((option) => option.title)}
        onChange={(e,v) => handleChange(e,v)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => 
          (<Chip variant="outlined" label={option} {...getTagProps({ index })} 
          />                                    
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="ジャンル(3つまで)" placeholder="ジャンル" />
          )
        }
        />
        :
        <Autocomplete
        multiple
        id="tags-filled"
        freeSolo
        disableCloseOnSelect
        options={genres.map((option) => option.title)}
        onChange={(e,v) => handleChange(e,v)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => 
          (<Chip variant="outlined" label={option} {...getTagProps({ index })} 
          />                                    
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="ジャンル(3つまで)" placeholder="ジャンル" />
          )
        }
        />        
      }
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
