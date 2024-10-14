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

                    // Add index link to dropdown for mobile
                    if (files.hasOwnProperty('index')) {
                        const indexLi = document.createElement('li');
                        const indexA = document.createElement('a');
                        indexA.href = `/${directory}/index.html`;
                        indexA.textContent = 'Index';
                        indexA.className = 'mobile-only';
                        indexLi.appendChild(indexA);
                        dropdownUl.appendChild(indexLi);
                    }

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

                    // Add click event for mobile
                    a.addEventListener('click', (e) => {
                        if (window.innerWidth <= 768) {
                            e.preventDefault();
                            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                        }
                    });
                }
            }

            ul.appendChild(li);
        }

        return ul;
    }

    nav.appendChild(createNavigation(navStructure));

    // Close dropdowns when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !nav.contains(e.target)) {
            const dropdowns = nav.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });
});
