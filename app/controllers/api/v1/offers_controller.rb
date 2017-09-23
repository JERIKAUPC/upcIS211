module Api
    module V1
        class OffersController < ApplicationController
            skip_before_action :verify_authenticity_token

            def index
                #user_id = params[:user_id]
                lati= params[:lati].to_f
                longi= params[:longi].to_f
                dla= params[:dla].to_f
                dlo= params[:dlo].to_f
                #offers = Offer.order('created_at DESC')
                offers = Offer.where("( latitude < #{lati+dla} ) and ( latitude > #{lati-dla} ) and ( longitude < #{longi+dlo} ) and ( longitude > #{longi-dlo} )")
                puts "( latitude < #{lati+dla} ) and ( latitude > #{lati-dla} ) and ( longitude < #{longi+dlo} ) and ( longitude > #{longi-dlo} )"
                render json: {status: 'SUCCESS', message: 'Loaded offers', data:offers},status: :ok
            end

            def show
                offer = Offer.find(params[:id])
                render json: {status: 'SUCCESS', message: 'Loaded offer', data:offer},status: :ok
            end

            # Método de creación de ofertas
            def create
                address = params[:address]
                latitude = params[:latitude].to_f
                longitude = params[:longitude].to_f
                quantity = params[:quantity].to_i
                days = params[:days]
                check_in_time = params[:check_in_time]
                check_out_time = params[:check_out_time]
                is_independent = params[:is_independent]
                leave_keys = params[:leave_keys].to_i
                move_car = params[:move_car].to_i
                image_1 = params[:image_1]
                image_2 = params[:image_2]
                image_entrance = params[:image_entrance]
                price = params[:price].to_f
                access_form_id = params[:access_form_id].to_i
                property_type_id = params[:property_type_id].to_i
                vehicle_type_id = params[:vehicle_type_id].to_i
                
                parametros = {
                user_id: cookies[:userID],
                address: address,
                latitude: latitude,
                longitude: longitude,
                quantity: quantity,
                days: days,
                check_in_time: check_in_time,
                check_out_time: check_out_time,
                is_independent: is_independent,
                leave_keys: leave_keys,
                move_car: move_car,
                image_1: image_1,
                image_2: image_2,
                image_entrance: image_entrance,
                price: price,
                access_form_id: access_form_id,
                property_type_id: property_type_id,
                vehicle_type_id: vehicle_type_id
        
                };
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
                params.permit(:user_id,:address,:latitude,:longitude,:quantity,:days,:horary_id,:check_in_time,:check_out_time,:is_independent,:leave_keys,:move_car,:indications_first_day,:image_1,:image_2,:image_entrance,:price,:status,:access_form_id,:property_type_id,:vehicle_type_id)
            end
            #hola
        end
    end
end
