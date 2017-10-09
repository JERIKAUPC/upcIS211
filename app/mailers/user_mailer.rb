class UserMailer < ApplicationMailer
    default from: "no-reply@sandboxa72e1031d226455f97ea9790082f46a6.mailgun.org"

    def lost_password ( user )
        mail to: user.email, subject: "Recuperar contraseña"
    end
    
    def offertake ( deal )
        @deal=deal
        mail to: deal.offer.user.email, subject: "Uno de tus lugares ha sido solicitado!"
        
    end
end
