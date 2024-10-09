document.addEventListener('DOMContentLoaded', (event) => {
    const darkModeToggle = document.querySelector('.dark-mode-switch input');
    const htmlElement = document.documentElement;

    // Function to set dark mode
    function setDarkMode(isDark) {
        if (isDark) {
            htmlElement.classList.add('dark-mode');
        } else {
            htmlElement.classList.remove('dark-mode');
        }
        darkModeToggle.checked = isDark;
        console.log(`Dark mode ${isDark ? 'enabled' : 'disabled'}`);
    }

    // Function to get current dark mode state
    function isDarkMode() {
        return htmlElement.classList.contains('dark-mode');
    }

    // Function to delete saved preference
    function deleteSavedPreference() {
        localStorage.removeItem('darkMode');
        console.log('Deleted saved dark mode preference');
        // Reset to system preference
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDarkMode);
        console.log('Reset to system preference:', isDarkMode());
    }

    // Expose the delete function globally
    window.deleteDarkModePreference = deleteSavedPreference;

    // Check for saved user preference
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedDarkMode !== null) {
        setDarkMode(savedDarkMode === 'true');
        console.log('Initial state (from saved preference):', isDarkMode());
    } else {
        // If no saved preference, check system preference
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDarkMode);
        console.log('Initial state (from system preference):', isDarkMode());
    }

    // Listen for toggle changes
    darkModeToggle.addEventListener('change', (e) => {
        setDarkMode(e.target.checked);
        localStorage.setItem('darkMode', e.target.checked);
        console.log('Dark mode changed by user:', isDarkMode());
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('darkMode') === null) {
            setDarkMode(e.matches);
            console.log('Dark mode changed by system preference:', isDarkMode());
        } else {
            console.log('System preference changed, but overridden by user setting');
        }
    });

    // Log the initial state after all setup is done
    console.log('Final initial state:', isDarkMode());
});
