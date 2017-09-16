Rails.application.routes.draw do
  get 'parking/new'

  get 'parking/edit'

  get 'parking/show'

  root 'welcome#index'

  # GET
  get 'auth/logout'

  get 'about_us', to: 'about_us#index', as: 'about_us_index'
  get 'search', to: 'search#index', as: 'search_index'
  get 'contact', to: 'contact#index', as: 'contact_index'
  get 'faq', to: 'faq#index', as: 'faq_index'

  get 'search/estacionamiento'

  # POST
  post 'auth/login'
  post 'auth/lost_password'

  get 'parking/' => redirect("/search")
  resources :parking, :except => [:index]

  namespace "api" do
    namespace "v1" do
      resources :users, :except => [:new, :edit]
      resources :vehicles, :except => [:new, :edit]
      resources :offers, :except => [:new, :edit]
    end
  end
end
