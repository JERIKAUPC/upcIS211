class ContactController < ApplicationController
    layout 'static'

    def index
        if ((defined? params[:email]) == nil )
                puts "No permitido"
            else
                puts defined? params[:email]
                if params[:email] == nil
                    puts "No permitido"
                else
                    nombre = (defined? params[:nombre]) != "" ? params[:nombre] : "No indico nombre"
                    email = (defined? params[:email])  != "" ? params[:email] : "No indico email"
                    asunto = (defined? params[:asunto])  != "" ? params[:asunto] : "No indico asunto"
                    mensaje = (defined? params[:mensaje])  != "" ? params[:mensaje] : "No indico mensaje"
                    UserMailer.contact(nombre,email,asunto,mensaje ).deliver
                end
        end
    end
end
