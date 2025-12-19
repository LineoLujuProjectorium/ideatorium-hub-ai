// /app/dashboard/page.tsx
export default function Dashboard() {
  const projects = await getProjectsWithDeployments();
  
  return (
    <div>
      <h1>Your Active Applications</h1>
      
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.name}</h3>
          <AppStatusBadge status={project.deployment.status} />
          <div>
            {project.deployment.webUrl && (
              <a href={project.deployment.webUrl}>🌐 Live Web App</a>
            )}
            {project.deployment.iosUrl && (
              <a href={project.deployment.iosUrl}>📱 TestFlight</a>
            )}
            {project.deployment.androidUrl && (
              <a href={project.deployment.androidUrl}>🤖 Play Store</a>
            )}
          </div>
          <DeploymentLogs logs={project.deployment.logs} />
        </div>
      ))}
    </div>
  );
}