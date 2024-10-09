import os
import json


def generate_nav_structure(pages_dir):
    nav_structure = {}

    for root, dirs, files in os.walk(pages_dir):
        relative_path = os.path.relpath(root, pages_dir)
        if relative_path == '.':
            continue

        current_level = nav_structure
        for part in relative_path.split(os.sep):
            if part not in current_level:
                current_level[part] = {}
            current_level = current_level[part]

        for file in files:
            if file.endswith('.md'):
                file_name = os.path.splitext(file)[0]
                current_level[file_name] = True

    return nav_structure


if __name__ == "__main__":
    pages_dir = "pages"
    nav_structure = generate_nav_structure(pages_dir)

    output_file = "docs/navStructure.js"
    with open(output_file, 'w') as f:
        f.write("const navStructure = ")
        json.dump(nav_structure, f, indent=2)
        f.write(";")

    print(f"Navigation structure has been written to {output_file}")
