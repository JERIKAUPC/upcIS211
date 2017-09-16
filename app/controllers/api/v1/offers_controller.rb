module Api
    module V1
        class OffersController < ApplicationController
            skip_before_action :verify_authenticity_token

            def index
                #user_id = params[:user_id]
                offers = Offer.order('created_at DESC')
                render json: {status: 'SUCCESS', message: 'Loaded offers', data:offers},status: :ok
            end

            def show
                offer = Offer.find(params[:id])
                render json: {status: 'SUCCESS', message: 'Loaded offer', data:offer},status: :ok
            end

            # Método de creación de ofertas
            def create
                offer = Offer.new(offer_params)
                if offer.save
                    render json: {status: 'SUCCESS', message: 'Created offer', data:offer},status: :ok
                    #redirect_to root_path(@post), :alert => " Oferta registrada correctamente"
                else
                    render json: {status: 'ERROR', message: 'Offer not saved', data:offer},status: :unprocessable_entity
                    #redirect_to welcome_login_path(@post), :notice => " Tenemos un error aqui! :("
                end
            end

            def destroy
                offer = Offer.find(params[:id])

                offer.destroy
                render json: {status: 'SUCCESS', message: 'Deleted offer', data:offer},status: :ok
            end

            private
            def offer_params
                params.permit(:User_id,:height,:width,:length,:date_start,:date_end,:address,:location)
            end
            #hola
        end
    end
end
