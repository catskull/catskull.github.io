require 'net/http'
require 'uri'
require 'json'
require 'byebug'
require 'digest'

module Jekyll
  class DataFileCreator < Generator
    safe true
    priority :highest

    def generate(site)
      data_dir = File.join(site.source, '_data')
      
      # Create _data directory if it doesn't exist
      FileUtils.mkdir_p(data_dir) unless Dir.exist?(data_dir)
            
      filepath = File.join(data_dir, 'wiki.yml')
      
      unless File.exist?(filepath)
        return
      end

      existing_content = File.read(filepath)
      
      # Parse existing YAML
      existing_data = YAML.load(existing_content) || {}

      should_write = false

      existing_data.each do |wiki|
        if wiki['title'].nil?
          page_title = URI.encode_www_form_component(wiki["url"].split('https://en.wikipedia.org/wiki/')[1])
          url = "https://en.wikipedia.org/api/rest_v1/page/summary/#{page_title}"
          uri = URI(url)
          http = Net::HTTP.new(uri.host, uri.port)
          http.use_ssl = true
          request = Net::HTTP::Get.new(uri)
          request['Accept'] = 'application/json; charset=utf-8; profile="https://www.mediawiki.org/wiki/Specs/Summary/1.4.2"'
          response = http.request(request)
          
          if response.code == '200'
            json = JSON.parse(response.body)
            wiki['title'] = json['title']
            if json['thumbnail']
              wiki['image_url'] = json['thumbnail']['source']
              wiki['image_wh'] = "#{json['thumbnail']['width']}x#{json['thumbnail']['height']}"
            end
            wiki['description'] = json['description']
            wiki['extract'] = json['extract']
            wiki['created'] = Time.now.utc.iso8601
            should_write = true
          else
            Jekyll.logger.error "URL:", "#{wiki['url']}"
            Jekyll.logger.error "HTTP Error:", "#{response.code} - #{response.message}"
            nil
          end
        end
      end

      File.write(filepath, YAML.dump(existing_data, line_width: -1)) if should_write
    end
  end
end
