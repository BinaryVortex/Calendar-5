const calendar = document.querySelector('.calendar');
const month_picker = document.querySelector('#month-picker');
const year_element = document.querySelector('#year');
const prev_year = document.querySelector('#prev-year');
const next_year = document.querySelector('#next-year');
const calendar_days = document.querySelector('.calendar-days');
const month_list = calendar.querySelector('.month-list');

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let currDate = new Date();
let currMonth = currDate.getMonth();
let currYear = currDate.getFullYear();

// Function to generate the calendar days
function generateCalendar(month, year) {
  calendar_days.innerHTML = '';
  let first_day = new Date(year, month, 1);
  let last_day = new Date(year, month + 1, 0);

  let days = "";

  // Empty divs for days before the first day of the month
  for (let i = 0; i < first_day.getDay(); i++) {
    days += `<div></div>`;
  }

  // Generate the days of the month
  for (let i = 1; i <= last_day.getDate(); i++) {
    if (i === currDate.getDate() && month === currMonth && year === currYear) {
      days += `<div class="curr-date">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  calendar_days.innerHTML = days;

  // Add click event to each day (optional)
  document.querySelectorAll('.calendar-days div').forEach(day => {
    day.addEventListener('click', (e) => {
      const selectedDay = e.target.textContent;
      alert(`Selected date: ${selectedDay} ${months[month]} ${year}`);
    });
  });
}

// Toggle month list visibility
month_picker.addEventListener('click', () => {
  month_list.classList.toggle('show');
});

// Populate the month list
months.forEach((month, index) => {
  const monthDiv = document.createElement('div');
  monthDiv.textContent = month;
  monthDiv.addEventListener('click', () => {
    currMonth = index;
    month_picker.textContent = months[currMonth];
    generateCalendar(currMonth, currYear);
    month_list.classList.remove('show');
  });
  month_list.appendChild(monthDiv);
});

// Year navigation
prev_year.addEventListener('click', () => {
  currYear--;
  year_element.textContent = currYear;
  generateCalendar(currMonth, currYear);
});

next_year.addEventListener('click', () => {
  currYear++;
  year_element.textContent = currYear;
  generateCalendar(currMonth, currYear);
});

// Initial call to generate calendar
month_picker.textContent = months[currMonth];
year_element.textContent = currYear;
generateCalendar(currMonth, currYear);
