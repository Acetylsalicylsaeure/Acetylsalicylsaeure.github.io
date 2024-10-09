# Makefile for compiling Markdown to HTML

# Variables
PANDOC = pandoc
PANDOC_OPTIONS = --standalone --template=src/base.html
PAGES_DIR = pages
SRC_DIR = src
BUILD_DIR = build
MARKDOWN_FILES = $(wildcard $(PAGES_DIR)/*.md)
HTML_FILES = $(patsubst $(PAGES_DIR)/%.md,$(BUILD_DIR)/%.html,$(MARKDOWN_FILES))

# Default target
all: $(HTML_FILES) $(BUILD_DIR)/styles.css $(BUILD_DIR)/darkMode.js

# Rule to convert Markdown to HTML
$(BUILD_DIR)/%.html: $(PAGES_DIR)/%.md $(SRC_DIR)/base.html
	@mkdir -p $(BUILD_DIR)
	$(PANDOC) $(PANDOC_OPTIONS) -o $@ $<

# Rule to copy CSS file
$(BUILD_DIR)/styles.css: $(SRC_DIR)/styles.css
	@mkdir -p $(BUILD_DIR)
	cp $< $@

# Rule to copy JavaScript file
$(BUILD_DIR)/darkMode.js: $(SRC_DIR)/darkMode.js
	@mkdir -p $(BUILD_DIR)
	cp $< $@

# Clean build directory
clean:
	rm -rf $(BUILD_DIR)

# Phony targets
.PHONY: all clean
