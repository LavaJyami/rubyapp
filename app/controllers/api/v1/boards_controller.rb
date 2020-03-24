class Api::V1::BoardsController < ApplicationController
  before_action :set_board, only: [:show, :update, :destroy]
  # GET /boards
  def index
   # @boards = Board.all
   vowels_def = ['a','e','i','o','u']
   render json: [[('a'..'z').to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample , ('a'..'z').to_a.sample],[('a'..'z').to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample],[('a'..'z').to_a.sample, vowels_def.to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample],[vowels_def.to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample]]
  end
  end
