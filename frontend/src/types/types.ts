export interface User {
  given_name: string
  nickname: string
  name: string
  picture: string
  locale: string
  updated_at: string
  email: string
  email_verified: string
  sub: string
}

export interface Post {
  id: number
  user_id: number
  title: string
  caption: string | null
  with: string | null
  genre: string | null  
  created_at: string
  updated_at: string
}


export interface EditPost {
  title: string
  caption: string | null
  with: string | null
  genre: string | null  
}