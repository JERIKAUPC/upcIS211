module Api
    module V1
        class UsersController < ApplicationController
            include ApplicationHelper

            def index
                users = User.order('created_at DESC')
                render json: {status: 'SUCCESS', message: 'Loaded users', data:users},status: :ok
            end

            def show
                user = User.find(params[:id])
                render json: {status: 'SUCCESS', message: 'Loaded user', data:user},status: :ok
            end

            # Método de creación de usuario
            def create
                if ! ( User.find_by email: params[:email] )
                    user = User.new(user_params)
                    if user.save
                        loginUser( user.id )

                        render json: {status: 'SUCCESS', message: 'Created user', data:user},status: :ok
                    else
                        render json: {status: 'ERROR', message: 'User not saved', data:user},status: :unprocessable_entity
                    end
                else
                    render json: {status: 'ERROR', message: 'User exist', data:user},status: :not_acceptable
                end
            end

            def destroy
                user = User.find(params[:id])

                user.destroy
                render json: {status: 'SUCCESS', message: 'Deleted user', data:user},status: :ok
            end

            private
            def user_params
                params.permit(:name,:email,:password,:phone)
            end
        end
    end
end
