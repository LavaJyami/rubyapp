class Api::V1::BoardsController < ApplicationController
  before_action :set_board, only: [:show, :update, :destroy]
  # GET /boards
  def index
   # @boards = Board.all
   vowels_def = ['a','e','i','o','u']
   render json: [[('a'..'z').to_a.sample, vowels_def.to_a.sample, ('a'..'z').to_a.sample , ('a'..'z').to_a.sample],[('a'..'z').to_a.sample, ('a'..'z').to_a.sample, vowels_def.to_a.sample, ('a'..'z').to_a.sample],[('a'..'z').to_a.sample, vowels_def.to_a.sample, vowels_def.to_a.sample, ('a'..'z').to_a.sample],[vowels_def.to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample]]
  end

  # def show
  #  render json: @board
  # end
  #
  # def create
  #  @board = [[('a'..'z').to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample]]
  #  if @board.save
  #   render json: @board, status: :created, location:        api_v1_board_url(@board)
  #  else
  #   render json: @board.errors, status: :unprocessable_entity
  #  end
  # end
  #
  # def update
  #  if @board.update(board_params)
  #   render json: @board
  #  else
  #   render json: @board.errors, status: :unprocessable_entity
  #  end
  # end
  #
  # def destroy
  #  @board.destroy
  # end
  # private
  #
  # def set_board
  #  @board = Board.find(params[:id])
  # end
  #
  # def board_params
  # params.require(:board).permit(:title, :content, :slug)
  # end
  end
