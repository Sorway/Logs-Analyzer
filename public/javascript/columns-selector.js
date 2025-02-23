document.addEventListener('DOMContentLoaded', function() {
    const toggles = document.querySelectorAll('.column-toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const columnIndex = this.getAttribute('data-column');
            const cells = document.querySelectorAll(`.column-${columnIndex}`);

            cells.forEach(cell => {
                cell.style.display = this.checked ? '' : 'none';
            });
        });
    });
});