# Build for GitHub pages script
echo "Building for GitHub pages..."
rm -r ./docs
echo "Removed old docs folder."
echo "Building React app..."
npm run build
echo "React app built."
mv build docs
echo "Renamed 'build' => 'docs'"
echo "Ready to commit!"