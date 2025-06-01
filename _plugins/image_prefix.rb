require 'nokolexbor'

@prefix = nil

Jekyll::Hooks.register :site, :after_init do |site|
  @prefix = site.config['image_prefix'] if Jekyll.env == 'production'
end

[:documents, :pages].each do |hook_owner|
  Jekyll::Hooks.register hook_owner, :post_render do |doc|
    unless @prefix.nil? || !['.html', '.md'].include?(doc.data['ext'])
      document = Nokolexbor::HTML(doc.output)
      document.css('img').each do |img|
        src = img['src']
        next if !img['raw'].nil? || src.nil? || src.start_with?('http', '//', @prefix) || !src.end_with?('.jpeg', '.jpg', '.png', '.gif')
        img['src'] = @prefix + src
      end
      doc.output = document.to_html
    end
  end
end
