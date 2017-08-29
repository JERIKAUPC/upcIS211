module Api
    module V1
        class VehiclesController < ApplicationController
            skip_before_action :verify_authenticity_token

            def index
                vehicles = Vehicle.order('created_at DESC')
                render json: {status: 'SUCCESS', message: 'Loaded vehicles', data:vehicles},status: :ok
            end

            def show
                vehicle = Vehicle.find(params[:id])
                render json: {status: 'SUCCESS', message: 'Loaded vehicle', data:vehicle},status: :ok
            end

            # Método de creación de un vehiculo
            def create
                vehicle = Vehicle.new(vehicle_params)
                if vehicle.save
                    render json: {status: 'SUCCESS', message: 'Created vehicle', data:vehicle},status: :ok
                else
                    render json: {status: 'ERROR', message: 'Vehicle not saved', data:vehicle},status: :unprocessable_entity
                end
            end

            def destroy
                vehicle = Vehicle.find(params[:id])

                vehicle.destroy
                render json: {status: 'SUCCESS', message: 'Vehicle Deleted', data:vehicle},status: :ok
            end

            private
            def vehicle_params
                params.permit(:user_id,:plate_str,:brand_str,:model_str,:color_str,:height_int,:width_int,:length_int,:picture_str)
            end
            
        end
    end
end
