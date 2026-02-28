.PHONY: serve build clean install kill

# Start the local development server
serve:
	@lsof -ti:4000 | xargs kill -9 2>/dev/null || true
	bundle exec jekyll serve

# Build the site without serving
build:
	bundle exec jekyll build

# Remove the generated site
clean:
	bundle exec jekyll clean

# Install dependencies
install:
	bundle install

# Kill any running Jekyll server
kill:
	@lsof -ti:4000 | xargs kill -9 2>/dev/null || true
	@echo "Port 4000 freed"
