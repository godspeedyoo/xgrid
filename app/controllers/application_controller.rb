class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  skip_before_filter :verify_authenticity_token, :only => [:update]
  # before_filter :cors_preflight_check
  # after_filter :cors_set_access_control_headers

  # def cors_set_access_control_headers
  #   headers['Access-Control-Allow-Origin'] = '*'
  #   headers['Access-Control-Allow-Methods'] = 'POST','PUT','GET','OPTIONS'
  #   headers['Access-Control-Request-Method'] = '*'  
  #   headers['Access-Control-Allow-Headers'] = %w{Origin Accept Content-Type X-Requested-With json auth_token X-CSRF-Token}.join(',')
  #   headers['Access-Control-Max-Age'] = '1728000'
  # end

  # def cors_preflight_check
  #   if request.method == 'OPTIONS'
  #     headers['Access-Control-Allow-Origin'] = '*'
  #     headers['Access-Control-Allow-Methods'] = 'POST','PUT','GET','OPTIONS'
  #     headers['Access-Control-Request-Method'] = '*'
  #     headers['Access-Control-Allow-Headers'] = %w{Origin Accept Content-Type X-Requested-With json auth_token X-CSRF-Token}.join(',')
  #     headers['Access-Control-Max-Age'] = '1728000'
  #     render :text => '', :Content_type => 'text/plain'
  #   end
  # end
end
