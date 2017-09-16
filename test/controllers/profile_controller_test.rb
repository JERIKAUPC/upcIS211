require 'test_helper'

class ProfileControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get profile_show_url
    assert_response :success
  end

  test "should get reservation" do
    get profile_reservation_url
    assert_response :success
  end

  test "should get order" do
    get profile_order_url
    assert_response :success
  end

  test "should get publish" do
    get profile_publish_url
    assert_response :success
  end

end
