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
