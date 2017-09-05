class AuthController < ApplicationController
    include ApplicationHelper

    def login
        email = params[:email]
        password = params[:password]

        user = User.find_by(email: email).try(:authenticate, password)

        if user
            loginUser( user.id )
            render json: {status: 'SUCCESS', message: 'User logged success', data:user},status: :ok
        else
            render json: {status: 'ERROR', message: 'Login error', data:user},status: :ok
        end
    end

    def logout
        logoutUser()
        #render :text => request.inspect
        redirect_back(fallback_location: root_path)
        #redirect_to root_path()
    end
end
