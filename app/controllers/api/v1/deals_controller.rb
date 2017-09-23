module Api
    module V1
        class DealsController < ApplicationController
            skip_before_action :verify_authenticity_token

            def index
                deals = Deal.order('created_at DESC')
                render json: {status: 'SUCCESS', message: 'Loaded vehicles', data:deals},status: :ok
            end

            def show
                deal = Deals.find(params[:id])
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
                deal = Deal.new(parametros)
                if deal.save
                    render json: {status: 'SUCCESS', message: 'Created vehicle', data:deal},status: :ok
                else
                    render json: {status: 'ERROR', message: 'Vehicle not saved', data:deal},status: :unprocessable_entity
                end
            end

            def destroy
                deal = Deal.find(params[:id])

                deal.destroy
                render json: {status: 'SUCCESS', message: 'Vehicle Deleted', data:deal},status: :ok
            end

            private
            def deal_params
                params.permit(:user_id,:offer_id,:ini_date,:fin_date,:canceled)
            end
            
        end
    end
end
