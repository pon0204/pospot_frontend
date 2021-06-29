import {VFC,useEffect} from 'react'
import InputForm from './FormAsset/InputFrom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setEditedPost, selectPost, resetEditedPost } from '../../slices/postSlice'
import { useMutatePost } from '../../hooks/castomHook/useMutatePost'
import FormButton from './FormAsset/FormButton'
import { FormRadio } from './FormAsset/FormRadio'
import { FormAutoComp } from './FormAsset/FormAutoComp'
import FormFile from './FormAsset/FormFile'
import { FormSpot } from './FormAsset/FormSpot'
import FormSpots from './FormAsset/FormSpots'
import { useQueryPostShow } from '../../hooks/reactQuery/useQueryPostShow'
import { useAuth0 } from '@auth0/auth0-react'
import { divide } from 'lodash'

const PostForm: VFC<any> = ({match}:any) => {
  const id = match?.params.postId
  const editedPost = useAppSelector(selectPost)
  const dispatch = useAppDispatch()
  const {isAuthenticated} = useAuth0()

  if(!isAuthenticated){
    return (
      <p>ログインしてください</p>
    )
  }
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
