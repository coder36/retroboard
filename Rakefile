desc "Build kanban app for production"
task :prod do
  system(<<-SCRIPT)
    mkdir -p dist
    jspm bundle-sfx js/main dist/app.js
    ./node_modules/.bin/uglifyjs dist/app.js -m -c -o dist/app.min.js
    cp -r stylesheets dist
    cp -r img dist
  SCRIPT

  strip_index_html
end

def strip_index_html
  File.open('dist/index.html', 'w') do |out|
    File.open('index.html').readlines.each do |line|
      line = '' if line[/config.js/]
      line = '' if line[/system.js/]
      line = '<script src="app.min.js"></script>' if line[/js\/main/]
      out.write(line)
    end
  end
end