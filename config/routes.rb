Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/ui" => "ui#index"
  get "/ui#" => "ui#index"
  root "ui#index"
end
