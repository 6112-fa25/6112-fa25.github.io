// Solution based on https://github.com/just-the-docs/just-the-docs/issues/1223
// Concrete implementation copied from https://github.com/mmcesim/mmcesim.org
//

function getTheme() {
  return document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light';
}

function updateCalendarTheme() {
  const isDark = getTheme() !== 'dark';
  const calendars = document.querySelectorAll('.calendar-embed iframe');
  
  calendars.forEach(iframe => {
    let src = iframe.src;
    if (isDark) {
      src = src.replace('bgcolor=%23ffffff', 'bgcolor=%23121212');
      iframe.parentElement.classList.add('dark-theme');
    } else {
      src = src.replace('bgcolor=%23121212', 'bgcolor=%23ffffff');
      iframe.parentElement.classList.remove('dark-theme');
    }
    iframe.src = src;
  });
}


window.addEventListener("DOMContentLoaded", function() {
  const toggleDarkMode = document.getElementById("theme-toggle");

  if (localStorage.getItem('theme') === 'dark') {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  jtd.addEvent(toggleDarkMode, 'click', function(){
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  });

  function setTheme(theme) {
    updateCalendarTheme();
    jtd.setTheme(theme);
    if (theme === 'dark') {
      toggleDarkMode.innerHTML = `<svg width='18px' height='18px'><use href="#svg-sun"></use></svg>`;
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      toggleDarkMode.innerHTML = `<svg width='18px' height='18px'><use href="#svg-moon"></use></svg>`;
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }
});
