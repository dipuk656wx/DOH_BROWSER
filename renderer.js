document.getElementById('resolve-button').addEventListener('click', async () => {
    const hostname = document.getElementById('hostname-input').value;
  
    try {
      const ip = await window.doh.resolve(hostname);
      document.getElementById('output').innerText = `Resolved IP: ${ip}`;
    } catch (error) {
      document.getElementById('output').innerText = `Error: ${error.message}`;
    }
  });
  