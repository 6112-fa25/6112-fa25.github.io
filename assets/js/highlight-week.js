// document.addEventListener('DOMContentLoaded', function() {
//     highlightCurrentWeek();
// });

function highlightCurrentWeek() {
    const table = document.querySelector('table');
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');
    const currentDate = new Date();
    const currentYear = 2025; // Academic year

    let currentWeekRow = null;
    let minDiff = Infinity;

    rows.forEach((row, index) => {
        // Skip header row
        if (index === 0) return;

        const cells = row.querySelectorAll('td');
        if (cells.length < 5) return;

        // Look for dates in the cells (skip empty cells)
        for (let cell of cells) {
            const cellText = cell.textContent.trim();
            if (cellText && !cellText.includes('**No Class**') && !cellText.includes('**Lecture**') && !cellText.includes('**Recitation**')) {
                // Try to parse date from cell
                const dateMatch = cellText.match(/^([A-Za-z]+)\s+(\d+)/);
                if (dateMatch) {
                    const monthName = dateMatch[1];
                    const day = parseInt(dateMatch[2]);

                    const monthMap = {
                        'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
                    };

                    if (monthMap[monthName]) {
                        const cellDate = new Date(currentYear, monthMap[monthName], day);

                        // Find the week (Monday to Friday) this date belongs to
                        const dayOfWeek = cellDate.getDay();
                        const mondayOfWeek = new Date(cellDate);
                        mondayOfWeek.setDate(cellDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

                        const fridayOfWeek = new Date(mondayOfWeek);
                        fridayOfWeek.setDate(mondayOfWeek.getDate() + 4);

                        // Check if current date falls within this week
                        if (currentDate >= mondayOfWeek && currentDate <= fridayOfWeek) {
                            currentWeekRow = row;
                            break;
                        }

                        // If we haven't found the current week yet, track the closest future week
                        if (cellDate > currentDate) {
                            const diff = cellDate - currentDate;
                            if (diff < minDiff) {
                                minDiff = diff;
                                currentWeekRow = row;
                            }
                        }
                    }
                }
            }
        }
    });

    // Highlight the current week
    if (currentWeekRow) {
        currentWeekRow.classList.add('current-week');
    }
}