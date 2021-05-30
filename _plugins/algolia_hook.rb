module Jekyll
  module Algolia
    module Hooks
      def self.before_indexing_each(record, node, context)
        record.delete :anchor
        record.delete :categories
        record.delete :headings
        record.delete :image_width
        record.delete :image_height
        record.delete :html
        record.delete :license
        record.delete :links
        record.delete :logs
        record.delete :references
        record.delete :slug
        record.delete :sources
        record.delete :tags
        record.delete :type
        record
      end
    end
  end
end
