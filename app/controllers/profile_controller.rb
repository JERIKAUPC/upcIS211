class ProfileController < ApplicationController
  layout 'only_header'
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
    #Tus ofertas publicadas Gabriel
  end
end
