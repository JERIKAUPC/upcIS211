class ProfileController < ApplicationController
  #layout 'only_header'
  layout 'profile'
  include ApplicationHelper
  
  before_action :authenticate
  
  def show
    #ver y editar perfil Kenny
  end

  def reservation
    #ver lo que has reservado Renzo
  end

  def order
    #ofertas confirmadas Gabriel
  end

  def publish
      #@Offers = Offer.all
      @Offers = Offer.all.where("user_id=#{cookies[:userID]}")
  end
end
