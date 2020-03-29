class Api::V1::BoardsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_board, only: [:show, :update, :destroy]

  require 'matrix'

  def index
    dim = params[:content]
   common_letter_def = ['e','a','r','i','o','t','n','s','l','c']
    m = Matrix.build(dim.to_i, dim.to_i) {|row, col| ('a'..'z').to_a[rand(26)] }
    render json: m
  end

  end
