module ApplicationHelper
    def isLogged
        return cookies[:userID] ? true : false ;
    end

    def loginUser ( id )
        cookies[:userID] = id
    end

    def logoutUser ( )
        cookies.delete :userID
    end

    def current_class( current_path )
        return 'active' if request.path == current_path
    end
end
