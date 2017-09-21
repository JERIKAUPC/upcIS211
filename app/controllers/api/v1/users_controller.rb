module Api
    module V1
        class UsersController < ApplicationController
            include ApplicationHelper
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
            
            def update
                user = User.find(params[:id])
                puts user.password_digest
                #user.name=params[:name]
                if ( user.update_attribute(:name, params[:name] ) && user.update_attribute(:email, params[:email] ) && user.update_attribute(:dni, params[:dni ] ) && user.update_attribute(:phone, params[:phone] ) && user.update_attribute(:gender, params[:gender] ) && user.update_attribute(:birthday, params[:birthday] ) && user.update_attribute(:picture, params[:picture] ))
                    render json: {status: 'SUCCESS', message: 'Updated user', data:user},status: :ok
                else
                    puts user.errors.full_messages
                    render json: {status: 'ERROR', message: 'User not updated', data:user},status: :unprocessable_entity
                end
            end

            def destroy
                user = User.find(params[:id])

                user.destroy
                render json: {status: 'SUCCESS', message: 'Deleted user', data:user},status: :ok
            end

            private
            def user_params
                params.permit( :id,:name,:email,:password,:phone,:dni,:birthday,:gender,:picture)
            end
        end
    end
end
