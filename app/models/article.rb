class Article < ActiveRecord::Base
  has_and_belongs_to_many :users

  validates :title, presence: true, uniqueness: true
  validates :body, presence: true
  validates :users, presence: true

  enum status: [:publ, :priv]
end
