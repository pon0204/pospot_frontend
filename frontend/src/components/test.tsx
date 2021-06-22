import React,{VFC} from 'react'
import axios from 'axios'

import { useMutateSpot } from '../hooks/useMutateSpot'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectSpot } from '../slices/spotSlice'

const Test: VFC = () => {

  const { fetchSpotMutation } = useMutateSpot()
  const post = useAppSelector(selectSpot)
  console.log(post)

  const Click = () =>{ 
    const data:any = 'ChIJ1SFv4dV2A2AR3hKmVbI2pdA'
    // axios.get(`http://localhost:3000/api/v1/spot/${data}`)
    // .then(res => {
    //   console.log(res)
    // })
    fetchSpotMutation.mutate(data)

  }


  return (
    <div>
      <button onClick={Click}>ゲット</button>
    </div>
  )
}

export default Test
