require 'nokolexbor'
require 'time'

# CSS Naked Day: April 9, spanning all timezones
# Starts: April 9 00:00 UTC+14 (= April 8 10:00 UTC)
# Ends:   April 10 00:00 UTC-12 (= April 10 12:00 UTC)
now = Time.now.utc
year = now.year
if now >= Time.new(year, 4, 8, 10, 0, 0, '+00:00') &&
   now < Time.new(year, 4, 10, 12, 0, 0, '+00:00')

  [:documents, :pages].each do |hook_owner|
    Jekyll::Hooks.register hook_owner, :post_render do |doc|
      ext = doc.data['ext'] || File.extname(doc.destination(''))
      next unless ['.html', '.md'].include?(ext)

      document = Nokolexbor::HTML(doc.output)

      document.css('link[rel="stylesheet"]').each(&:remove)
      document.css('style').each(&:remove)
      document.css('[style]').each { |el| el.delete('style') }

      body = document.at_css('body')
      if body
        banner = Nokolexbor::HTML('<p>My Site is celebrating <a href="https://css-naked-day.org/" target="_blank">CSS Naked Day</a>!</p>').at_css('p')
        body.children.first ? body.children.first.add_previous_sibling(banner) : body.add_child(banner)
      end

      doc.output = document.to_html
    end
  end
end
