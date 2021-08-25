export interface Post {
  id: number
  user_id: number
  title: string
  caption: string
  with: string
  genre: string[]
  created_at: string
  updated_at: string
  image_url: string
  likes: []
  avatar_url: string | null
  place: string
  spot_name: string
}

export interface Posts {
  posts: Post[]
}

export interface EditProfile {
  nickname: string
  introduction: string
  gender: string
  avatar_url: string
  avatar: {name: string, lastModified: number}
}

export interface SpotData {
  id: number
  post_id: number
  name: string
  web_url: string
  map_url: string
  place: string
  place_detail: string
  place_id: string
  created_at: string
  updated_at: string
}

export interface EditPost {
  title: string
  caption: string
  with: string
  genre: string
  eyecatch: {name: string, lastModified: number}
}

export interface EditSpot {
  spot: {
    name: string
    web_url: string
    map_url: string
    place: string
    place_detail: string
    place_id: string
  }
  id: number | null
}

export interface FollowCount {
  followingsCount: number | null
  followersCount: number | null
}

export interface FollowingsId {
  id: number | null
}

export interface FollowersId {
  id: number | null
}
