Rails.application.routes.draw do
  resources :chirps
  namespace :api do
    namespace :v1 do

      resources :posts
      resources :spots
      resources :profiles
      get '/spot/:place_id', to: 'spots#spot_detail'
      get '/post/query', to: 'posts#query'
      get '/user_id', to: 'users#user_id'
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
