Rails.application.routes.draw do
  resources :chirps
  namespace :api do
    namespace :v1 do
      resources :posts
      resources :spots
      resources :profiles
      get '/spot/:place_id', to: 'spots#spot_detail'
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
