import { makeStyles } from '@material-ui/core/styles';
import React, { useState, VFC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectPost, setEditedPost } from '../../../slices/postSlice';


const useStyles = makeStyles(() => ({
  inputLabel:{
    display: 'block',
    position: 'relative',
    backgroundColor: '#1877F2',
    color: '#fff',
    fontSize: '16px',
    padding: '10px 20px',
    borderRadius: '8px',
    transition: 'all 0.5s',
    width: '50%',
    margin: '30px auto 0px auto',
    cursor: 'pointer',
    textAlign: 'center',
    '&:hover':{
      backgroundColor: '#004db1'
    },
  },
  inputFile: {
    display: 'none'
  },
  img:{
    width: '91%',
    height: '250px',
    margin: '15px auto',
    display: 'block',
    objectFit: 'cover'
  }
}));

const FormFile:VFC = () => {
  const classes = useStyles();
  const [fileUrl, setFileUrl] = useState<string>('');
  const editedPost = useAppSelector(selectPost)
  const dispatch = useAppDispatch()

  const imageChange = (event:any) => {
    const image = event.target.files[0];
    const imageUrl:any = URL.createObjectURL(image);
    setFileUrl(imageUrl)
    dispatch(setEditedPost({ ...editedPost, eyecatch: image}))
  }

  return (
    <div>
    <label htmlFor='file' className={classes.inputLabel}>アイキャッチ画像</label>
        <input className={classes.inputFile} onChange={imageChange} type="file" id="file" name="file" accept="image/png,image/jpg"/>
      {
      fileUrl && (
      <img src={fileUrl} className={classes.img}/>
      )
      } 
    </div>
  )
}

export default FormFile
