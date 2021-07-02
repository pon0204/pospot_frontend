import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { resetQueryPlace, selectQueryPlace, setQueryPlace } from '../../../slices/postSlice';

export const AutoCompPlace = () => {
  const dispatch = useAppDispatch()
  const place = useAppSelector(selectQueryPlace)
  
  const handleChange = (e:any,v:any) =>{
    v ?
    dispatch(setQueryPlace(v.place))
    : 
    dispatch(resetQueryPlace())
  }
  return (
    <Autocomplete
      id="combo-box-demo"
      options={places}
      getOptionLabel={(places) => places.place}
      style={{ width: 300 }}
      onChange={(e:any,v:any) => handleChange(e,v)}
      renderInput={(params) => <TextField {...params} label="地域検索"/>}
      className='mx-auto my-2 md:mx-2'
    />
  );
}

const places = [
  { place: '北海道'},
  { place: '青森県'},
  { place: '岩手県'},
  { place: '宮城県'},
  { place: '秋田県'},
  { place: '山形県'},
  { place: '福島県'},
  { place: '茨城県'},
  { place: '栃木県'},
  { place: '群馬県'},
  { place: '埼玉県'},
  { place: '千葉県'},
  { place: '東京都'},
  { place: '神奈川県'},
  { place: '新潟県'},
  { place: '富山県'},
  { place: '石川県'},
  { place: '福井県'},
  { place: '山梨県'},
  { place: '長野県'},
  { place: '岐阜県'},
  { place: '静岡県'},
  { place: '愛知県'},
  { place: '三重県'},
  { place: '滋賀県'},
  { place: '京都府'},
  { place: '大阪府'},
  { place: '兵庫県'},
  { place: '奈良県'},
  { place: '和歌山県'},
  { place: '鳥取県'},
  { place: '島根県'},
  { place: '岡山県'},
  { place: '広島県'},
  { place: '山口県'},
  { place: '徳島県'},
  { place: '香川県'},
  { place: '愛媛県'},
  { place: '高知県'},
  { place: '福岡県'},
  { place: '佐賀県'},
  { place: '長崎県'},
  { place: '熊本県'},
  { place: '大分県'},
  { place: '宮崎県'},
  { place: '鹿児島県'},
  { place: '沖縄県'},


];
