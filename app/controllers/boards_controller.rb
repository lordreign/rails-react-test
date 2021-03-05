class BoardsController < ApplicationController
  before_action :get_board, only: [:show, :edit, :update]

  # 목록
  def index
    @boards = Board.all
  end

  # 상세
  def show
  end

  # 생성
  def new

  end

  # 수정
  def edit

  end

  # 생성 처리
  def create
    @board = Board.create(board_params)
  end

  # 수정 처리
  def update
    @struct = Struct.new(:success?, :message)
    if @board.present?
      @board.title = board_params[:title]
      @board.content = board_params[:content]
      if @board.save
        @struct = @struct.new(true)
      else
        @struct = @struct.new(false, @board.errors.messages)
      end
    else
      @struct = @struct.new(false, {custom: ['게시글이 없네']})
    end

  end

  # 삭제 처리
  def destroy
    @is_destroyed = false
    board = Board.find_by(id: params[:id])
    if board.present?
      @is_destroyed = board.destroy
    end
  end

  private
  def get_board
    @board = Board.where(id: params[:id]).first
  end

  def board_params
    params.require(:board).permit(:id, :title, :content)
  end
end
