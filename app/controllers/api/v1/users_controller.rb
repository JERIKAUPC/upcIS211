module Api
    module V1
        class UsersController < ApplicationController
            skip_before_action :verify_authenticity_token

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
                user = User.new(user_params)
                if user.save
                    #render json: {status: 'SUCCESS', message: 'Created user', data:user},status: :ok
                    redirect_to root_path(@post), :alert => " Usuario registrado correctamente"
                else
                    #render json: {status: 'ERROR', message: 'User not saved', data:user},status: :unprocessable_entity
                    redirect_to welcome_login_path(@post), :notice => " Tenemos un error aqui! :("
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
            #hola
        end
    end
end
