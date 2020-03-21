require "application_system_test_case"

class GameboardsTest < ApplicationSystemTestCase
  setup do
    @gameboard = gameboards(:one)
  end

  test "visiting the index" do
    visit gameboards_url
    assert_selector "h1", text: "Gameboards"
  end

  test "creating a Gameboard" do
    visit gameboards_url
    click_on "New Gameboard"

    fill_in "Value", with: @gameboard.value
    click_on "Create Gameboard"

    assert_text "Gameboard was successfully created"
    click_on "Back"
  end

  test "updating a Gameboard" do
    visit gameboards_url
    click_on "Edit", match: :first

    fill_in "Value", with: @gameboard.value
    click_on "Update Gameboard"

    assert_text "Gameboard was successfully updated"
    click_on "Back"
  end

  test "destroying a Gameboard" do
    visit gameboards_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Gameboard was successfully destroyed"
  end
end
