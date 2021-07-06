import { VFC } from 'react'
import { FormAutoComp } from './PostCreateItem/FormAutoComp'
import FormButton from './PostCreateItem/FormButton'
import FormFile from './PostCreateItem/FormFile'
import { FormRadio } from './PostCreateItem/FormRadio'
import { FormSpot } from './PostCreateItem/FormSpot'
import FormSpots from './PostCreateItem/FormSpots'
import InputForm from './PostCreateItem/InputFrom'

const PostForm: VFC = () => {
  const currentUserId = localStorage.getItem('currentUserId')

  if(!currentUserId){
    return (
      <p>ログインしてください</p>
    )
  }
  return (
    <div className="w-full px-2 md:w-1/2 md:mx-auto py-4">
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
