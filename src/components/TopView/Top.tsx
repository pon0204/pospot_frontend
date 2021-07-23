import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Top = () => {
  const { loginWithPopup, logout, isAuthenticated } = useAuth0()

  return (
    <div className="relative">
      <div className="md:bg-cover bg-hero-responsive-img md:bg-hero-img w-screen h-screen bg-no-repeat bg-contain"></div>
      <div
        className="md:flex md:w-1/3 md:justify-between md:right-1/3 right-1/4 absolute"
        style={{ bottom: '20%' }}
      >
        {isAuthenticated ? (
          <button
            onClick={() => {
              logout({ returnTo: window.location.origin })
            }}
            className="px-12 py-4 font-bold text-white bg-blue-500 rounded-md"
          >
            ログアウトする
          </button>
        ) : (
          <button
            onClick={loginWithPopup}
            className="px-12 py-4 font-bold text-white bg-blue-500 rounded-md"
          >
            ログインする
          </button>
        )}
        <Link to="/posts">
          <div className="mt-7 md:mt-0 px-12 py-4 font-bold text-white bg-red-500 rounded-md">
            スポットを見る
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Top
