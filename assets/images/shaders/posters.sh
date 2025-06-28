#!/bin/bash

# Directory to process (default to current directory if not specified)
DIR="${1:-.}"

# Check if directory exists
if [ ! -d "$DIR" ]; then
    echo "Error: Directory '$DIR' does not exist."
    exit 1
fi

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "Error: ffmpeg is not installed. Install it with: brew install ffmpeg"
    exit 1
fi

# Counter for processed files
count=0

echo "Processing .webm files in directory: $DIR"
echo "----------------------------------------"

# Loop through all .webm files in the directory
for webm_file in "$DIR"/*.webm; do
    # Check if any .webm files exist
    if [ ! -f "$webm_file" ]; then
        echo "No .webm files found in $DIR"
        break
    fi
    
    # Get the base filename without extension
    base_name=$(basename "$webm_file" .webm)
    
    # Set output filename
    output_file="$DIR/${base_name}.avif"
    
    echo "Processing: $(basename "$webm_file")"
    
    # Extract first frame and convert to AVIF
    if ffmpeg -i "$webm_file" -vframes 1 -c:v libaom-av1 -still-picture 1 -y "$output_file" 2>/dev/null; then
        echo "  ✓ Created: $(basename "$output_file")"
        ((count++))
    else
        echo "  ✗ Failed to process: $(basename "$webm_file")"
    fi
done

echo "----------------------------------------"
echo "Processed $count files successfully."
