# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment', __FILE__)
run Rails.application

use Rack::Cors do
	allow do
		origins 'localhost:3000', 'xgrid.herokuapp.com'
    resource '/grids/data/*', 
      :headers => :any,
      :methods => [:get, :post, :put, :options],
      :expose => ['Custom-Header'],
      :max_age => 600
    resource '/grids/*',
      :methods => [:get, :post, :put, :options]

	end

  allow do
    origins '*'
    resource '/grids/data/*', :headers => :any, :methods => :get, :put
  end
end