import {VFC,useEffect} from 'react'
import InputForm from './FormAsset/InputFrom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setEditedPost, selectPost, resetEditedPost } from '../../slices/postSlice'
import { useMutatePost } from '../../hooks/useMutatePost'
import FormButton from './FormAsset/FormButton'
import { FormRadio } from './FormAsset/FormRadio'
import { FormAutoComp } from './FormAsset/FormAutoComp'
import FormFile from './FormAsset/FormFile'
import { FormSpot } from './FormAsset/FormSpot'
import FormSpots from './FormAsset/FormSpots'
import { useQueryPostShow } from '../../hooks/useQueryPostShow'

const PostForm: VFC<any> = ({match}:any) => {
  const id = match?.params.postId
  const editedPost = useAppSelector(selectPost)
  const dispatch = useAppDispatch()
  
  // const { status, data } = useQueryPostShow(id)
//   useEffect(() => {
//     if(data){
//     const post = data.post
//     dispatch(setEditedPost({
//       ...editedPost,
//       title: post.title,
//       caption: post.caption,
//       with: post.with,
//       genre: post.genre
//     }))
//     }
//     return ()=>{
//       dispatch(resetEditedPost())
//     }
//   }, [data])
// console.log(editedPost)
    
  // const editedPost = useAppSelector(selectPost)
  return (
    <div className="w-full pl-2 md:w-1/2 md:mx-auto py-4">
    <FormFile/>
    <InputForm/>
    <FormAutoComp/>
    <FormRadio/>
    <FormSpot/>
    <FormSpots/>
    <FormButton/>
    
    </div>
  )
}

export default PostForm
