const API_URL = 'https://api.aladhan.com/v1/timingsByCity?city=Petaling%20Jaya&country=Malaysia';
const prayerTimesTable = document.getElementById('prayerTimes');
const locationElement = document.getElementById('location');

async function fetchPrayerTimes() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.code === 200) {
      // Extract timings
      const { timings } = data.data;
      const prayers = [
        { name: 'Imsak', time: timings.Imsak },
        { name: 'Subuh', time: timings.Fajr },
        { name: 'Zohor', time: timings.Dhuhr },
        { name: 'Asar', time: timings.Asr },
        { name: 'Maghrib', time: timings.Maghrib },
        { name: 'Isyak', time: timings.Isha },
      ];

      // Update location
      locationElement.textContent = `${data.data.meta.timezone}, (${data.data.meta.method.name})`;

      // Populate prayer times table
      prayerTimesTable.innerHTML = prayers.map(prayer => `
        <tr>
          <td align="left">
            <font size="2" color="#FDE7E7"><b>${prayer.name}</b></font>
          </td>
          <td align="left">
            <font size="2" color="#FFFFFF"><b>${prayer.time}</b></font>
          </td>
        </tr>
      `).join('');
    } else {
      prayerTimesTable.innerHTML = `<tr><td colspan="2" style="color: red;">Error fetching prayer times</td></tr>`;
    }
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    prayerTimesTable.innerHTML = `<tr><td colspan="2" style="color: red;">Failed to load prayer times</td></tr>`;
  }
}

// Fetch prayer times on page load
fetchPrayerTimes();

