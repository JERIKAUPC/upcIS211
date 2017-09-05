class ApplicationController < ActionController::Base
    include ApplicationHelper

    protect_from_forgery with: :exception
    before_action :set_user

    def set_user
        @current_user = nil

        if ( isLogged() )
            @current_user = User.find_by id: cookies[:userID]
        end
    end
end
