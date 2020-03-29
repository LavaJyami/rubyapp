Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :boards
      # post '/api/v1/' => 'controller#receives_data'
 end
end
end
