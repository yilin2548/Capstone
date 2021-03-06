Rails.application.routes.draw do
  scope :api, defaults: {format: :json} do
  	resources :cities, except: [:new, :edit]
    resources :states, except: [:new, :edit]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/ui" => "ui#index"
  get "/ui#" => "ui#index"
  root "ui#index"
end
