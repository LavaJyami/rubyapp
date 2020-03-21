# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# board_array = [["a", "b", "c", "d"],["a", "b", "c", "d"],["a", "b", "c", "d"], ["a", "b", "c", "d"]]
# digits = [[Array(0..4)],[Array(0..4)],[Array(0..4)],[Array(0..4)]]
digits =[[('a'..'z').to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample, ('a'..'z').to_a.sample]]
Board.create([{value: digits}])
