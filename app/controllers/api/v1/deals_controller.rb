module Api
    module V1
        class DealsController < ApplicationController
            skip_before_action :verify_authenticity_token

            def index
                deals = Deal.order('created_at DESC')
                render json: {status: 'SUCCESS', message: 'Loaded vehicles', data:deals},status: :ok
            end

            def show
                deal = Deal.find(params[:id])
                render json: {status: 'SUCCESS', message: 'Loaded vehicle', data:deal},status: :ok
            end

            # Método de creación de un vehiculo
            def create
                usuario = params[:user_id].to_i
                oferta = params[:offer_id].to_i
                ini = params[:in_date]
                sal = params[:out_date]
                parametros = {
                    user_id: usuario,
                    offer_id: oferta,
                    ini_date: ini,
                    fin_date: sal,
                    canceled: 0
                }
                cantidad = Deal.find_by_sql("SELECT COUNT(*) as cantidad FROM deals WHERE offer_id=#{oferta}")
                q = cantidad[0].cantidad
            if q >= Offer.find(oferta).quantity
                render json: {status: 'ERROR', message: 'Vehicle not saved', data:[{}]},status: :ok
            else
                deal = Deal.new(parametros)
                if deal.save
                    UserMailer.offertake(deal).deliver
                    render json: {status: 'SUCCESS', message: 'Created vehicle', data:deal},status: :ok
                else
                    render json: {status: 'ERROR', message: 'Vehicle not saved', data:[{}]},status: :unprocessable_entity
                end
            end
            end

            def destroy
                deal = Deal.find(params[:id])

                deal.destroy
                render json: {status: 'SUCCESS', message: 'Vehicle Deleted', data:deal},status: :ok
            end
            
            def update
                deal = Deal.find(params[:id])
                if ( deal.update_attribute(:canceled, deal.canceled.to_i == 0 ? 1:0) )
                    render json: {status: 'SUCCESS', message: 'Estado de oferta cambiado', data:deal},status: :ok
                else
                    puts deal.errors.full_messages
                    render json: {status: 'ERROR', message: 'Estado no cambiado', data:deal},status: :unprocessable_entity
                end
            end

            private
            def deal_params
                params.permit(:user_id,:offer_id,:ini_date,:fin_date,:canceled)
            end
            
        end
    end
end
