# Makefile for compiling Markdown to HTML

# Variables
PANDOC = pandoc
PANDOC_OPTIONS = --standalone --template=src/base.html
PAGES_DIR = pages
SRC_DIR = src
DOCS_DIR = docs
MARKDOWN_FILES = $(wildcard $(PAGES_DIR)/*.md)
HTML_FILES = $(patsubst $(PAGES_DIR)/%.md,$(DOCS_DIR)/%.html,$(MARKDOWN_FILES))

# Default target
all: $(HTML_FILES) $(DOCS_DIR)/styles.css $(DOCS_DIR)/darkMode.js

# Rule to convert Markdown to HTML
$(DOCS_DIR)/%.html: $(PAGES_DIR)/%.md $(SRC_DIR)/base.html
	@mkdir -p $(DOCS_DIR)
	$(PANDOC) $(PANDOC_OPTIONS) -o $@ $<

# Rule to copy CSS file
$(DOCS_DIR)/styles.css: $(SRC_DIR)/styles.css
	@mkdir -p $(DOCS_DIR)
	cp $< $@

# Rule to copy JavaScript file
$(DOCS_DIR)/darkMode.js: $(SRC_DIR)/darkMode.js
	@mkdir -p $(DOCS_DIR)
	cp $< $@

# Clean docs directory
clean:
	rm -rf $(DOCS_DIR)

# Phony targets
.PHONY: all clean
