import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Top = () => {
  const { loginWithPopup, logout, isAuthenticated } = useAuth0()

  return (
    <div className="relative">
      <div className="w-screen h-screen bg-no-repeat bg-contain md:bg-cover bg-hero-responsive-img md:bg-hero-img"></div>
      <div
        className="md:flex md:w-1/3 md:justify-between absolute md:right-1/3 right-1/4"
        style={{ bottom: '20%' }}
      >
        {isAuthenticated ? (
          <button
            onClick={() => {
              logout({ returnTo: window.location.origin })
            }}
            className="bg-blue-500 font-bold rounded-md px-12 py-4 text-white"
          >
            ログアウトする
          </button>
        ) : (
          <button
            onClick={loginWithPopup}
            className="bg-blue-500 font-bold rounded-md px-12 py-4 text-white"
          >
            ログインする
          </button>
        )}
        <Link to="/posts">
          <div className="px-12 py-4 font-bold bg-red-500 rounded-md text-white mt-7 md:mt-0">
            スポットを見る
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Top
