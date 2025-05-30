require 'nokolexbor'

@prefix = nil

Jekyll::Hooks.register :site, :after_init do |site|
  @prefix = site.config['image_prefix']
end

[:documents, :pages].each do |hook_owner|
  Jekyll::Hooks.register hook_owner, :post_render do |doc|
    unless @prefix.nil?
      document = Nokolexbor::HTML(doc.output)
      document.css('img').each do |img|
        src = img['src']
        next if src.nil? || src.start_with?('http', '//', @prefix) || src.end_with?('.avif', '.webm', '.webp')
        img['src'] = @prefix + src
      end
      doc.output = document.to_html
    end
  end
end
