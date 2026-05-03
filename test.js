async function test() {
  try {
    // 1. Login
    let loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@test.com',
        password: 'password123'
      })
    });
    let loginData = await loginRes.json();
    if (!loginRes.ok) throw new Error(loginData.message);
    const token = loginData.token;
    console.log('Login successful');

    // 2. Get projects
    let projRes = await fetch('http://localhost:5000/api/projects', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    let projects = await projRes.json();
    if (projects.length === 0) {
      console.log('No projects found');
      return;
    }
    const projectId = projects[0]._id;
    console.log('Project found:', projects[0].title);

    // 3. Create task
    let taskRes = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        title: 'API Test Task',
        description: 'Testing if backend handles empty optional fields',
        priority: 'Low',
        projectId: projectId
      })
    });
    let taskData = await taskRes.json();
    if (!taskRes.ok) {
      console.error('Task creation failed:', taskData);
    } else {
      console.log('Task created successfully:', taskData.title);
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();
