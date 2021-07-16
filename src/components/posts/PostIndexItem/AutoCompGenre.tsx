import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { resetQueryGenre, setQueryGenre } from '../../../slices/postSlice';

export const AutoCompGenre = () => {
  interface genres {
    genre: string
  }
  const dispatch = useAppDispatch()
  const handleChange = (e:any,genres:genres) =>{
    genres ?
    dispatch(setQueryGenre(genres.genre))
    : 
    dispatch(resetQueryGenre())
  }

  return (
    <Autocomplete
      id="combo-box-demo"
      options={genres}
      getOptionLabel={(genres) => genres.genre}
      style={{ width: 300 }}
      onChange={(e:any,v:any) => handleChange(e,v)}
      renderInput={(params) => <TextField {...params} label="ジャンル検索"/>}
      className='mx-auto my-2 md:mx-2'
    />
  );
}

const genres = [
  { genre: '映画館'},
  { genre: '動物園'},
  { genre: '遊園地'},
  { genre: 'カラオケ'},
  { genre: 'ショッピング'},
  { genre: 'スポーツ観戦'},
  { genre: 'サーカス'},
  { genre: 'ライブ'},
  { genre: 'フェス'},
  { genre: 'お笑いライブ'},
  { genre: 'クラブ'},
  { genre: '競馬場'},
  { genre: 'ドライブ'},
  { genre: '夜景'},
  { genre: 'バーベキュー'},
  { genre: 'キャンプ'},
  { genre: '温泉'},
  { genre: 'スーパー銭湯'},
  { genre: 'スカイダイビング'},
  { genre: 'サウナ'},
  { genre: '牧場'},
  { genre: 'トランポリン'},
  { genre: 'スラックライン'},
  { genre: '公園'},
  { genre: 'フットサル'},
  { genre: '野球'},
  { genre: 'バッティングセンター'},
  { genre: 'プール'},
  { genre: 'バスケ'},
  { genre: '図書館'},
  { genre: '博物館'},
  { genre: '美術館'},
  { genre: '体育館'},
  { genre: '大学'},
  { genre: 'ホテル'},
  { genre: 'レストラン'},
  { genre: 'バッティングセンター'},
  { genre: 'バッティングセンター'},

];
