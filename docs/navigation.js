document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');

    if (typeof navStructure === 'undefined') {
        console.error('navStructure is not defined. Make sure navStructure.js is loaded before navigation.js');
        return;
    }

    function createNavigation(structure) {
        const ul = document.createElement('ul');

        for (const [directory, files] of Object.entries(structure)) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = directory;

            // Check if there's an index file
            if (files && files.hasOwnProperty('index')) {
                a.href = `/${directory}/index.html`;
            } else {
                a.href = '#';
            }

            li.appendChild(a);

            // Create dropdown if there are files
            if (files && typeof files === 'object') {
                const fileEntries = Object.entries(files).filter(([name]) => name !== 'index');
                if (fileEntries.length > 0) {
                    const dropdown = document.createElement('div');
                    dropdown.className = 'dropdown';
                    const dropdownUl = document.createElement('ul');

                    fileEntries.forEach(([fileName, _]) => {
                        const fileLi = document.createElement('li');
                        const fileA = document.createElement('a');
                        fileA.href = `/${directory}/${fileName}.html`;
                        fileA.textContent = fileName;
                        fileLi.appendChild(fileA);
                        dropdownUl.appendChild(fileLi);
                    });

                    dropdown.appendChild(dropdownUl);
                    li.appendChild(dropdown);
                }
            }

            ul.appendChild(li);
        }

        return ul;
    }

    nav.appendChild(createNavigation(navStructure));
});
