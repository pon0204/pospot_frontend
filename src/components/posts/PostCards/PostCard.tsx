import { useAuth0 } from '@auth0/auth0-react'
import { IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import { useTheme } from '@material-ui/core/styles'
import { TransitionProps } from '@material-ui/core/transitions'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import RoomIcon from '@material-ui/icons/Room'
import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutateLike } from '../../../hooks/castomHook/useMutateLike'
import defaultPhoto from '../../../image/profile_default.png'
import PostShow from '../PostShow'
import CardMenu from './CardMenu'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const PostCard = (item: any) => {
  const currentUserId = localStorage.getItem('currentUserId')
  const { createLikeMutation, deleteLikeMutation } = useMutateLike()
  const { loginWithPopup } = useAuth0()
  const [likeHeart, setHeart] = useState(false)
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper')
  const smMediaWidth = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const heartClick = () => {
    setHeart((prev) => !prev)
  }

  let title = item.item.title
  let caption = item.item.caption
  const likes = item.item.likes
  const withData = item.item.with
  const genres = item.item.genre
  const spot_name = item.item.spot_name
  const currentUserLike = likes.some(
    (like: any) => like.user_id == currentUserId
  )

  useEffect(() => {
    const likes = item.item.likes
    const currentUserLike = likes.some(
      (like: any) => like.user_id == currentUserId
    )
    setHeart(currentUserLike)
  }, [])

  if (title.length > 12) {
    title = title.substr(0, 12) + '...'
  }

  if (caption.length > 42) {
    caption = caption.substr(0, 42) + '...'
  }

  return (
    <div
      className="relative md:m-2 mx-auto my-2"
      style={{ height: '530px', width: '370px' }}
    >
      <button
        type="button"
        onClick={handleClickOpen('paper')}
        className="w-full h-full"
        style={{ outline: 'none' }}
      >
        <div className="w-full h-full border z-0 relative text-left">
          <div className="flex pt-1 pl-4">
            <Link to={`/profile/${item.item.user_id}`}>
              <div className="border-2 border-gray-300 relative cursor-pointer w-16 h-16 block rounded-full mx-auto">
                {item.item.avatar_url == null ? (
                  <img src={defaultPhoto} className="rounded-full" alt="" />
                ) : (
                  <img
                    src={item.item.avatar_url}
                    className="w-16 h-16 rounded-full"
                    alt=""
                  />
                )}
              </div>
            </Link>
            <div className="ml-4 py-2 w-9/12">
              <h3 className="font-bold text-lg">{title}</h3>
              <div className="flex overflow-x-auto mt-1">
                <p className="text-gray-600 whitespace-nowrap">
                  {item.item.created_at.substring(
                    0,
                    item.item.created_at.indexOf('T')
                  )}
                </p>
                {withData && (
                  <div className="bg-red-200  rounded-md p-1 text-sm text-center mx-2 whitespace-nowrap">
                    {withData}
                  </div>
                )}
                {genres?.map((genre: string, index: number) => (
                  <div
                    className="bg-green-200 mx-2 rounded-md p-1 text-sm whitespace-nowrap"
                    key={index}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h3 className="border border-blue-600 text-blue-600 rounded-md text-center p-1  text-lg w-11/12 mx-auto my-2 whitespace-nowrap overflow-x-auto">
            {spot_name}
          </h3>
          <img
            className="block w-full object-cover"
            src={item.item.image_url}
            alt=""
            style={{ height: 300 }}
          />
          <p className="px-2 pt-1">{caption}</p>
          <p className="absolute bottom-2 left-2 bg-gray-600 text-white p-1 pr-2">
            <RoomIcon /> {item.item.place}
          </p>
        </div>
      </button>
      {currentUserId == item.item.user_id && (
        <div className="absolute top-2 right-2 z-10">
          <CardMenu id={item.item.id} />
        </div>
      )}
      <div className="absolute right-2 bottom-0 z-10">
        {likeHeart ? (
          <IconButton
            onClick={() => {
              deleteLikeMutation.mutate(item.item.id)
              heartClick()
            }}
            style={{ outline: 'none' }}
          >
            <FavoriteIcon color="secondary" style={{ fontSize: 32 }} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              if (currentUserId) {
                createLikeMutation.mutate(item.item.id)
                heartClick()
              } else {
                loginWithPopup()
              }
            }}
            style={{ outline: 'none' }}
          >
            <FavoriteBorderIcon color="secondary" style={{ fontSize: 32 }} />
          </IconButton>
        )}
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullScreen={smMediaWidth}
        fullWidth={true}
        maxWidth="xl"
      >
        <DialogContent
          dividers={scroll === 'paper'}
          style={{
            padding: '0px 4px 0px 4px',
          }}
        >
          {open && (
            <div style={{ height: '90vh' }}>
              <PostShow id={item.item.id} style={{ height: '90vh' }} />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <HighlightOffIcon style={{ fontSize: 40 }} />
          </Button>
          {likeHeart ? (
            <IconButton
              onClick={() => {
                heartClick()
                deleteLikeMutation.mutate(item.item.id)
              }}
              style={{ outline: 'none' }}
            >
              <FavoriteIcon color="secondary" style={{ fontSize: 40 }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                if (currentUserId) {
                  createLikeMutation.mutate(item.item.id)
                  heartClick()
                } else {
                  loginWithPopup()
                }
              }}
              style={{ outline: 'none' }}
            >
              <FavoriteBorderIcon color="secondary" style={{ fontSize: 40 }} />
            </IconButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export const PostCardMemo = memo(PostCard)
