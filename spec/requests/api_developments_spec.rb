require 'rails_helper'

RSpec.describe "ApiDevelopments", type: :request do
  describe "GET /api_developments" do
    it "works! (now write some real specs)" do
      get api_developments_path
      expect(response).to have_http_status(200)
    end
  end
end
