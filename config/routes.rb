Rails.application.routes.draw do
  root to: 'messages#index'
  get 'groups', to: 'groups#show'
  get 'users/edit', to: 'users#edit'
end
