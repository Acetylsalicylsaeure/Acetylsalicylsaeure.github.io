# Makefile for compiling Markdown to HTML and copying all src files

# Variables
PANDOC = pandoc
PANDOC_OPTIONS = --standalone --template=src/base.html --metadata title="Acetylsalicylsaeure" --mathjax
PAGES_DIR = pages
SRC_DIR = src
DOCS_DIR = docs
MARKDOWN_FILES = $(shell find $(PAGES_DIR) -name '*.md')
HTML_FILES = $(patsubst $(PAGES_DIR)/%.md,$(DOCS_DIR)/%.html,$(MARKDOWN_FILES))
SRC_FILES = $(wildcard $(SRC_DIR)/*)

# Default target
all: $(HTML_FILES) copy_src_files $(DOCS_DIR)/navStructure.js

# Rule to convert Markdown to HTML
$(DOCS_DIR)/%.html: $(PAGES_DIR)/%.md $(SRC_DIR)/base.html
	@mkdir -p $(@D)
	$(PANDOC) $(PANDOC_OPTIONS) -o $@ $<

# Rule to copy all files from src to docs
copy_src_files: $(SRC_FILES)
	@mkdir -p $(DOCS_DIR)
	cp -R $(SRC_DIR)/* $(DOCS_DIR)/

# Generate navigation data using Python script
$(DOCS_DIR)/navStructure.js: $(MARKDOWN_FILES)
	@python3 generate_nav_structure.py

# Clean docs directory
clean:
	rm -rf $(DOCS_DIR)

# Phony targets
.PHONY: all clean copy_src_files
