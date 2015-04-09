class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  def cors_preflight_check
    headers['Access-Control-Max-Age'] = '1728000'

    render json: {}
  end
end
