require 'spec_helper'

describe ClipsController do
  render_views

  describe "index" do
    it  "a logged out user should be asked to sign in" do
      get :index
      expect(response.body).to have_content "Sign in with Facebook"
    end
  end

  describe "POST create" do
    context "with valid attributes" do
      it "saves new clip to the database" do
        new_user = FactoryGirl.create(:user)
        session[:user_id] = new_user.id
        expect{
          post :create, clip: FactoryGirl.attributes_for(:clip)
        }.to change(Clip, :count).by(1)
      end
      it "redirects to root_path" do
        new_user = FactoryGirl.create(:user)
        session[:user_id] = new_user.id
        post :create, clip: FactoryGirl.attributes_for(:clip)
        expect(response).to redirect_to root_path
      end
    end
  end
end
