class Api::V1::BoardsController < ApplicationController
  before_action :set_board, only: [:show, :update, :destroy]
  # GET /boards
  def index
   common_letter_def = ['e','a','r','i','o','t','n','s','l','c']
   render json: [[common_letter_def.to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample , ('a'..'z').to_a.sample],[('a'..'z').to_a.sample, common_letter_def.to_a.sample, ('a'..'z').to_a.sample, common_letter_def.to_a.sample],[('a'..'z').to_a.sample, common_letter_def.to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample],[common_letter_def.to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample]]
  end
  end
