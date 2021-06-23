import React,{VFC} from 'react'
import axios from 'axios'

import { useMutateSpot } from '../hooks/useMutateSpot'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectSpot } from '../slices/spotSlice'
import { selectPost } from '../slices/postSlice'

const Test: VFC = () => {

  const { fetchSpotMutation } = useMutateSpot()
  const spot = useAppSelector(selectSpot)
  const post = useAppSelector(selectPost)
  console.log(post)

  const Click = () =>{ 
    const data:any = 'ChIJ1SFv4dV2A2AR3hKmVbI2pdA'
    // axios.get(`http://localhost:3000/api/v1/spot/${data}`)
    // .then(res => {
    //   console.log(res)
    // })
    fetchSpotMutation.mutate(data)

  }

  const updateClick = () => {
    axios.put(`${process.env.REACT_APP_REST_URL}/posts/160`,post)
    .then(res =>{
      console.log(res)
    })
  }

  return (
    <div>
      <button onClick={Click}>ゲット</button>
      <br/>
      <button onClick={updateClick}>アップデート</button>
    </div>
  )
}

export default Test
