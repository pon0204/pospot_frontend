import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query'
import axios from 'axios'
import { PostData, User } from '../../types/types'
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector,useAppDispatch } from "../../app/hooks";
import { Auth0Provider } from '@auth0/auth0-react';
import { selectHeaders } from "../../slices/headersSlice";
import { setEditedProfile } from "../../slices/profileSlice";

export const useQueryProfileShow = (id:number) => {
  // const token = useAppSelector(selectUserToken)

  const headers = useAppSelector(selectHeaders)
  const dispatch = useAppDispatch()

  const getProfileShow = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_REST_URL}/profiles/${id}`,headers)
      dispatch(setEditedProfile(data.profile))
      return data
  }

  return useQuery({
    queryKey: 'profileShow',
    queryFn: getProfileShow,
    staleTime: 0,
    cacheTime: 0,
    // refetchOnWindowFocus: true,
  })
}

// postのshowと同時にspotも必要

// 一緒に持ってくる?


