document.addEventListener('DOMContentLoaded', function () {
  const updateMenuForm = document.getElementById('updateMenuForm');
  const messageDiv = document.getElementById('message');

  updateMenuForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const old_date = document.getElementById('old_date').value;
    const date = document.getElementById('date').value;
    const breakfast = document.getElementById('breakfast').value;
    const lunch = document.getElementById('lunch').value;
    const dinner = document.getElementById('dinner').value;

    try {
      const response = await fetch(
        'https://sratrc-portal-backend-dev.onrender.com/api/v1/admin/food/menu',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
            // Include any authentication headers if required
          },
          body: JSON.stringify({ old_date, date, breakfast, lunch, dinner })
        }
      );

      const data = await response.json();
      if (response.ok) {
        messageDiv.textContent = 'Menu updated successfully';
        updateMenuForm.reset(); // Reset form fields after successful submission
      } else {
        throw new Error(data.message || 'Failed to update menu');
      }
    } catch (error) {
      console.error('Error:', error);
      messageDiv.textContent = 'Error updating menu';
    }
  });
});
