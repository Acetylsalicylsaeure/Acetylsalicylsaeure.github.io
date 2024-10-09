# Makefile for compiling Markdown to HTML

# Variables
PANDOC = pandoc
PANDOC_OPTIONS = --standalone --template=src/base.html --metadata title="My Website"
PAGES_DIR = pages
SRC_DIR = src
DOCS_DIR = docs
MARKDOWN_FILES = $(shell find $(PAGES_DIR) -name '*.md')
HTML_FILES = $(patsubst $(PAGES_DIR)/%.md,$(DOCS_DIR)/%.html,$(MARKDOWN_FILES))

# Default target
all: $(HTML_FILES) $(DOCS_DIR)/styles.css $(DOCS_DIR)/darkMode.js $(DOCS_DIR)/navigation.js $(DOCS_DIR)/navStructure.js

# Rule to convert Markdown to HTML
$(DOCS_DIR)/%.html: $(PAGES_DIR)/%.md $(SRC_DIR)/base.html
	@mkdir -p $(@D)
	$(PANDOC) $(PANDOC_OPTIONS) -o $@ $<

# Rule to copy CSS file
$(DOCS_DIR)/styles.css: $(SRC_DIR)/styles.css
	@mkdir -p $(DOCS_DIR)
	cp $< $@

# Rule to copy JavaScript files
$(DOCS_DIR)/%.js: $(SRC_DIR)/%.js
	@mkdir -p $(DOCS_DIR)
	cp $< $@

# Generate navigation data using Python script
$(DOCS_DIR)/navStructure.js: $(MARKDOWN_FILES)
	@python3 generate_nav_structure.py

# Clean docs directory
clean:
	rm -rf $(DOCS_DIR)

# Phony targets
.PHONY: all clean
