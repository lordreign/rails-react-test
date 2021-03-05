json.result @struct.success? ? 'success' : 'error'
if @board.present?
  json.data do
    json.board do
      json.id @board.id
    end
  end
end
json.message @struct.message